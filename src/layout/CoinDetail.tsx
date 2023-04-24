import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { coinSelect } from "../recoil/atoms";
import { market } from "types/types";
import useGetBookmark from "hooks/bookmark/useGetBookmark";
import DetailNameBox from "../container/DetailNameBox";
import DetailPrice from "../components/coinDetail/DetailPrice";
import CoinChart from "components/chart/CoinChart";
import useGetMarkets from "hooks/useGetMarkets";

const CoinDetail = () => {
  const { data: bookmark } = useGetBookmark();
  const { data: markets } = useGetMarkets();
  const selected = useRecoilValue<string>(coinSelect);
  const selectedMk = markets?.find((data: market) => data.market === selected);

  return (
    <DetailContainer>
      <DetailNameBox select={selected} focus={selectedMk} status={bookmark?.includes(selected)} />
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
