import React, { ReactNode } from "react";
import styled from "styled-components";

interface DisabledBtnIProps {
  children: ReactNode;
}

const DisabledBtn = ({ children }: DisabledBtnIProps) => {
  return <Btn disabled={true}>{children}</Btn>;
};

const Btn = styled.button`
  height: 3rem;
  background-color: #bbbbbb;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: 500;
  font-size: 0.85rem;

  &:hover {
    cursor: pointer;
  }
`;

export default DisabledBtn;
