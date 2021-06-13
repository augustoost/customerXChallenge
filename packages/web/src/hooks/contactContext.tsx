import React, { createContext, useCallback, useContext, useState } from 'react';

interface IContactContextData {
  contact_id: string;
  handleSetContactId(contact_id: string): void;
}

const ContactContext = createContext<IContactContextData>(
  {} as IContactContextData,
);

const ContactProvider: React.FC = ({ children }) => {
  const [contactId, setContactId] = useState('');

  const handleSetContactId = useCallback((contact_id: string) => {
    setContactId(contact_id);
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contact_id: contactId,
        handleSetContactId,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

function useContactContext(): IContactContextData {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('useContactContext must be used within a ContactContext');
  }

  return context;
}

export { ContactProvider, useContactContext };
