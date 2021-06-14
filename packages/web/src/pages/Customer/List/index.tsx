import React, { useEffect, useState } from 'react';

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
import { useCustomerContext } from '../../../hooks/customerContext';
import { useHistory } from 'react-router';

interface IEmails {
  email: string;
}

interface IPhones {
  phone: string;
}

interface ICustomer {
  id: string;
  name: string;
  emails: IEmails[];
  phones: IPhones[];
  created_at: string;
}

const List: React.FC = () => {
  const history = useHistory();
  const { handleSetCustomerId } = useCustomerContext();

  const [customersData, setCustomersData] = useState<ICustomer[]>(
    [] as ICustomer[],
  );

  useEffect(() => {
    api.get<ICustomer[]>('/customers').then(response => {
      if (response.status === 200) {
        setCustomersData(response.data);
      }
    });
  }, []);

  const handleDeleteCustomer = async (customer_id: string) => {
    const response = await api.delete(`/customers/${customer_id}`);

    if (response.status === 200) {
      const newCustomersArray = await api.get<ICustomer[]>('/customers');
      setCustomersData(newCustomersArray.data);
    }
  };

  const handleUpdateCustomer = (customer_id: string) => {
    try {
      handleSetCustomerId(customer_id);
    } finally {
      history.push('/customer/update');
    }
  };

  const handleReportCustomer = (customer_id: string) => {
    try {
      handleSetCustomerId(customer_id);
    } finally {
      history.push('/customer/report');
    }
  };

  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <Container>
          {customersData.map((customer, index) => (
            <ItemContainer key={`key-${index}`}>
              <ItemLeft>
                <h1>{customer.name}</h1>
                <span>{customer.id}</span>
              </ItemLeft>
              <ItemMid>
                <FlexDirectionRow>
                  {customer.emails.map((email, index) => (
                    <h4 key={`key-${index}`} style={{ marginRight: 15 }}>
                      {email.email}
                    </h4>
                  ))}
                </FlexDirectionRow>
                <FlexDirectionRow>
                  {customer.phones.map((phone, index) => (
                    <h4 key={`key-${index}`} style={{ marginRight: 15 }}>
                      {phone.phone}
                    </h4>
                  ))}
                </FlexDirectionRow>
              </ItemMid>
              <FlexDirectionRow>
                <ActionButton
                  onClick={() => handleReportCustomer(customer.id)}
                  color="#00f55b"
                >
                  Relatório
                </ActionButton>
                <ActionButton
                  onClick={() => handleUpdateCustomer(customer.id)}
                  color="#fca130"
                >
                  Editar
                </ActionButton>
                <ActionButton
                  onClick={() => handleDeleteCustomer(customer.id)}
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

export default List;
