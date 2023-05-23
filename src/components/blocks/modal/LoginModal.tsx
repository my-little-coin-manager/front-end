import React from "react";
import useAuth from "hooks/useAuth";
import styled from "styled-components";
import Modal from "components/atoms/Modal";
import ModalBottomMsg from "components/atoms/ModalBottomMsg";
import AbledBtn from "components/atoms/AbledBtn";
import DisabledBtn from "components/atoms/DisabledBtn";
import ModalTitle from "components/atoms/ModalTitle";
import Input from "components/atoms/Input";
import API from "service/API";

interface IResponse {
  response?: {
    status: number;
    headers: string;
  };
}

interface ILoginModalProps {
  onSignUpModal: () => void;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ onSignUpModal, setLoginModal }: ILoginModalProps) => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();

  const getUser = async (userInfo: IResponse) => {
    try {
      const response = await API.post(process.env.REACT_APP_API_URL + "/login", userInfo);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("nickname", response.data.nickname);
      setLoginModal(false);
      window.location.reload();
    } catch (error: unknown) {
      const errMsg = (await error) as IResponse;
      alert(errMsg);
    }
  };

  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => onSubmit(e, getUser)}
    >
      <ModalTitle>로그인</ModalTitle>
      <InputContainer>
        <Input type="text" name="id" value={userInfo.id} placeholder="아이디" onChange={(e) => onChangehandler(e)} />
        <Input
          type="password"
          name="pw"
          value={userInfo.pw}
          placeholder="비밀번호"
          onChange={(e) => onChangehandler(e)}
        />
      </InputContainer>

      {userInfo.id !== "" && userInfo.pw !== "" ? <AbledBtn>로그인</AbledBtn> : <DisabledBtn>로그인</DisabledBtn>}
      <AbledBtn
        type="button"
        onClick={() => {
          onSignUpModal();
        }}
      >
        회원가입
      </AbledBtn>
      <ModalBottomMsg>회원가입을 하고 MLCM의 서비스를 자유롭게 이용하세요!</ModalBottomMsg>
    </Modal>
  );
};

export default LoginModal;

const InputContainer = styled.div`
  margin-bottom: 3rem;
`;
