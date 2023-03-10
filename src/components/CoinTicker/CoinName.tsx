import React, { useMemo } from "react";
import styled from "styled-components";

interface NameProps {
  koreanName: string;
  marketCode: string;
}

const CoinName = ({ koreanName, marketCode }: NameProps) => {
  const splitMarketCode = marketCode.split("-");

  return (
    <Coin>
      <span>
        <img src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} alt="" />
        <span>
          <p>{koreanName}</p>
          <p>
            {splitMarketCode[1]}/{splitMarketCode[0]}
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
