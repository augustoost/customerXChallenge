import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #00f55b;
  width: 100%;
  height: 56px;
  border-radius: 10px;
  border: 0;

  padding: 16px;
  margin-top: 16px;

  color: #fff;
  font-size: 20px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#00f55b')};
  }
`;
