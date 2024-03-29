import React, { useMemo } from "react";
import styled from "styled-components";
import CoinListBody from "components/container/coinList/CoinListBody";
import CoinListNavbar from "components/container/coinList/CoinListNavbar";
import CoinListHeader from "components/container/coinList/CoinListHeader";

const CoinList = () => {
  return useMemo(() => {
    return (
      <CoinListContainer>
        <CoinListNavbar />
        <ul>
          <CoinListHeader />
          <CoinListBody />
        </ul>
      </CoinListContainer>
    );
  }, []);
};

export default CoinList;

const CoinListContainer = styled.aside`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 33%;
  overflow: overlay;

  & ul {
    margin: 0;
    padding: 0;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 0.4rem;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    z-index: 999999;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    padding: 10px;
  }
`;
