import React from "react";
import styled from "styled-components";

interface IMarketTilteProps {
  koreanMarketName: string;
  marketCode: string;
}

const TitleBlock = ({ koreanMarketName, marketCode }: IMarketTilteProps) => {
  const splitMarketCode = marketCode.split("-");

  return (
    <Container>
      <MarketSymbol src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} />
      <MarketTitleContainer>
        <h3>{koreanMarketName}</h3>
        <MartketCode>
          {splitMarketCode[1]}/{splitMarketCode[0]}
        </MartketCode>
      </MarketTitleContainer>
    </Container>
  );
};

export default React.memo(TitleBlock);

const Container = styled.span`
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 600;
  font-size: 11px;
  width: 25%;
  margin: 0 0 0 5%;
`;

const MarketTitleContainer = styled.span`
  display: block;
  margin: 0 0 0 0.6rem;
`;

const MarketSymbol = styled.img`
  max-width: 1rem;
  max-height: 1rem;
  margin: auto 0;
`;

const MartketCode = styled.p`
  color: gray;
  font-size: 10px;
`;
