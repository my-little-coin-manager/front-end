import React, { useState } from "react";

type User = {
  id: string;
  pw: string;
  nickname: string;
};

const initialState = { id: "", pw: "", nickname: "" };

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<User>(initialState);

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState: User) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, axiosFn: (userInfo: any) => Promise<void>) => {
    e.preventDefault();
    axiosFn(userInfo);
  };

  return { onChangehandler, onSubmit, userInfo };
};

export default useAuth;
