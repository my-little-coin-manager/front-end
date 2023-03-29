import React, { useState } from "react";
import axios from "axios";
import useAuth from "hooks/useAuth";
import styled from "styled-components";
import AbledBtn from "components/common/AbledBtn";
import DisabledBtn from "components/common/DisabledBtn";

const Login = ({ onSignUpModal, setLoginModal }: any) => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();

  const getUser = async (userInfo: any) => {
    console.log("겟유저");
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/login", userInfo);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nickname", response.data.nickname);
      setLoginModal(false);
      location.reload();
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
          <p onClick={() => setLoginModal(false)}>✕</p>
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

      {userInfo.id !== "" && userInfo.pw !== "" ? <AbledBtn>로그인</AbledBtn> : <DisabledBtn>로그인</DisabledBtn>}
      <AbledBtn
        type="button"
        onClick={() => {
          onSignUpModal();
        }}
      >
        회원가입
      </AbledBtn>
      <LoginMsg>회원가입을 하고 MLCM의 서비스를 자유롭게 이용하세요!</LoginMsg>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.form`
  width: 18rem;
  height: 28rem;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
