import React from "react";
import styled from "styled-components";
import useGetCoins from "hooks/useGetCoins";
import CoinTradeVolume from "components/CoinTradeVolume";
import { coinSelect } from "recoil/atoms";
import { useRecoilValue } from "recoil";
import PriceInfoSection from "./PriceInfoSection";

// interface PriceProps {
//   select: string;
// }

const CoinDetailBody = () => {
  const selected = useRecoilValue<string>(coinSelect);
  const { data: coinTicker } = useGetCoins();
  const ticker = coinTicker ? coinTicker[selected] : {};

  return (
    <Price>
      <PriceInfoSection
        price={ticker?.trade_price}
        change={ticker?.change}
        rate={ticker?.signed_change_rate}
        changePrice={ticker?.signed_change_price}
      />
      <HighLow>
        <div>
          <P1>
            고가
            <Span1>
              {ticker?.high_price?.toLocaleString("ko-KR")}
              <em>KRW</em>
            </Span1>
          </P1>
          <P2>
            저가
            <Span2>
              {ticker?.low_price?.toLocaleString("ko-KR")}
              <em>KRW</em>
            </Span2>
          </P2>
        </div>
        <div>
          <TradeInfoText>
            <p>거래량(24H)</p>
            <p>
              {Math.round(ticker?.acc_trade_volume_24h).toLocaleString("ko-KR")}
              <em>{selected.split("-")[1]}</em>
            </p>
          </TradeInfoText>
          <TradeInfoText>
            <p>거래대금(24H)</p>
            <CoinTradeVolume tradePrice={ticker?.acc_trade_price_24h} parents="datail" />
          </TradeInfoText>
        </div>
      </HighLow>
    </Price>
  );
};

export default React.memo(CoinDetailBody);

//디테일 가격정보 컨테이너
const Price = styled.div`
  display: flex;
  margin: 0 1rem;
  border-bottom: 1px solid #d9d9d9;
  height: 8rem;
  justify-content: space-between;
  align-items: center;
`;

//상승,하락 실시간반영
const State = styled.div<{ change: string }>`
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
  width: 16rem;
`;

const PriceContianer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between;

  & span {
    font-size: 1rem;
    font-weight: lighter;
  }
`;

const CompareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    margin-right: 1rem;
  }

  & span {
    display: flex;
    font-size: 1rem;
    font-weight: lighter;
    align-items: center;

    & p {
      margin-right: 0.5rem;
    }

    & em {
      font-style: normal;
      font-size: 0.625rem;
    }
  }
`;

// 고가,저가 정보표시
const HighLow = styled.div`
  display: flex;
  margin: auto 0;

  & div:nth-child(1) {
    width: 16.5rem;
    height: 6.875rem;
    margin-right: 1rem;
    padding-right: 0.75rem;
    border-right: 1px solid #d9d9d9;
  }
  & div:nth-child(2) {
    height: 6.875rem;
  }

  & em {
    font-weight: 400;
    font-style: normal;
    font-size: 0.625rem;
    margin-left: 0.2rem;
  }
`;

// 스타일드 컴포넌트 상속으로 세부 스타일적용
const Span = styled.span`
  font-size: 0.9rem;
  font-weight: lighter;
`;
const Span1 = styled(Span)`
  justify-content: end;
`;
const Span2 = styled(Span)`
  margin-left: 5rem;
`;

const P = styled.p`
  font-weight: 700;
  width: 17.5rem;
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const P1 = styled(P)`
  width: 16.125rem;
  justify-content: space-between;
  margin-top: 2rem;
`;
const P2 = styled(P)`
  width: 16.125rem;
  justify-content: space-between;
`;
const P3 = styled(P)`
  margin-top: 2rem;
`;

const TradeInfoText = styled.span`
  display: flex;
  font-size: 0.9rem;
  font-weight: lighter;
`;
