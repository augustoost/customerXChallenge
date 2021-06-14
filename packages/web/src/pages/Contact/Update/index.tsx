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
import { useContactContext } from '../../../hooks/contactContext';

import {
  Main,
  Container,
  FormContainer,
  AddEmail,
  SubmitButton,
} from '../Register/styles';

interface IContactData {
  id: string;
  name: string;
  customer_id: string;
  emails: {
    id: string;
    email: string;
  }[];
  phones: {
    id: string;
    phone: string;
  }[];
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
  const { contact_id } = useContactContext();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [contactData, setContactData] = useState<IContactData>(
    {} as IContactData,
  );

  const [addSecondEmail, setAddSecondEmail] = useState(false);
  const [addSecondPhoneNumber, setAddSecondPhoneNumber] = useState(false);
  const [firstEmail, setFirstEmail] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  const [firstPhoneNumber, setFirstPhoneNumber] = useState('');
  const [secondPhoneNumber, setSecondPhoneNumber] = useState('');

  useEffect(() => {
    const getContactInfo = async () => {
      api
        .get<IContactData>(`/contacts/listContactById/${contact_id}`)
        .then(response => {
          if (response.status === 200) {
            setContactData(response.data);

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
    };

    getContactInfo();
  }, [contact_id]);

  const handleSubmit = useCallback(
    async (data: IContactFormData) => {
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

        contactData.emails.forEach((email, index) => {
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

        contactData.phones.forEach((phone, index) => {
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

        await api
          .put(`/contacts/${contact_id}`, {
            name: data.name,
          })
          .then(response => {
            if (response.status === 201) {
              addToast({
                type: 'success',
                title: 'Contato cadastrado com sucesso!',
                description: `O Contato ${data.name} já está vinculado ao cliente, veja no relatório`,
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
    [addToast, contactData.emails, contactData.phones, contact_id, history],
  );

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          <FormContainer>
            <h1>Atualizar Contato</h1>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Input
                name="name"
                icon={FiUser}
                placeholder="Nome completo"
                defaultValue={contactData.name}
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
                  name="phone2"
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

export default Register;
