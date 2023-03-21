import React, { useState, useEffect } from "react";
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
    setLoginModal(true);
    setSignUpModal(false);
  };

  const onSignUpModal = (e: any) => {
    setSignUpModal(true);
    setLoginModal(false);
  };

  const logout = () => {
    localStorage.clear();
  };

  // useEffect(() => {

  // }, [localStorage]);

  return (
    <HeaderContainer>
      <h1>
        <Logo />
      </h1>
      <NavBar color={componentsControl}>
        <p onClick={() => setComponentsControl("detail")}>COIN DETAIL</p>
        <p onClick={() => setComponentsControl("portfolio")}>PORTFOLIO</p>
      </NavBar>

      {localStorage.getItem("token") === null ? (
        <span>
          <p onClick={onLoginModal}>SIGN IN</p>
          <p onClick={onSignUpModal}>SIGN UP</p>
        </span>
      ) : (
        <span>
          <span>{localStorage.getItem("nickname")} 님 환영합니다.</span>
          <p onClick={logout}>로그아웃</p>
        </span>
      )}

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
    & span {
      font-size: 0.9rem;
      font-weight: lighter;
      margin: 1rem 0 0 2rem;
      color: #fff;
    }
    & p:nth-child(1) {
      margin-left: 2rem;
      color: #fff;
      &:hover {
        cursor: pointer;
        color: #3d6bfb;
      }
    }

    & p:nth-child(2) {
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
