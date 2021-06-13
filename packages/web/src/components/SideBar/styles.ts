import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const SideBarContainer = styled.div`
  width: 20vw;
  height: 84vh;

  z-index: 1;
`;

export const OptionsButton = styled.button`
  background: transparent;
  color: #fff;
  display: flex;
  border: 0;
  width: 200px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;

  a {
    color: #ffff;
    text-decoration: none;
  }
`;

export const OptionsLabel = styled.div`
  display: flex;
  width: 120px;
  flex-direction: row;

  p {
    margin-left: 10px;
    font-size: 17px;
    font-weight: 600;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  margin-top: 15px;

  background-color: transparent;

  color: #fff;

  a {
    color: #ffff;
    display: block;
    margin-top: 10px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }

    span {
      font-size: 17px;
      font-weight: 600;
    }
  }
`;
