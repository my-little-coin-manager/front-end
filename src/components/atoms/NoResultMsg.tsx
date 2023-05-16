import React, { ReactNode } from "react";
import styled from "styled-components";
import { ReactComponent as Exclamation } from "asset/svg/exclamation.svg";

interface INoResultMsgProps {
  children: ReactNode;
}

const NoResultMsg = ({ children }: INoResultMsgProps) => {
  return (
    <ErrorMessage>
      <Exclamation />
      <p>{children}</p>
    </ErrorMessage>
  );
};

export default NoResultMsg;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 8rem;

  & p {
    margin-top: 1rem;
    color: #c0c0c0;
  }
`;
