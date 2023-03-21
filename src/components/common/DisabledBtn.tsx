import React from "react";
import styled from "styled-components";

const DisabledBtn = ({ children }: any) => {
  return <Btn disabled={true}>{children}</Btn>;
};

const Btn = styled.button`
  height: 3rem;
  background-color: #bbbbbb;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  color: black;
  font-weight: 500;
  font-size: 0.85rem;

  &:hover {
    cursor: pointer;
  }
`;

export default DisabledBtn;
