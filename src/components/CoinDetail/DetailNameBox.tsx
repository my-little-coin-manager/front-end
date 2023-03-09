import React from "react";
import styled from "styled-components";
import { market } from "types/types";

interface NameBoxProps {
  select: string;
  focus?: market;
}

const DetailNameBox = ({ select, focus }: NameBoxProps) => {
  return (
    <NameBox>
      <img src={`https://static.upbit.com/logos/${select.split("-")[1]}.png`} alt="" />
      <div>
        <p>{focus?.korean_name}</p>
        <h4>{focus?.market}</h4>
      </div>
    </NameBox>
  );
};

//디테일 상단 이름 div
const NameBox = styled.div`
  display: flex;
  text-align: center;
  height: 4.9rem;
  margin: 0 auto;
  /* padding-bottom: 1rem; */
  border-bottom: 1px solid #d9d9d9;
  & img {
    width: 3rem;
    height: 3rem;
    margin: 0.4rem 1rem 0 0;
  }
  & div {
    display: inline-flex;
  }

  & p {
    font-size: 2.2rem;
    margin: 0.4rem 1rem 0 0;
    font-weight: bold;
  }
`;

export default React.memo(DetailNameBox);
