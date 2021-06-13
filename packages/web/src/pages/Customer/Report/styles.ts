import styled from 'styled-components';
import { shade } from 'polished';

interface IActionButtonProps {
  color: string;
}

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CustomerContainer = styled.div`
  display: flex;

  margin: -84vh 0 10vh 20vw;

  justify-content: center;
`;

export const NameInfo = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  h1 {
    color: #fff;
    font-size: 64px;
  }
  span {
    color: #fff;
  }
`;

export const CustomerContactInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30vw;
`;

export const FlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactsListContainer = styled.div`
  display: flex;
  width: 30vw;

  margin-left: 20vw;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;

  margin: 30px 0;
`;

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;

  width: 30vw;
`;

export const ItemMid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 20px;

  width: 30vw;
`;

export const FlexDirectionRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ActionButton = styled.button<IActionButtonProps>`
  background: ${props => props.color};
  width: 100%;
  height: 56px;
  border-radius: 10px;
  border: 0;

  padding: 16px;
  margin: 16px 0 0 20px;

  color: #fff;
  font-size: 20px;

  transition: background-color 0.2s;

  &:hover {
    background: ${props => {
      return shade(0.2, String(props.color));
    }};
  }
`;
