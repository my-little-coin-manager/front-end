import React from "react";
import styled from "styled-components";
import { ticker } from "types/types";

interface PriceProps {
  select: string;
  ticker: ticker;
}

const DetailPrice = ({ select, ticker }: PriceProps) => {
  return (
    <Price>
      <State change={ticker?.change}>
        <h4>
          {ticker?.trade_price.toLocaleString("ko-KR")} <span>KRW</span>
        </h4>
        <p>
          전일대비 : <span>{(ticker?.signed_change_rate * 100).toFixed(2)}%</span>
          {ticker?.signed_change_price.toLocaleString("ko-KR")}
          <em>KRW</em>
        </p>
      </State>
      <HighLow>
        <div>
          <p>
            고가
            <span>
              {ticker?.high_price.toLocaleString("ko-KR")}
              <em>KRW</em>
            </span>
          </p>
          <p>
            저가
            <span>
              {ticker?.low_price.toLocaleString("ko-KR")}
              <em>KRW</em>
            </span>
          </p>
        </div>
        <div>
          <p>
            거래량(24H)
            <span>
              {Math.round(ticker?.acc_trade_volume_24h).toLocaleString("ko-KR")}
              <em>{select.split("-")[1]}</em>
            </span>
          </p>
          <p>
            거래대금(24H)
            <span>
              {Math.round(ticker?.acc_trade_price_24h).toLocaleString("ko-KR")}
              <em>KRW</em>
            </span>
          </p>
        </div>
      </HighLow>
    </Price>
  );
};

//디테일 가격정보 컨테이너
const Price = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  height: 10rem;
  justify-content: space-between;
`;

//상승,하락 실시간반영
const State = styled.div<{ change: string }>`
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
  margin: 0 0 0 1rem;

  & h4 {
    font-size: 2rem;
    margin: 2rem 0 0 0;
  }

  & span {
    margin-right: 0.5rem;
    font-size: 1rem;
    font-weight: lighter;
  }
  & em {
    font-style: normal;
    font-size: 0.625rem;
    margin-left: 0.2rem;
  }
`;

// 고가,저가 정보표시
const HighLow = styled.div`
  display: flex;
  margin: 1rem 2rem 0 5rem;

  & div {
    margin: 1rem 0 0 2rem;
  }

  & p {
    display: flex;
    justify-content: space-between;
  }
  & span {
    margin-left: 1.5rem;
    font-weight: 600;
  }

  & em {
    font-weight: 400;
    font-style: normal;
    font-size: 0.625rem;
    margin-left: 0.2rem;
  }
`;

export default React.memo(DetailPrice);
