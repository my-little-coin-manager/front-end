import React, { useMemo } from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import useGetCoins from "Hooks/useGetCoins";

// type TCoin = {
//   code: string;
// };

// type TCoinList = {
//   [key: string]: TCoin;
// };

const CoinTicker = () => {
  const { coinMarketList, coinTicker } = useGetCoins("KRW");

  return (
    <CoinTickerContainer>
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
          {Object.values(coinTicker).map((ele: any, idx: number) => {
            return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList.KRW[idx]} />;
          })}
        </tbody>
      </table>
    </CoinTickerContainer>
  );
};

const CoinTickerContainer = styled.aside`
  width: 30%;
  height: calc(100vh - 100px);
  overflow-y: scroll;
  margin-top: 50px;
  border: 1px solid black;
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
    height: 40px;
    color: #666;
    font-size: 12px;
    background-color: #f9fafc;
  }
`;

export default CoinTicker;
