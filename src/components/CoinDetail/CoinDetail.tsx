import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { coinMarkets, coinTickers, coinSelect } from "../../recoil/atoms";
import styled from "styled-components";
import CoinChart from "components/Chart/CoinChart";

const CoinDetail = () => {
  const markets = useRecoilValue<any>(coinMarkets);
  const tickers = useRecoilValue<any>(coinTickers);
  const selected = useRecoilValue<any>(coinSelect);

  const selectedMk = markets?.KRW.find((data: any) => data.market === selected);
  // console.log(tickers[selected].change_price);

  return (
    <DetailContainer>
      <DetailNameBox>
        <img src={`https://static.upbit.com/logos/${selected.split("-")[1]}.png`} alt="" />
        <div>
          <p>{selectedMk?.korean_name}</p>
          <h4>{selectedMk?.market}</h4>
        </div>
      </DetailNameBox>
      <DetailPrice>
        <PriceState change={tickers[selected]?.change}>
          <h4>
            {tickers[selected]?.trade_price.toLocaleString("ko-KR")} <span>KRW</span>
          </h4>
          <p>
            전일대비 : <span>{(tickers[selected]?.signed_change_rate * 100).toFixed(2)}%</span>
            {tickers[selected]?.signed_change_price.toLocaleString("ko-KR")}
            <em>KRW</em>
          </p>
        </PriceState>
        <PriceHighLow>
          <div>
            <p>
              고가
              <span>
                {tickers[selected]?.high_price.toLocaleString("ko-KR")}
                <em>KRW</em>
              </span>
            </p>
            <p>
              저가
              <span>
                {tickers[selected]?.low_price.toLocaleString("ko-KR")}
                <em>KRW</em>
              </span>
            </p>
          </div>
          <div>
            <p>
              거래량(24H)
              <span>
                {Math.round(tickers[selected]?.acc_trade_volume_24h).toLocaleString("ko-KR")}
                <em>{selected.split("-")[1]}</em>
              </span>
            </p>
            <p>
              거래대금(24H)
              <span>
                {Math.round(tickers[selected]?.acc_trade_price_24h).toLocaleString("ko-KR")}
                <em>KRW</em>
              </span>
            </p>
          </div>
        </PriceHighLow>
      </DetailPrice>
      <CoinChart />
    </DetailContainer>
  );
};

export default CoinDetail;

//디테일 컨테이너
const DetailContainer = styled.div`
  border: 1px solid blue;
  width: 70rem;
  height: calc(100vh - 134px);
  margin-top: 50px;
  padding: 1rem;
`;
//디테일 상단 이름 div
const DetailNameBox = styled.div`
  display: flex;
  text-align: center;
  height: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d9d9d9;
  & img {
    width: 3rem;
    height: 3rem;
    margin-right: 0.8rem;
  }
  & div {
    display: inline-flex;
  }

  & p {
    font-size: 2.2rem;
    margin: 0 1rem 0 0;
    font-weight: bold;
  }
`;

//디테일 가격정보
const DetailPrice = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  height: 10rem;
  justify-content: space-between;
`;
const PriceState = styled.div<{ change: string }>`
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
const PriceHighLow = styled.div`
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
