import React from 'react';

import { FiPower } from 'react-icons/fi';

import { HeaderContainer, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/CustomerXLogo.svg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, email } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="CustomerX logo" />

        <Profile>
          <div>
            <span>Bem vindo,</span>

            <strong style={{ color: '#00f55b' }}>{email}</strong>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
