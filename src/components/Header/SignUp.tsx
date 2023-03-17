import React, { useState } from "react";
import useAuth from "hooks/useAuth";
import axios from "axios";
import styled from "styled-components";

const SignUp = () => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();

  const postUser = async (userInfo: any) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/user", userInfo);
      console.log(response.data);
    } catch (error: any) {
      const errMsg = await error.response.data.msg;
      alert(errMsg);
    }
  };

  return (
    <SignUpContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => onSubmit(e, postUser)}
    >
      <TopMsg>
        <h2>
          <p>✕</p>
          회원가입
        </h2>
      </TopMsg>
      <InputContainer>
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            name="id"
            value={userInfo.id}
            placeholder={"아이디"}
            onChange={(e) => onChangehandler(e)}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="password"
            name="pw"
            value={userInfo.pw}
            placeholder={"비밀번호"}
            onChange={(e) => onChangehandler(e)}
          />
        </div>
      </InputContainer>

      <button>회원가입</button>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.form`
  width: 300px;
  height: 28rem;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  border-radius: 20px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  backdrop-filter: drop-shadow(4px 4px 10px blue);

  & div {
    display: flex;
    justify-content: space-between;
  }

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
`;

const InputContainer = styled.div`
  border: 1.5px solid #e5e7eb;
  margin-bottom: 6rem;
  flex-direction: column;

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
  & h2 {
    height: 6rem;
    text-align: center;
    width: 100%;
    margin: 1rem 0 2rem 0;

    & p {
      text-align: right;
      margin: 0;
    }
  }
`;

export default SignUp;
