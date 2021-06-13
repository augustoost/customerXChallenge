import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { CustomerProvider } from '../hooks/customerContext';
import { ContactProvider } from '../hooks/contactContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CustomerProvider>
      <ContactProvider>
        <ToastProvider>{children}</ToastProvider>
      </ContactProvider>
    </CustomerProvider>
  </AuthProvider>
);

export default AppProvider;
