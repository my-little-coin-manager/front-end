import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../asset/svg/mlcm_logo_white.svg";
import Login from "./Login";
import SignUp from "./SignUp";

interface ModalStyled {
  loginModal: boolean;
  signUpModal: boolean;
}

const Header = ({ componentsControl, setComponentsControl }: any) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const onLoginModal = (e: any) => {
    setLoginModal(!loginModal);
    setSignUpModal(false);
  };

  const onSignUpModal = (e: any) => {
    setSignUpModal(!signUpModal);
    setLoginModal(false);
  };

  return (
    <HeaderContainer>
      <h1>
        <Logo />
      </h1>
      <NavBar color={componentsControl}>
        <p onClick={() => setComponentsControl("detail")}>COIN DETAIL</p>
        <p onClick={() => setComponentsControl("portfolio")}>PORTFOLIO</p>
      </NavBar>
      <span>
        <p onClick={onLoginModal}>SIGN IN</p>
        <p onClick={onSignUpModal}>SIGN UP</p>
      </span>
      <ModalBackground
        onClick={(e) => {
          e.stopPropagation();
          setLoginModal(false);
          setSignUpModal(false);
        }}
        loginModal={loginModal}
        signUpModal={signUpModal}
      >
        {loginModal ? <Login onSignUpModal={onSignUpModal} onLoginModal={onLoginModal} /> : null}
        {signUpModal ? <SignUp onSignUpModal={onSignUpModal} /> : null}
      </ModalBackground>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  background-color: #1261c4;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  font-weight: 700;

  & h1 {
    margin: 0;
    width: 200px;
    display: flex;
  }

  & span {
    & p {
      margin-left: 2rem;
      color: #fff;
      &:hover {
        cursor: pointer;
        color: #3d6bfb;
      }
    }
    display: flex;
  }
`;

const NavBar = styled.nav`
  text-align: center;
  display: flex;
  & p:first-child {
    margin: 0 4rem;
    color: ${(props) => (props.color === "detail" ? "#fff" : "rgba(165,175,202,0.8)")};

    &:hover {
      cursor: pointer;
      color: #3d6bfb;
      scale: 100.1%;
    }
  }

  & p:last-child {
    margin: 0 4rem;
    color: ${(props) => (props.color === "portfolio" ? "#fff" : "rgba(165,175,202,0.8)")};

    &:hover {
      cursor: pointer;
      color: #3d6bfb;
      scale: 100.1%;
    }
  }
`;

const ModalBackground = styled.div<ModalStyled>`
  display: ${({ loginModal, signUpModal }) => (loginModal || signUpModal ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

export default Header;
