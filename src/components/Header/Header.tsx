import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../asset/svg/mlcm_logo.svg";
import Login from "./Login";

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);

  const onLoginModal = () => {
    setLoginModal(!loginModal);
  };

  console.log(loginModal);

  return (
    <HeaderContainer>
      <h1 style={{ width: "200px" }}>
        <Logo />
      </h1>
      <nav>
        <button onClick={onLoginModal}>Sign In</button>
        {loginModal ? <Login /> : null}
        <button>Sign Up</button>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  align-items: center;

  & h1 {
    margin: 0;
  }

  & nav {
    display: flex;
  }
`;

export default Header;
