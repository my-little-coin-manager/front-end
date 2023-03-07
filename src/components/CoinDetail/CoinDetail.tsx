import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import DetailNameBox from "./DetailNameBox";
import DetailPrice from "./DetailPrice";
import { coinMarkets, coinTickers, coinSelect } from "../../recoil/atoms";
import styled from "styled-components";
import CoinChart from "components/Chart/CoinChart";

const CoinDetail = () => {
  const markets = useRecoilValue<any>(coinMarkets);
  const tickers = useRecoilValue<any>(coinTickers);
  const selected = useRecoilValue<any>(coinSelect);

  const selectedMk = markets?.KRW.find((data: any) => data.market === selected);

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
