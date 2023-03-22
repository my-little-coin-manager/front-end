import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import styled from "styled-components";

const AbledBtn = (props: any) => {
  return (
    <Btn type="submit" onClick={props.onClick}>
      {props.children}
    </Btn>
  );
};

const Btn = styled.button`
  height: 3rem;
  background-color: #3d6bfb;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  color: #fff;
  font-weight: 500;
  font-size: 0.85rem;

  &:hover {
    background-color: #284aaf;
    cursor: pointer;
  }
`;

export default AbledBtn;
