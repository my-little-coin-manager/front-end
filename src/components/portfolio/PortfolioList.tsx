import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coinTickers } from "recoil/atoms";
import { portfolio } from "recoil/atoms";
import styled from "styled-components";
import { ticker } from "../../types/types";

type Height = {
  height: number;
};

type CoinInfo = {
  averagePrice: number;
  code: string;
  koreanName: string;
  nowPrice: number;
  qty: number;
  totalPrice: number;
  profitRate: number;
  equitiesValue: number;
  income: number;
};

interface IHistory {
  history: {
    date: string;
    koreanName: string;
    market: string;
    price: number;
    qty: number;
    transaction: string;
  };
  _id: string;
}

interface IAcc {
  [market: string]: CoinInfo;
}

const PortfolioList = ({ height }: Height) => {
  const coinTicker = useRecoilValue(coinTickers);
  const [history, setHistory] = useRecoilState(portfolio);

  const getPortfolio = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/history", {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` }
    });
    setHistory(response.data);
  };

  const historyMarket = [...new Set(history.map((ele: IHistory) => ele.history.market))];
  const filterTicker = Object.values(coinTicker).filter((ele: ticker) => historyMarket.includes(ele.code));

  const groupValues = history.reduce((acc: IAcc, current: IHistory) => {
    const tickerInfo = filterTicker.filter((ele: ticker) => {
      return Object.values(current.history)[0] === ele.code;
    });

    acc[current.history.market] = acc[current.history.market] || {
      code: current.history.market,
      koreanName: current.history.koreanName,
      totalPrice: 0,
      averagePrice: 0,
      qty: 0,
      nowPrice: tickerInfo[0] && tickerInfo[0].trade_price,
      equitiesValue: 0,
      income: 0,
      profitRate: 0
    };

    if (current.history.transaction === "buy") {
      acc[current.history.market].qty += current.history.qty;
      acc[current.history.market].totalPrice += current.history.price * current.history.qty;
      acc[current.history.market].averagePrice =
        acc[current.history.market].totalPrice / acc[current.history.market].qty;
    } else {
      acc[current.history.market].qty -= current.history.qty;
      acc[current.history.market].totalPrice =
        acc[current.history.market].averagePrice * acc[current.history.market].qty;
      acc[current.history.market].averagePrice =
        acc[current.history.market].totalPrice / acc[current.history.market].qty;
    }

    acc[current.history.market].equitiesValue = acc[current.history.market].qty * acc[current.history.market].nowPrice;
    acc[current.history.market].income =
      acc[current.history.market].equitiesValue - acc[current.history.market].totalPrice;
    acc[current.history.market].profitRate =
      (acc[current.history.market].income / acc[current.history.market].totalPrice) * 100;

    if (acc[current.history.market].qty < 1) {
      delete acc[current.history.market];
    }

    return acc;
  }, []);

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <PortfolioListContainer height={height}>
      <History>
        <ListHeader>종목</ListHeader>
        <ListHeader>손익률</ListHeader>
        <ListHeader>평가손익</ListHeader>
        <ListHeader>매입금</ListHeader>
        <ListHeader>현재가</ListHeader>
        <ListHeader>평가금</ListHeader>
        <ListHeader>평균단가</ListHeader>
        <ListHeader>보유수량</ListHeader>
      </History>
      {Object.values<CoinInfo>(groupValues).map((ele) => {
        const splitMarketCode = ele.code.split("-");
        return (
          <History key={ele.code}>
            <CoinStock>
              <img src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} alt="" />
              {ele.koreanName}
            </CoinStock>

            <Profit profit={ele.income}>{ele.profitRate.toFixed(2)}%</Profit>

            {Number.isInteger(ele.averagePrice) ? (
              <>
                <Profit profit={ele.income}>{ele.income.toLocaleString("ko-KR")}</Profit>
                <CoinStock>{ele.totalPrice.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.nowPrice.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.equitiesValue.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.averagePrice.toLocaleString("ko-KR")}</CoinStock>
              </>
            ) : (
              <>
                <Profit profit={ele.income}>{ele.income.toFixed(3)}</Profit>
                <CoinStock>{ele.totalPrice.toFixed(3)}</CoinStock>
                <CoinStock>{ele.nowPrice.toFixed(3)}</CoinStock>
                <CoinStock>{ele.equitiesValue.toFixed(3)}</CoinStock>
                <CoinStock>{ele.averagePrice.toFixed(3)}</CoinStock>
              </>
            )}

            <CoinQty>{ele.qty}</CoinQty>
          </History>
        );
      })}
    </PortfolioListContainer>
  );
};

export default PortfolioList;

const PortfolioListContainer = styled.ul<{ height: number }>`
  overflow: overlay;
  overflow-x: hidden;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  padding-bottom: 2rem;
  height: ${({ height }) => `calc(100% - (${height}px + 3rem))`};

  &::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 0.4rem;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    z-index: 999999;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    padding: 10px;
  }
`;

const History = styled.li`
  text-decoration: none;
  height: 4rem;
  display: flex;
  font-size: 15px;
  :not(:first-child) {
    padding: 0 1rem;
  }

  :first-child {
    position: sticky;
    top: 0;
  }

  :not(:first-child) {
    border-bottom: solid 1px #d6d6d6;
  }
`;

const CoinStock = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
  color: #333;

  :first-child {
    justify-content: left;
  }

  & img {
    width: 25px;
    height: 25px;
    margin: 0 0.5rem;
  }
`;

const ListHeader = styled(CoinStock)`
  height: 3rem;
  background-color: #f9fafc;
  color: #666;
  font-weight: 700;

  :first-child {
    padding-left: 1rem;
    justify-content: center;
  }

  :last-child {
    padding-right: 1rem;
  }
`;

const Profit = styled(CoinStock)<{ profit: number }>`
  color: ${({ profit }) => (profit > 0 ? "#c84a31" : profit < 0 ? "#1261c4" : "#333")};
  font-weight: 700;
`;

const CoinQty = styled(CoinStock)`
  font-weight: 700;
`;
