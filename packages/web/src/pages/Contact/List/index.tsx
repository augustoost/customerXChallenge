import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useContactContext } from '../../../hooks/contactContext';

import api from '../../../services/api';

import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';

import {
  Main,
  Container,
  ItemContainer,
  ItemLeft,
  ItemMid,
  FlexDirectionRow,
  ActionButton,
} from './styles';

interface IEmails {
  email: string;
}

interface IPhones {
  phone: string;
}

interface IContact {
  id: string;
  name: string;
  emails: IEmails[];
  phones: IPhones[];
  created_at: string;
}

const ContactList: React.FC = () => {
  const history = useHistory();
  const { handleSetContactId } = useContactContext();

  const [contactsData, setContactsData] = useState<IContact[]>(
    [] as IContact[],
  );

  useEffect(() => {
    api.get<IContact[]>('/contacts').then(response => {
      if (response.status === 200) {
        setContactsData(response.data);
      }
    });
  }, []);

  const handleDeleteContact = async (contact_id: string) => {
    const response = await api.delete(`/contacts/${contact_id}`);

    if (response.status === 200) {
      const newContactsArray = await api.get<IContact[]>('/contacts');
      setContactsData(newContactsArray.data);
    }
  };

  const handleUpdateContact = (contact_id: string) => {
    try {
      handleSetContactId(contact_id);
    } finally {
      history.push('/contact/update');
    }
  };

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          {contactsData.map((contact, index) => (
            <ItemContainer key={`key-${index}`}>
              <ItemLeft>
                <h1>{contact.name}</h1>
                <span>{contact.id}</span>
              </ItemLeft>
              <ItemMid>
                <FlexDirectionRow>
                  {contact.emails.map((email, index) => (
                    <h4 key={`key-${index}`} style={{ marginRight: 15 }}>
                      {email.email}
                    </h4>
                  ))}
                </FlexDirectionRow>
                <FlexDirectionRow>
                  {contact.phones.map((phone, index) => (
                    <h4 key={`key-${index}`} style={{ marginRight: 15 }}>
                      {phone.phone}
                    </h4>
                  ))}
                </FlexDirectionRow>
              </ItemMid>
              <FlexDirectionRow>
                <ActionButton
                  onClick={() => handleUpdateContact(contact.id)}
                  color="#fca130"
                >
                  Editar
                </ActionButton>
                <ActionButton
                  onClick={() => handleDeleteContact(contact.id)}
                  color="#f93e3e"
                >
                  Excluir
                </ActionButton>
              </FlexDirectionRow>
            </ItemContainer>
          ))}
        </Container>
      </Main>
    </>
  );
};

export default ContactList;
