import React from "react";
import { useRecoilValue } from "recoil";
import DetailNameBox from "./DetailNameBox";
import DetailPrice from "./DetailPrice";
import { coinMarkets, coinTickers, coinSelect } from "../../recoil/atoms";
import styled from "styled-components";
import CoinChart from "components/Chart/CoinChart";
import { market } from "types/types";

const CoinDetail = () => {
  const markets = useRecoilValue(coinMarkets);
  const tickers = useRecoilValue(coinTickers);
  const selected = useRecoilValue<string>(coinSelect);
  const selectedMk = markets?.find((data: market) => data.market === selected);

  return (
    <DetailContainer>
      <DetailNameBox select={selected} focus={selectedMk} />
      <DetailPrice select={selected} ticker={tickers[selected]} />
      <CoinChart />
    </DetailContainer>
  );
};

export default CoinDetail;

//디테일 컨테이너
const DetailContainer = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 70rem;
  height: calc(100vh - 134px);
  margin: 50px 1rem 0 0;
  padding: 1rem;
`;
