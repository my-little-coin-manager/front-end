import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import axios from "axios";
import styled from "styled-components";
import Modal from "components/atoms/Modal";
import ModalTitle from "components/atoms/ModalTitle";
import ModalBottomMsg from "components/atoms/ModalBottomMsg";
import AbledBtn from "components/atoms/AbledBtn";
import DisabledBtn from "components/atoms/DisabledBtn";
import Input from "components/atoms/Input";

interface IResponse {
  response?: {
    status: number;
    headers: string;
  };
}
interface ISignUpModalProps {
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpModal = ({ setSignUpModal }: ISignUpModalProps) => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();
  const [checkPw, setCheckPw] = useState("");
  const [inspecMsg, setInspecMsg] = useState("비밀번호 확인을 위해 다시 한 번 입력해주세요.");

  const postUser = async (userInfo: IResponse) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/user", userInfo);
      alert(response.data.msg);
      window.location.reload();
    } catch (error: unknown) {
      const errMsg = (await error) as IResponse;
      alert(errMsg);
    }
  };

  const checkPassword = () => {
    if (userInfo.pw !== checkPw) {
      setInspecMsg("입력한 비밀번호가 서로 다릅니다.");
    } else {
      setInspecMsg("비밀번호가 일치합니다.");
    }
  };

  const checkAll = () => {
    if (
      userInfo.id !== "" &&
      userInfo.pw !== "" &&
      userInfo.nickname !== "" &&
      checkPw !== "" &&
      inspecMsg === "비밀번호가 일치합니다."
    )
      return true;
    return false;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkPassword();
    }, 500);
    if (checkPw === "") {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [checkPw]);

  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => onSubmit(e, postUser)}
    >
      <ModalTitle>회원가입</ModalTitle>
      <Input type="text" name="id" value={userInfo.id} placeholder={"아이디"} onChange={(e) => onChangehandler(e)} />
      <Input
        type="text"
        name="nickname"
        value={userInfo.nickname}
        placeholder="닉네임"
        onChange={(e) => onChangehandler(e)}
      />
      <Input
        type="password"
        name="pw"
        value={userInfo.pw}
        placeholder={"비밀번호"}
        onChange={(e) => onChangehandler(e)}
      />
      <Input
        type="password"
        name="pw"
        value={checkPw}
        onChange={(e) => {
          setCheckPw(e.target.value);
        }}
        placeholder={"비밀번호 확인"}
      />
      <Checkmsg color={inspecMsg}>{inspecMsg}</Checkmsg>
      {checkAll() === true ? <AbledBtn>회원가입</AbledBtn> : <DisabledBtn>회원가입</DisabledBtn>}
      <ModalBottomMsg>지금 회원이 되시면 MLCM의 주요 기능을 이용할 수 있습니다. </ModalBottomMsg>
    </Modal>
  );
};

const Checkmsg = styled.p`
  margin: 0.25rem 0 3rem 0;
  font-size: 0.65rem;
  font-weight: 100;
  color: ${(props) =>
    props.color === "입력한 비밀번호가 서로 다릅니다."
      ? "red"
      : props.color === "비밀번호가 일치합니다."
      ? "green"
      : "rgba(165,175,202,0.8)"};
`;

export default SignUpModal;
