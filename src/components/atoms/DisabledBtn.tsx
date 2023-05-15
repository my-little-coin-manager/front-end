import React from "react";
import styled from "styled-components";

interface IProps {
  children: string;
}

const DisabledBtn = (props: IProps) => {
  return <Btn disabled={true}>{props.children}</Btn>;
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
