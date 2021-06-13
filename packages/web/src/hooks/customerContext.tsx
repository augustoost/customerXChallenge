import React, { createContext, useCallback, useContext, useState } from 'react';

interface ICustomerContextData {
  customer_id: string;
  handleSetCustomerId(customer_id: string): void;
}

const CustomerContext = createContext<ICustomerContextData>(
  {} as ICustomerContextData,
);

const CustomerProvider: React.FC = ({ children }) => {
  const [customerId, setCustomerId] = useState('');

  const handleSetCustomerId = useCallback((customer_id: string) => {
    setCustomerId(customer_id);
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customer_id: customerId,
        handleSetCustomerId,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

function useCustomerContext(): ICustomerContextData {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerContext');
  }

  return context;
}

export { CustomerProvider, useCustomerContext };
