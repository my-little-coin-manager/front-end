import React from "react";
import { useRecoilValue } from "recoil";
import DetailNameBox from "../components/coinDetail/DetailNameBox";
import DetailPrice from "../components/coinDetail/DetailPrice";
import { coinMarkets, coinSelect, userBookmark } from "../recoil/atoms";
import styled from "styled-components";
import CoinChart from "components/chart/CoinChart";
import { market } from "types/types";

const CoinDetail = () => {
  const markets = useRecoilValue(coinMarkets);
  const selected = useRecoilValue<string>(coinSelect);
  const selectedMk = markets?.find((data: market) => data.market === selected);
  const bookmarkInfo = useRecoilValue(userBookmark);

  return (
    <DetailContainer>
      <DetailNameBox select={selected} focus={selectedMk} status={bookmarkInfo.includes(selected)} />
      <DetailPrice select={selected} />
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
  margin-right: 1rem;
  padding: 1rem;
`;
