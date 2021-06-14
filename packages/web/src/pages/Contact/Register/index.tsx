import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErros';

import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

import Input from '../../../components/Input';
import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Main,
  Container,
  FormContainer,
  AddEmail,
  SubmitButton,
  SelectCustomersProps,
} from './styles';

interface ICustomerInfo {
  id: string;
  name: string;
}

interface ISelectInputData {
  value: string;
  label: string;
}

interface IContactFormData {
  name: string;
  customer: string;
  email: string;
  email2: string;

  phone: string;
  phone2: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [customerData, setCustomerData] = useState<ISelectInputData[]>(
    [] as ISelectInputData[],
  );
  const [customerSelected, setCustomerSelected] = useState(
    'Digite para procurar um cliente',
  );

  const [addSecondEmail, setAddSecondEmail] = useState(false);
  const [addSecondPhoneNumber, setAddSecondPhoneNumber] = useState(false);

  useEffect(() => {
    const getCustomerData = async () => {
      const response = await api.get<ICustomerInfo[]>('/customers');

      if (response.status === 200) {
        const customerArray = response.data.map(customer => {
          const customerSelectData = {
            value: customer.id,
            label: customer.name,
          };
          return customerSelectData;
        });
        setCustomerData(customerArray);
      }
    };
    getCustomerData();
  }, []);

  const handleSubmit = useCallback(
    async (data: IContactFormData) => {
      try {
        formRef.current?.setErrors({});

        const mainSchema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          customer: Yup.string().required(
            'É necessário vincular um cliente a este contato.',
          ),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          phone: Yup.string().required('Telefone obrigatório'),
        });

        if (data.email2) {
          mainSchema.concat(
            Yup.object().shape({
              email2: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
            }),
          );
        }

        if (data.phone2) {
          mainSchema.concat(
            Yup.object().shape({
              phone2: Yup.string().required('Telefone obrigatório'),
            }),
          );
        }

        await mainSchema.validate(data, {
          abortEarly: false,
        });

        let emails = [data.email];
        let phones = [data.phone];

        if (data.email2) emails.push(data.email2);
        if (data.phone2) phones.push(data.phone2);

        api
          .post('/contacts', {
            customer_id: data.customer,
            name: data.name,
            emails,
            phones,
          })
          .then(response => {
            if (response.status === 201) {
              addToast({
                type: 'success',
                title: 'Contato cadastrado com sucesso!',
                description: `O Conta ${data.name} já está vinculado ao cliente, veja no relatório`,
              });
            }
          });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar o contato',
          description: 'Verifique se os campos estão preenchidos',
        });
      }
    },
    [addToast, history],
  );

  const SelectCustomers = (props: any) => <SelectCustomersProps {...props} />;

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          <FormContainer>
            <h1>Cadastrar Contato</h1>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Input name="name" icon={FiUser} placeholder="Nome completo" />

              <Input name="email" icon={FiMail} placeholder="Email primário" />

              {addSecondEmail && (
                <Input
                  name="email2"
                  icon={FiMail}
                  placeholder="Email secundário"
                />
              )}

              <AddEmail
                type="button"
                onClick={() => setAddSecondEmail(!addSecondEmail)}
              >
                {addSecondEmail
                  ? 'Remover email secundário'
                  : 'Adicionar email secundário'}
              </AddEmail>

              <Input
                name="phone"
                icon={FiPhone}
                placeholder="Telefone primário"
              />

              {addSecondPhoneNumber && (
                <Input
                  name="phone2"
                  icon={FiPhone}
                  placeholder="Telefone secundário"
                />
              )}

              <AddEmail
                type="button"
                onClick={() => setAddSecondPhoneNumber(!addSecondPhoneNumber)}
              >
                {addSecondPhoneNumber
                  ? 'Remover telefone secundário'
                  : 'Adicionar telefone secundário'}
              </AddEmail>

              <SelectCustomers
                name="customer"
                placeholder="Digite para procurar um cliente"
                defaultValue={customerSelected}
                onChange={setCustomerSelected}
                options={customerData}
                isSearchable
                isClearable
                hideSelectedOptions
                styles={{
                  menu: (base: any) => ({
                    ...base,
                    backgroundColor: '#8E5EDE',
                  }),
                  menuList: (base: any) => ({
                    ...base,
                    color: '#fff',
                  }),
                }}
              />

              <SubmitButton type="submit" color="#00f55b">
                Cadastrar
              </SubmitButton>
            </Form>
          </FormContainer>
        </Container>
      </Main>
    </>
  );
};

export default Register;
