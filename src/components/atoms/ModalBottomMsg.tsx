import React, { ReactNode } from "react";
import styled from "styled-components";

interface IBottomMsgProps {
  children: ReactNode;
}

const ModalBottomMsg = ({ children }: IBottomMsgProps) => {
  return <BottomMsg>{children}</BottomMsg>;
};

export default ModalBottomMsg;

const BottomMsg = styled.p`
  text-align: center;
  font-size: 0.5rem;
  color: #b9b9b9;
  font-weight: 100;
`;
