import React, { useMemo } from "react";
import styled from "styled-components";

const CoinName = ({ koreanName, marketCode }: any) => {
  const name = useMemo(() => {
    console.log("이름 변경");
    return koreanName;
  }, [koreanName]);

  const market = useMemo(() => {
    return marketCode.split("-");
  }, [marketCode]);

  return (
    <Coin>
      <span>
        <img src={`https://static.upbit.com/logos/${market[1]}.png`} alt="" />
        <span>
          <p>{name}</p>
          <p>
            {market[1]}/{market[0]}
          </p>
        </span>
      </span>
    </Coin>
  );
};

const Coin = styled.td`
  color: #333;
  font-weight: 600;
  font-size: 11px;

  & img {
    width: 25px;
    height: 25px;
    margin: auto 0;
  }

  & p {
    margin: 0 0 0 10px;
  }

  & span {
    display: flex;
  }

  & span span {
    display: block;
  }

  & span span :last-child {
    color: gray;
    font-size: 10px;
  }
`;

export default CoinName;
