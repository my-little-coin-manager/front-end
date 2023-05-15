import React from "react";
import styled from "styled-components";

interface IPorfolioCoinName {
  koreanName: string;
  marketCode: string;
}

const CoinTilteBlock = ({ koreanName, marketCode }: IPorfolioCoinName) => {
  const splitMarketCode = marketCode.split("-");
  return (
    <CoinTilteBlockContainer>
      <MarketSymbol src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} />
      <p>{koreanName}</p>
    </CoinTilteBlockContainer>
  );
};

export default React.memo(CoinTilteBlock);

const CoinTilteBlockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: calc(100% / 8);
  color: #333;

  & p {
    font-size: 0.8rem;
  }
`;

const MarketSymbol = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 0.5rem;
`;
