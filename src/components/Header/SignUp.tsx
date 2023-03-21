import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import axios from "axios";
import styled from "styled-components";
import AbledBtn from "components/common/AbledBtn";
import DisabledBtn from "components/common/DisabledBtn";

const SignUp = ({ onSignUpModal }: any) => {
  const { onChangehandler, onSubmit, userInfo } = useAuth();
  const [checkPw, setCheckPw] = useState("");
  const [inspecMsg, setInspecMsg] = useState("비밀번호 확인을 위해 다시 한 번 입력해주세요.");

  const postUser = async (userInfo: any) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/user", userInfo);
      console.log(response.data);
    } catch (error: any) {
      const errMsg = await error.response.data.msg;
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
    <SignUpContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => onSubmit(e, postUser)}
    >
      <TopMsg>
        <h2>
          <p onClick={() => onSignUpModal(false)}>✕</p>
          회원가입
        </h2>
      </TopMsg>
      <InputContainer>
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            name="id"
            value={userInfo.id}
            placeholder={"아이디"}
            onChange={(e) => onChangehandler(e)}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            name="nickname"
            value={userInfo.nickname}
            placeholder="닉네임"
            onChange={(e) => onChangehandler(e)}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="password"
            name="pw"
            value={userInfo.pw}
            placeholder={"비밀번호"}
            onChange={(e) => onChangehandler(e)}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="password"
            name="pw"
            value={checkPw}
            onChange={(e) => {
              setCheckPw(e.target.value);
            }}
            placeholder={"비밀번호 확인"}
          />
        </div>
      </InputContainer>
      <Checkmsg color={inspecMsg}>{inspecMsg}</Checkmsg>
      {checkAll() === true ? <AbledBtn>회원가입</AbledBtn> : <DisabledBtn>회원가입</DisabledBtn>}
    </SignUpContainer>
  );
};

const SignUpContainer = styled.form`
  width: 300px;
  height: 30rem;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  border-radius: 20px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  backdrop-filter: drop-shadow(4px 4px 10px blue);

  & div {
    display: flex;
    justify-content: space-between;
  }
`;

const InputContainer = styled.div`
  border: 1.5px solid #e5e7eb;
  flex-direction: column;

  & div:nth-child(1) {
    border-bottom: 1.5px solid #e5e7eb;
  }
  & div:nth-child(2) {
    border-bottom: 1.5px solid #e5e7eb;
  }

  & div:nth-child(4) {
    border-top: 1.5px solid #e5e7eb;
  }

  & input:first-child {
    width: 85%;
    padding: 0.75rem 1rem;

    :focus {
      outline: none;
      border: none;
    }
  }

  & input:last-child {
    width: 85%;
    padding: 0.75rem 1rem;
    border: none;

    :focus {
      outline: none;
      border: none;
    }
  }
`;

const Checkmsg = styled.p`
  margin: 0.25rem 0 4rem 0;
  font-size: 0.65rem;
  font-weight: 100;
  color: ${(props) =>
    props.color === "입력한 비밀번호가 서로 다릅니다."
      ? "red"
      : props.color === "비밀번호가 일치합니다."
      ? "green"
      : "rgba(165,175,202,0.8)"};
`;

const TopMsg = styled.div`
  & h2 {
    height: 6rem;
    text-align: center;
    width: 100%;
    margin: 1rem 0 2rem 0;

    & p {
      color: "rgba(165,175,202,0.8)";
      font-weight: lighter;
      text-align: right;
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default SignUp;
