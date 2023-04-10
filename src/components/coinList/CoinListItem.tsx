import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { coinSelect } from "recoil/atoms";
import styled from "styled-components";
import CoinPrice from "./CoinPrice";
import CoinCompare from "./CoinCompare";
import CoinTradeVolume from "./CoinTradeVolume";
import CoinName from "./CoinName";
import { market, ticker } from "types/types";

interface ListItemProps {
  item: ticker;
  coinMarkets: market;
}

const CoinListItem = ({ item, coinMarkets }: ListItemProps) => {
  const setCoinSelected = useSetRecoilState(coinSelect);
  const onClickCoinListItem = useCallback(() => {
    setCoinSelected(item.code);
  }, [item.code]);

  return (
    <CoinList onClick={onClickCoinListItem}>
      <CoinName koreanName={coinMarkets.korean_name} marketCode={coinMarkets.market} />
      <CoinPrice price={item.trade_price} change={item.change} />
      <CoinCompare change={item.change} rate={item.signed_change_rate} price={item.signed_change_price} />
      <CoinTradeVolume price={item.acc_trade_price_24h} />
    </CoinList>
  );
};

const CoinList = styled.li`
  height: 60px;
  border-bottom: solid 1px #d6d6d6;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f1efef;
  }
`;

export default React.memo(CoinListItem);
