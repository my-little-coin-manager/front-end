import React, { ReactNode } from "react";
import styled from "styled-components";

interface IModalTitleProps {
  children: ReactNode;
}

const ModalTitle = ({ children }: IModalTitleProps) => {
  return <Title>{children}</Title>;
};

export default ModalTitle;

const Title = styled.h2`
  text-align: center;
  width: 100%;
  margin: 0 0 2rem 0;
`;
