import React, { useState } from "react";
import axios from "axios";
import useAuth from "hooks/useAuth";
import styled from "styled-components";

const Login = ({ onSignUpModal, onLoginModal }: any) => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();

  const getUser = async (userInfo: any) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/login", userInfo);
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      const errMsg = await error.response.data.msg;
      alert(errMsg);
    }
  };

  return (
    <LoginContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => onSubmit(e, getUser)}
    >
      <TopMsg>
        <h2>
          <p onClick={() => onLoginModal(false)}>✕</p>
          로그인
        </h2>
      </TopMsg>
      <InputContainer>
        <div>
          <label htmlFor=""></label>
          <input type="text" name="id" value={userInfo.id} placeholder="아이디" onChange={(e) => onChangehandler(e)} />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="password"
            name="pw"
            value={userInfo.pw}
            placeholder="비밀번호"
            onChange={(e) => onChangehandler(e)}
          />
        </div>
      </InputContainer>

      <button>로그인</button>
      <button
        type="button"
        onClick={(e) => {
          onSignUpModal();
        }}
      >
        회원가입
      </button>
      <LoginMsg>회원가입을 하고 MLCM의 서비스를 자유롭게 이용하세요!</LoginMsg>
    </LoginContainer>
  );
};

// const ModalBackground = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   backdrop-filter: blur(5px);
//   background: rgba(0, 0, 0, 0.8);
//   z-index: 999;
// `;

const LoginContainer = styled.form`
  width: 300px;
  height: 28rem;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem;
  border-radius: 20px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);

  & button {
    height: 3rem;
    background-color: #3d6bfb;
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    color: #fff;
    font-weight: 500;
    font-size: 0.85rem;
  }

  & button:last-child {
    height: 3rem;
    background-color: #fff;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 5px;
    color: gray;
    font-weight: 500;
    font-size: 0.85rem;
  }

  & div:first-child {
    border-bottom: 1.5px solid #e5e7eb;
  }

  & input:first-child {
    width: 85%;
    padding: 0.75rem 1rem;

    :focus {
      outline: none;
      border: none;
    }
  }

  & input:last-child {
    width: 85%;
    padding: 0.75rem 1rem;
    border: none;

    :focus {
      outline: none;
      border: none;
    }
  }
`;

const TopMsg = styled.div`
  height: 4rem;
  & h2 {
    text-align: center;
    width: 100%;
    margin: -2rem 0 0 0;

    & p {
      color: "rgba(165,175,202,0.8)";
      font-weight: lighter;
      text-align: right;
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const InputContainer = styled.div`
  border: 1.5px solid #e5e7eb;
  margin-bottom: 3rem;
`;

const LoginMsg = styled.p`
  padding-top: 2rem;
  text-align: center;
  font-size: 11px;
  color: gray;
  font-weight: normal;
`;

export default Login;
