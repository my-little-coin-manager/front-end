import React from "react";
import { useSetRecoilState } from "recoil";
import { coinSelect } from "recoil/atoms";
import styled from "styled-components";
import CoinPrice from "./CoinPrice";
import CoinChange from "./CoinChange";
import AccTradePrice from "./AccTradePirce";
import CoinName from "./CoinName";

const CoinListItem = ({ item, coinMarkets }: any) => {
  const setCoinSelected = useSetRecoilState<any>(coinSelect);

  return (
    <CoinList
      onClick={() => {
        setCoinSelected(item.code);
      }}
    >
      <CoinName koreanName={coinMarkets.korean_name} marketCode={coinMarkets.market} />
      <CoinPrice price={item.trade_price} change={item.change} />
      <CoinChange change={item.change} rate={item.signed_change_rate} price={item.signed_change_price} />
      <AccTradePrice price={item.acc_trade_price_24h} />
    </CoinList>
  );
};

const CoinList = styled.tr`
  height: 60px;
  border-bottom: solid 1px #d6d6d6;

  & td:first-child {
    padding-left: 20px;
  }

  & td:last-child {
    padding-right: 20px;
  }
`;

export default React.memo(CoinListItem);
