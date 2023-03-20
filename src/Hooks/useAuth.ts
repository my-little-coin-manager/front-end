import React, { useState } from "react";

type User = {
  id: string;
  pw: string;
  nickname: string;
};

const initialState = { id: "", pw: "", nickname: "" };

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<User>(initialState);

  const onChangehandler = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prevState: any) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = (e: any, axiosFunc: any) => {
    e.preventDefault();
    axiosFunc(userInfo);
  };

  return { onChangehandler, onSubmit, userInfo };
};

export default useAuth;
