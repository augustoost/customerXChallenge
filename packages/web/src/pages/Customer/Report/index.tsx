/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';
import { useCustomerContext } from '../../../hooks/customerContext';
import api from '../../../services/api';

import {
  Main,
  NameInfo,
  CustomerContactInfos,
  FlexDirectionColumn,
  ContactsListContainer,
  CustomerContainer,
  ItemContainer,
  ItemLeft,
  ItemMid,
  FlexDirectionRow,
  ActionButton,
} from './styles';

interface IData {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  emails: {
    email: string;
  }[];
  phones: {
    phone: string;
  }[];
}

const Report: React.FC = () => {
  const { customer_id } = useCustomerContext();
  const [customerData, setCustomerData] = useState<IData>({} as IData);
  const [contactsData, setContactsData] = useState<IData[]>({} as IData[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/customers/listCustomerById/${customer_id}`).then(response => {
      if (response.status === 200) {
        setCustomerData(response.data);
      }

      api
        .get(`/contacts/listByCustomerId/${customer_id}`)
        .then(contactsResponse => {
          if (contactsResponse.status === 200) {
            setContactsData(contactsResponse.data);
          }
          setLoading(false);
        });
    });
  }, [customer_id]);

  const handleDeleteContact = async (contact_id: string) => {
    const response = await api.delete(`/contacts/${contact_id}`);

    if (response.status === 200) {
      const newContactsArray = await api.get<IData[]>('/contacts');
      setContactsData(newContactsArray.data);
    }
  };

  const handleCustomerInfo = useCallback(() => {
    return (
      <CustomerContainer>
        <NameInfo>
          <h1>{customerData.name}</h1>
          <span>{customerData.id}</span>

          <CustomerContactInfos>
            <FlexDirectionColumn>
              {customerData.emails.map(email => {
                if (email) {
                  return <h4>{email.email}</h4>;
                }
              })}
            </FlexDirectionColumn>
            <FlexDirectionColumn>
              {customerData.phones.map(phone => {
                if (phone) {
                  return <h4>{phone.phone}</h4>;
                }
              })}
            </FlexDirectionColumn>
          </CustomerContactInfos>
        </NameInfo>
      </CustomerContainer>
    );
  }, [customerData]);

  const handleContactsInfo = useCallback(() => {
    return (
      <ContactsListContainer>
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
                onClick={() => handleDeleteContact('313')}
                color="#f93e3e"
              >
                Excluir
              </ActionButton>
            </FlexDirectionRow>
          </ItemContainer>
        ))}
      </ContactsListContainer>
    );
  }, [contactsData]);

  if (loading) {
    return <LinearProgress color="secondary" />;
  } else {
    return (
      <>
        <Header />
        <Main>
          <SideBar />

          {handleCustomerInfo()}

          {handleContactsInfo()}
        </Main>
      </>
    );
  }
};

export default Report;
