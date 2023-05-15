import React from "react";
import styled from "styled-components";
import CoinTitle from "components/CoinTitle";
import CoinImg from "components/CoinImg";

interface NameProps {
  koreanName: string;
  marketCode: string;
}

const CoinName = ({ koreanName, marketCode }: NameProps) => {
  const splitMarketCode = marketCode.split("-");

  return (
    <Coin>
      <span>
        <CoinImg coinImg={splitMarketCode[1]} />
        <span>
          <CoinTitle title={koreanName} />
          <p>
            {splitMarketCode[1]}/{splitMarketCode[0]}
          </p>
        </span>
      </span>
    </Coin>
  );
};

const Coin = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 11px;
  width: 25%;
  margin-left: 5%;

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
    align-items: center;
  }

  & span span {
    display: block;
  }

  & span span :last-child {
    color: gray;
    font-size: 10px;
  }
`;

export default React.memo(CoinName);
