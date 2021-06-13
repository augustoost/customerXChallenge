import React, { useCallback, useRef, useState } from 'react';
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
} from './styles';

interface ICustomerFormData {
  name: string;

  email: string;
  email2: string;

  phone: string;
  phone2: string;
}

const CustomerRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [addSecondEmail, setAddSecondEmail] = useState(false);
  const [addSecondPhoneNumber, setAddSecondPhoneNumber] = useState(false);

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

        api
          .post('/customers', {
            name: data.name,
            emails,
            phones,
          })
          .then(response => {
            if (response.status === 201) {
              addToast({
                type: 'success',
                title: 'Cliente cadastrado com sucesso!',
                description: `O cliente ${data.name} já está disponível no cadastro de contatos.`,
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
    [addToast, history],
  );

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          <FormContainer>
            <h1>Cadastrar Cliente</h1>
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

export default CustomerRegister;
