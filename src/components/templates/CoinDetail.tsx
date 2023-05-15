import React from "react";
import styled from "styled-components";
import CoinDetailHeader from "components/container/coinDetail/CoinDetailHeader";
import CoinDetailBody from "components/container/coinDetail/CoinDetailBody";
import ChartBlock from "components/blocks/coinDetail/ChartBlock";

const CoinDetail = () => {
  return (
    <DetailContainer>
      <CoinDetailHeader />
      <CoinDetailBody />
      <ChartBlock />
    </DetailContainer>
  );
};

export default CoinDetail;

//디테일 컨테이너
const DetailContainer = styled.div`
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 70rem;
  margin-right: 1rem;
  padding: 2rem;
`;
