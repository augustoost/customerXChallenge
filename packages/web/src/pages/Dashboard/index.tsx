import React from 'react';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <body>
        <SideBar />
      </body>
    </Container>
  );
};

export default Dashboard;
