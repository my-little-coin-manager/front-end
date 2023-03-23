import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coinTickers } from "recoil/atoms";
import { portfolio } from "recoil/atoms";
import styled from "styled-components";

const PortfolioList = ({ height }: any) => {
  const coinTicker = useRecoilValue(coinTickers);
  const [history, setHistory] = useRecoilState(portfolio);

  const getPortfolio = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/history", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setHistory(response.data);
  };

  const historyMarket = [...new Set(history.map((ele: any) => ele.history.market))];
  const filterTicker = Object.values(coinTicker).filter((ele: any) => historyMarket.includes(ele.code));

  const groupValues = history.reduce((acc: any, current: any) => {
    const a = filterTicker.filter((ele: any) => Object.values(current.history)[0] === ele.code);

    acc[current.history.market] = acc[current.history.market] || {
      code: current.history.market,
      koreanName: current.history.koreanName,
      totalPrice: 0,
      averagePrice: 0,
      qty: 0,
      nowPrice: a[0] && a[0].trade_price,
      평가금: 0,
      평가손익: 0,
      손익률: 0
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

    acc[current.history.market].평가금 = acc[current.history.market].qty * acc[current.history.market].nowPrice;
    acc[current.history.market].평가손익 = acc[current.history.market].평가금 - acc[current.history.market].totalPrice;
    acc[current.history.market].손익률 =
      (acc[current.history.market].평가손익 / acc[current.history.market].totalPrice) * 100;

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
      {Object.values(groupValues).map((ele: any) => {
        const splitMarketCode = ele.code.split("-");
        return (
          <History key={ele.code}>
            <CoinStock>
              <img src={`https://static.upbit.com/logos/${splitMarketCode[1]}.png`} alt="" />
              {ele.koreanName}
            </CoinStock>

            <Profit profit={ele.평가손익}>{ele.손익률.toFixed(2)}%</Profit>

            {Number.isInteger(ele.averagePrice) ? (
              <>
                <Profit profit={ele.평가손익}>{ele.평가손익.toLocaleString("ko-KR")}</Profit>
                <CoinStock>{ele.totalPrice.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.nowPrice.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.평가금.toLocaleString("ko-KR")}</CoinStock>
                <CoinStock>{ele.averagePrice.toLocaleString("ko-KR")}</CoinStock>
              </>
            ) : (
              <>
                <Profit profit={ele.평가손익}>{ele.평가손익.toFixed(3)}</Profit>
                <CoinStock>{ele.totalPrice.toFixed(3)}</CoinStock>
                <CoinStock>{ele.nowPrice.toFixed(3)}</CoinStock>
                <CoinStock>{ele.평가금.toFixed(3)}</CoinStock>
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
