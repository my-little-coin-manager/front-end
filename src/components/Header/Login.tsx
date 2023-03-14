import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

type user = {
  id: string;
  pw: string;
};

const Login = () => {
  const [userInfo, setUserInfo] = useState<any>({ id: "", pw: "" });

  const getUser = async (userInfo: any) => {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/user", {
      params: userInfo
    });
    localStorage.setItem("token", response.data.token);
  };

  const onLogin = (e: any) => {
    e.preventDefault();
    getUser(userInfo);
  };

  const onChangehandler = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <LoginContainer onSubmit={onLogin}>
      <div>
        <label htmlFor="">아이디</label>
        <input type="text" name="id" onChange={onChangehandler} />
      </div>
      <div>
        <label htmlFor="">비밀번호</label>
        <input type="password" name="pw" onChange={onChangehandler} />
      </div>
      <button>로그인</button>
    </LoginContainer>
  );
};

const LoginContainer = styled.form`
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

export default Login;
