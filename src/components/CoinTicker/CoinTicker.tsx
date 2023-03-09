import React, { useMemo } from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import useGetCoins from "Hooks/useGetCoins";
import { ticker } from "types/types";

const CoinTicker = () => {
  const { coinMarketList, coinTicker } = useGetCoins("KRW");

  return (
    <CoinTickerContainer>
      {/* <input>
        <button>검색</button>
      </input> */}
      <table align="center">
        <thead>
          <tr>
            <th>한글명</th>
            <th>현재가</th>
            <th>전일대비</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {Object.values<ticker>(coinTicker).map((ele, idx: number) => {
            return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList.KRW[idx]} />;
          })}
        </tbody>
      </table>
    </CoinTickerContainer>
  );
};

const CoinTickerContainer = styled.aside`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 30%;
  height: calc(100vh - 100px);
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 50px;

  & ul {
    margin: 0;
    padding: 0;
  }
  & ul li:not(:last-child) {
    border-bottom: 1px solid black;
  }

  & table {
    border-collapse: collapse;
  }

  & thead {
    position: sticky;
    top: 0;
    height: 40px;
    color: #666;
    font-size: 12px;
    background-color: #f9fafc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 90%;
    border-radius: 0.4rem;
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    padding: 10px;
  }
`;

export default CoinTicker;
