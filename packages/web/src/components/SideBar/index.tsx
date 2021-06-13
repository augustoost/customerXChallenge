import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FiUsers, FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import { RiBookletLine } from 'react-icons/ri';

import {
  SideBarContainer,
  OptionsButton,
  OptionsContainer,
  OptionsLabel,
} from './styles';

const SideBar: React.FC = () => {
  const [showCustomerOptions, setShowCustomerOptions] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  return (
    <SideBarContainer>
      {/* Customers Options */}
      <div style={{ marginBottom: 30 }}>
        <OptionsButton
          onClick={() => setShowCustomerOptions(!showCustomerOptions)}
        >
          <OptionsLabel>
            <FiUsers />
            <p>Clientes</p>
          </OptionsLabel>

          {showCustomerOptions ? <FiChevronDown /> : <FiChevronLeft />}
        </OptionsButton>

        {showCustomerOptions && (
          <OptionsContainer>
            <Link to="/customer/list">
              <span style={{ marginBottom: 10 }}>Listagem</span>
            </Link>

            <Link to="/customer/register/">
              <span style={{ marginBottom: 10 }}>Cadastro</span>
            </Link>
          </OptionsContainer>
        )}
      </div>

      {/* Contacts Options */}
      <div>
        <OptionsButton
          onClick={() => setShowContactOptions(!showContactOptions)}
        >
          <OptionsLabel>
            <RiBookletLine />
            <p>Contatos</p>
          </OptionsLabel>

          {showContactOptions ? <FiChevronDown /> : <FiChevronLeft />}
        </OptionsButton>

        {showContactOptions && (
          <OptionsContainer>
            <Link to="/contact/list">
              <span style={{ marginBottom: 10 }}>Listagem</span>
            </Link>

            <Link to="/contact/register">
              <span style={{ marginBottom: 10 }}>Cadastro</span>
            </Link>
          </OptionsContainer>
        )}
      </div>
    </SideBarContainer>
  );
};

export default SideBar;
