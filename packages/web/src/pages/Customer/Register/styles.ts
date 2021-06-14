import styled from 'styled-components';
import { shade } from 'polished';

interface ISubmitButtonProps {
  color: string;
}

export const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: -20%;
`;

export const FormContainer = styled.div`
  width: 20%;

  h1 {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
`;

export const AddEmail = styled.button`
  margin: 10px 0;
  border: 0;
  color: #fff;
  background-color: transparent;
`;

export const SubmitButton = styled.button<ISubmitButtonProps>`
  background: ${props => props.color};
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
    background: ${props => {
      return shade(0.2, String(props.color));
    }};
  }
`;
