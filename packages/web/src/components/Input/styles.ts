import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: Boolean;
  isFilled: Boolean;
  isErrored: Boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #8e5ede;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid transparent;
  color: #ffff;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #00f55b;
      border-color: #00f55b;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #00f55b;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #ffff;

    &::placeholder {
      color: #ffff;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
