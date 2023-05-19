import React, { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

interface IModalProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLFormElement>;
  onSubmit: MouseEventHandler<HTMLFormElement>;
}

const Modal = ({ children, onClick, onSubmit }: IModalProps) => {
  return (
    <ModalContainer onClick={onClick} onSubmit={onSubmit}>
      {children}
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.form`
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
