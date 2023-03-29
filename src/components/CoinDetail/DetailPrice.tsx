import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { coinTickers } from "recoil/atoms";
import { ticker } from "types/types";

interface PriceProps {
  select: string;
}

const DetailPrice = ({ select }: PriceProps) => {
  const tickers = useRecoilValue(coinTickers);
  const ticker = tickers[select];
  return (
    <Price>
      <State change={ticker?.change}>
        <div>
          <h4>{ticker?.trade_price.toLocaleString("ko-KR")}</h4>
          <span>KRW</span>
        </div>
        <div>
          전일대비 :&nbsp;<span> {(ticker?.signed_change_rate * 100).toFixed(2)}%</span>
          <span>{ticker?.signed_change_price.toLocaleString("ko-KR")}</span>
          <em>KRW</em>
        </div>
      </State>
      <HighLow>
        <div>
          <P1>
            고가
            <Span1>
              {ticker?.high_price.toLocaleString("ko-KR")}
              <em>KRW</em>
            </Span1>
          </P1>
          <P2>
            저가
            <Span2>
              {ticker?.low_price.toLocaleString("ko-KR")}
              <em>KRW</em>
            </Span2>
          </P2>
        </div>
        <div>
          <P3>
            거래량(24H)
            <Span>
              {Math.round(ticker?.acc_trade_volume_24h).toLocaleString("ko-KR")}
              <em>{select.split("-")[1]}</em>
            </Span>
          </P3>
          <P>
            거래대금(24H)
            <Span>
              {Math.round(ticker?.acc_trade_price_24h).toLocaleString("ko-KR")}
              <em>KRW</em>
            </Span>
          </P>
        </div>
      </HighLow>
    </Price>
  );
};

//디테일 가격정보 컨테이너
const Price = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  height: 8rem;
  justify-content: space-between;
`;

//상승,하락 실시간반영
const State = styled.div<{ change: string }>`
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
  margin: 0 0 0 1rem;
  width: 20rem;

  & div:nth-child(1) {
    display: flex;
    flex-direction: row;

    & h4 {
      width: 13rem;
      font-size: 2rem;
      font-weight: 700;
      margin: 2rem 0 0 0;
      justify-content: space-between;
    }

    & span {
      margin: 2.7rem 0 0 0;
      margin-right: 0.5rem;
      font-size: 1rem;
      font-weight: lighter;
    }

    & p {
      margin-top: 0.75rem;
    }
  }

  & div:nth-child(2) {
    margin: 1rem 0 0 0;
    display: flex;
    flex-direction: low;
    & span {
      width: 4rem;
      margin-right: 0.5rem;
      font-size: 1rem;
      font-weight: lighter;
    }
    & em {
      font-style: normal;
      font-size: 0.625rem;
      margin: 0.25rem;
    }

    & p {
      margin-top: 0.75rem;
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

export default React.memo(DetailPrice);
