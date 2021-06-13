import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 32px 0;
  background: #502f87;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 0;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
    margin-left: 20px;
  }

  button {
    position: absolute;
    right: 370px;
    background: transparent;
    border: 0;

    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #00f55b;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
