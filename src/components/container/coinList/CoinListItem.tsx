import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { coinSelect } from "recoil/atoms";
import { Market, Ticker } from "types/types";
import styled from "styled-components";
import TitleBlock from "components/blocks/coinList/TitleBlock";
import PriceBlock from "components/blocks/coinList/PriceBlock";
import CompareBlock from "components/blocks/coinList/CompareBlock";
import TransactionValueBlock from "components/blocks/coinList/TransactionValueBlock";

interface IListItemProps {
  item: Ticker;
  coinMarkets: Market;
}

const CoinListItem = ({ item, coinMarkets }: IListItemProps) => {
  const setCoinSelected = useSetRecoilState(coinSelect);
  const onClickCoinListItem = useCallback(() => {
    setCoinSelected(item.code);
  }, [item.code]);

  return (
    <CoinList onClick={onClickCoinListItem}>
      <TitleBlock koreanMarketName={coinMarkets.korean_name} marketCode={coinMarkets.market} />
      <PriceBlock price={item.trade_price} change={item.change} />
      <CompareBlock change={item.change} rate={item.signed_change_rate} changePrice={item.signed_change_price} />
      <TransactionValueBlock tradePrice={item.acc_trade_price_24h} />
    </CoinList>
  );
};

const CoinList = styled.li`
  height: 60px;
  border-bottom: solid 1px #d6d6d6;
  width: 100%;
  display: flex;
  align-items: center;

  :not(:last-child) {
    border-bottom: solid 1px #d6d6d6;
  }

  &:hover {
    background-color: #f1efef;
    cursor: pointer;
  }
`;

export default React.memo(CoinListItem);
