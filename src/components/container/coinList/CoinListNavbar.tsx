import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menuSelect } from "recoil/atoms";

const CoinListNavbar = () => {
  const [select, setSelect] = useRecoilState(menuSelect);

  const selectMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.id === "all" ? setSelect("all") : setSelect("bookmark");
  };

  return (
    <SelectMenu color={select}>
      <p onClick={selectMenu} id={"all"}>
        전체코인
      </p>
      <p onClick={selectMenu} id={"bookmark"}>
        즐겨찾기
      </p>
    </SelectMenu>
  );
};

export default CoinListNavbar;

const SelectMenu = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;

  & p:first-child {
    margin: auto 3.5rem;
    color: ${(props) => (props.color === "all" ? "#2196F3" : "black")};
    border-bottom: ${(props) => (props.color === "all" ? "3px solid #2196F3" : "3px solid rgba(0,0,0,0)")};

    &:hover {
      cursor: pointer;
      color: #2196f3;
    }
  }

  & p:last-child {
    margin: auto 3.5rem;
    color: ${(props) => (props.color === "bookmark" ? "#2196F3" : "black")};
    border-bottom: ${(props) => (props.color === "bookmark" ? "3px solid #2196F3" : "3px solid rgba(0,0,0,0)")};

    &:hover {
      cursor: pointer;
      color: #2196f3;
    }
  }
`;
