import React from "react";
import styled from "styled-components";
import { coinSelect } from "recoil/atoms";
import { useRecoilValue } from "recoil";
import useGetCoins from "hooks/useGetCoins";
import PriceInfoSection from "./PriceInfoSection";
import HightAndLowPriceSection from "components/container/coinDetail/HightAndLowPriceSection";
import TransactionAndVolumeSection from "./TransactionAndVolumeSection";

const CoinDetailBody = () => {
  const selected = useRecoilValue<string>(coinSelect);
  const { data: coinTicker } = useGetCoins();
  const ticker = coinTicker ? coinTicker[selected] : {};

  return (
    <CoinDetailBodyContainer>
      <PriceInfoSection
        price={ticker?.trade_price}
        change={ticker?.change}
        rate={ticker?.signed_change_rate}
        changePrice={ticker?.signed_change_price}
      />

      <TradeInfoContainer>
        <HightAndLowPriceSection hightPrice={ticker?.high_price} lowPrice={ticker?.low_price} />
        <TransactionAndVolumeSection
          tradeVolume={ticker?.acc_trade_volume_24h}
          tradePrice={ticker?.acc_trade_price_24h}
          unit={selected.split("-")[1]}
        />
      </TradeInfoContainer>
    </CoinDetailBodyContainer>
  );
};

export default CoinDetailBody;

const CoinDetailBodyContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const TradeInfoContainer = styled.span`
  display: flex;
  align-items: center;
`;
