import React, { useState } from "react";
import axios from "axios";
import useAuth from "hooks/useAuth";
import styled from "styled-components";

const Login = ({ onSignUpModal }: any) => {
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
      <div>
        <label htmlFor="">아이디</label>
        <input type="text" name="id" value={userInfo.id} onChange={(e) => onChangehandler(e)} />
      </div>
      <div>
        <label htmlFor="">비밀번호</label>
        <input type="password" name="pw" value={userInfo.pw} onChange={(e) => onChangehandler(e)} />
      </div>
      <button>로그인</button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSignUpModal();
        }}
      >
        회원가입
      </button>
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
  height: 200px;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  /* backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px); */

  & button {
    height: 30px;
    background-color: #3d6bfb;
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    color: #fff;
    font-weight: 700;
    font-size: 11px;
  }

  & div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  & input {
    width: 70%;
  }
`;

export default Login;
