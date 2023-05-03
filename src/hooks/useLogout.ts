import React from "react";
import instance from "service/API";

const useLogout = async () => {
  await instance.post("/logout");
};

export default useLogout;
