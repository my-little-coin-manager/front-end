import React from "react";
import styled from "styled-components";

interface IPorfolioCoinName {
  koreanName: string;
  marketCode: string;
}

const PortfolioCoinName = ({ koreanName, marketCode }: IPorfolioCoinName) => {
  const splitMarketCode = marketCode.split("-");
  return (
    <CoinStock>
      <img src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} alt="" />
      {koreanName}
    </CoinStock>
  );
};

export default React.memo(PortfolioCoinName);

const CoinStock = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
  color: #333;

  :first-child {
    justify-content: left;
  }

  & img {
    width: 25px;
    height: 25px;
    margin: 0 0.5rem;
  }
`;
