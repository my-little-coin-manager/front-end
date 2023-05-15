import React from "react";
import { useRecoilValue } from "recoil";
import { coinSelect } from "recoil/atoms";
import { Market } from "types/types";
import useGetMarkets from "hooks/useGetMarkets";
import TitleBlock from "components/blocks/coinDetail/TitleBlock";
import BookMarker from "components/atoms/BookMarker";
import styled from "styled-components";

const CoinDetailHeader = () => {
  const { data: markets } = useGetMarkets();
  const selected = useRecoilValue<string>(coinSelect);
  const selectedMk = markets?.find((data: Market) => data.market === selected);

  return (
    <HeaderContainer>
      <TitleBlock select={selected} focus={selectedMk} />
      <BookMarker />
    </HeaderContainer>
  );
};

export default CoinDetailHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 0 1.5rem 0;
`;
