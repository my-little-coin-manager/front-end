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
      <div>
        <label htmlFor="">아이디</label>
        <input type="text" name="id" value={userInfo.id} onChange={(e) => onChangehandler(e)} />
      </div>
      <div>
        <label htmlFor="">비밀번호</label>
        <input type="password" name="pw" value={userInfo.pw} onChange={(e) => onChangehandler(e)} />
      </div>
      <button>회원가입</button>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.form`
  width: 300px;
  height: 200px;
  position: absolute;
  z-index: 999;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  backdrop-filter: drop-shadow(4px 4px 10px blue);

  & div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  & input {
    width: 70%;
  }
`;

export default SignUp;
