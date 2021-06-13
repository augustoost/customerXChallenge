import React, { useCallback, useRef, useState, useEffect } from 'react';
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

import { useCustomerContext } from '../../../hooks/customerContext';
import { useToast } from '../../../hooks/toast';

import {
  Main,
  Container,
  FormContainer,
  AddEmail,
  SubmitButton,
} from '../Register/styles';

interface ICustomerData {
  name: string;
  emails: {
    id: string;
    email: string;
  }[];
  phones: {
    id: string;
    phone: string;
  }[];
}

interface ICustomerFormData {
  name: string;
  email: string;
  email2: string;
  phone: string;
  phone2: string;
}

const Update: React.FC = () => {
  const { customer_id } = useCustomerContext();
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [addSecondEmail, setAddSecondEmail] = useState(false);
  const [addSecondPhoneNumber, setAddSecondPhoneNumber] = useState(false);

  const [firstEmail, setFirstEmail] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  const [firstPhoneNumber, setFirstPhoneNumber] = useState('');
  const [secondPhoneNumber, setSecondPhoneNumber] = useState('');

  const [customerData, setCustomerData] = useState<ICustomerData>(
    {} as ICustomerData,
  );

  useEffect(() => {
    api
      .get<ICustomerData>(`/customers/listCustomerById/${customer_id}`)
      .then(response => {
        if (response.status === 200) {
          setCustomerData(response.data);

          response.data.emails.forEach((email, index) => {
            if (index === 1) {
              setAddSecondEmail(true);
              setSecondEmail(email.email);
            } else {
              setAddSecondEmail(false);
              setFirstEmail(email.email);
            }
          });

          response.data.phones.forEach((phone, index) => {
            if (index === 1) {
              setAddSecondPhoneNumber(true);
              setSecondPhoneNumber(phone.phone);
            } else {
              setAddSecondPhoneNumber(false);
              setFirstPhoneNumber(phone.phone);
            }
          });
        }
      });
  }, [customer_id]);

  const handleSubmit = useCallback(
    async (data: ICustomerFormData) => {
      try {
        formRef.current?.setErrors({});

        const mainSchema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
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

        customerData.emails.forEach((email, index) => {
          if (index === 0 && email.email !== data.email) {
            api.put(`/emails/${email.id}`, {
              email: data.email,
            });
          } else if (index === 1 && email.email !== data.email2) {
            if (!data.email2) {
              api.delete(`/emails/${email.id}`);
            } else {
              api.put(`/emails/${email.id}`, {
                email: data.email2,
              });
            }
          }
        });

        customerData.phones.forEach((phone, index) => {
          if (index === 0 && phone.phone !== data.phone) {
            api.put(`/phones/${phone.id}`, {
              phone: data.phone,
            });
          } else if (index === 1 && phone.phone !== data.phone2) {
            if (!data.phone2) {
              api.delete(`/phones/${phone.id}`);
            } else {
              api.put(`/phones/${phone.id}`, {
                phone: data.phone2,
              });
            }
          }
        });

        api
          .put(`/customers/${customer_id}`, {
            name: data.name,
          })
          .then(response => {
            if (response.status === 200) {
              addToast({
                type: 'success',
                title: 'Cliente atualizado com sucesso!',
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
          title: 'Erro ao cadastrar o cliente',
          description: 'Verifique se os campos estão preenchidos',
        });
      }
    },
    [addToast, customerData.emails, customerData.phones, customer_id, history],
  );

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          <FormContainer>
            <h1>Atalizar Cliente</h1>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Input
                name="name"
                icon={FiUser}
                placeholder="Nome completo"
                defaultValue={customerData.name}
              />

              <Input
                name="email"
                icon={FiMail}
                placeholder="Email primário"
                defaultValue={firstEmail}
              />

              {addSecondEmail && (
                <Input
                  name="email2"
                  icon={FiMail}
                  placeholder="Email secundário"
                  defaultValue={secondEmail}
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
                defaultValue={firstPhoneNumber}
              />

              {addSecondPhoneNumber && (
                <Input
                  name="phone"
                  icon={FiPhone}
                  placeholder="Telefone secundário"
                  defaultValue={secondPhoneNumber}
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
              <SubmitButton type="submit" color="#fca130">
                Atualizar
              </SubmitButton>
            </Form>
          </FormContainer>
        </Container>
      </Main>
    </>
  );
};

export default Update;
