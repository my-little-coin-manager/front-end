import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "asset/svg/mlcm_logo_white.svg";
import LoginModal from "components/blocks/modal/LoginModal";
import SignUpModal from "components/blocks/modal/SignUpModal";
import useLogout from "hooks/useLogout";

interface IModalControl {
  loginModal: boolean;
  signUpModal: boolean;
}

interface IHeaderProps {
  componentsControl: string;
  setComponentsControl: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ componentsControl, setComponentsControl }: IHeaderProps) => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);

  const onLoginModal = () => {
    setLoginModal(!loginModal);
    setSignUpModal(false);
  };

  const onSignUpModal = () => {
    setSignUpModal(true);
    setLoginModal(false);
  };

  const logout = async () => {
    await useLogout();
    localStorage.clear();
    window.location.reload();
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

      {!localStorage.getItem("accessToken") ? (
        <LoginInfo>
          <p onClick={onLoginModal}>SIGN IN</p>
          <p onClick={onSignUpModal}>SIGN UP</p>
        </LoginInfo>
      ) : (
        <LoginInfo>
          <span>{localStorage.getItem("nickname")} 님 환영합니다.</span>
          <p onClick={logout}>로그아웃</p>
        </LoginInfo>
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
        {loginModal ? <LoginModal onSignUpModal={onSignUpModal} setLoginModal={setLoginModal} /> : null}
        {signUpModal ? <SignUpModal setSignUpModal={setSignUpModal} /> : null}
      </ModalBackground>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  background-color: #1261c4;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 3.5rem;
  font-weight: 700;

  & h1 {
    margin: 0;
    display: flex;
  }

  & span {
    display: flex;

    & span {
      font-size: 0.9rem;
      font-weight: lighter;
      margin: 0 1rem 0 2rem;
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

const ModalBackground = styled.div<IModalControl>`
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

const LoginInfo = styled.span`
  align-items: center;
`;
