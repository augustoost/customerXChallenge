import styled from 'styled-components';
import { shade } from 'polished';

interface IActionButtonProps {
  color: string;
}

export const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  flex: 1;
`;

export const ItemsContainer = styled.div`
  flex-direction: column;
  width: 79.5vw;

  margin-left: 20%;
  margin-top: -40%;

  h4 {
    margin: 5px 0 5px 5px;
  }
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

export const FlexDirectionColumn = styled.div`
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
