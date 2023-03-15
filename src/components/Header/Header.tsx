import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../asset/svg/mlcm_logo.svg";
import Login from "./Login";

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);

  const onLoginModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <HeaderContainer>
      <h1>
        <Logo />
      </h1>
      <nav>
        <p onClick={onLoginModal}>SIGN IN</p>
        <p>SIGN UP</p>
      </nav>
      {loginModal ? <Login /> : null}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 4%;

  & h1 {
    margin: 0;
    width: 200px;
    display: flex;
  }

  & nav {
    & p {
      margin-left: 20px;
      color: #333;
      &:hover {
        cursor: pointer;
        color: #3d6bfb;
      }
    }
    display: flex;
  }
`;

export default Header;
