import React from "react";
import styled from "styled-components";
import { Market } from "types/types";

interface IDetailMarketTilteProps {
  select: string;
  focus: Market;
}

const TitleBlock = ({ select, focus }: IDetailMarketTilteProps) => {
  return (
    <Container>
      <MarketSymbol src={`https://static.upbit.com/logos/${select.split("-")[1]}.png`} />
      <MarketName>{focus?.korean_name}</MarketName>
      <p>{focus?.market}</p>
    </Container>
  );
};

export default React.memo(TitleBlock);

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

const MarketSymbol = styled.img`
  max-width: 2.3rem;
  max-height: 2.3rem;
  margin: 0 0.5rem 0 0;
`;

const MarketName = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0 0.5rem 0 0;
`;
