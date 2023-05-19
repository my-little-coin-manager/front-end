import React from "react";
import styled from "styled-components";

interface IInputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ type, name, value, placeholder, onChange }: IInputProps) => {
  return <UserInput type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />;
};

export default Input;

const UserInput = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e5e7eb;
  margin-top: -1.5px;

  ::placeholder {
    color: #9f9f9f;
  }

  :focus {
    outline: none;
  }
`;
