import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { coinTickers } from "recoil/atoms";

const Portfolio = () => {
  const coinTicker = useRecoilValue(coinTickers);
  const [history, setHistory] = useState([]);

  const getPortfolio = async () => {
    const getUserPortfolio = await axios.get(process.env.REACT_APP_API_URL + "/history", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setHistory(getUserPortfolio.data.result);
  };

  const historyMarket = [...new Set(history.map((ele: any) => ele.history.market))];
  const filterTicker = Object.values(coinTicker).filter((ele: any) => historyMarket.includes(ele.code));

  const groupValues = history.reduce((acc: any, current: any, idx: any) => {
    const a = filterTicker.filter((ele: any) => Object.values(current.history)[0] === ele.code);

    acc[current.history.market] = acc[current.history.market] || {
      code: current.history.market,
      totalPrice: 0,
      averagePrice: 0,
      qty: 0,
      nowPrice: a[0].trade_price,
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
    }
    acc[current.history.market].평가금 = acc[current.history.market].qty * acc[current.history.market].nowPrice;
    acc[current.history.market].평가손익 = acc[current.history.market].평가금 - acc[current.history.market].totalPrice;
    acc[current.history.market].손익률 =
      (acc[current.history.market].평가손익 / acc[current.history.market].totalPrice) * 100;
    return acc;
  }, []);

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <PortfoiloContainer>
      <ul>
        <History>
          <p>종목</p>
          <p>손익률</p>
          <p>평가손익</p>
          <p>매입금</p>
          <p>현재가</p>
          <p>평가금</p>
          <p>평균단가</p>
          <p>보유수량</p>
        </History>
        {Object.values(groupValues).map((ele: any) => {
          return (
            <History key={ele.code}>
              <p>{ele.code}</p>
              <p>{Math.round(ele.손익률).toLocaleString("ko-KR")}%</p>
              <p>{Math.round(ele.평가손익).toLocaleString("ko-KR")}</p>
              <p>{Math.round(ele.totalPrice).toLocaleString("ko-KR")}</p>
              <p>{Math.round(ele.nowPrice).toLocaleString("ko-KR")}</p>
              <p>{Math.round(ele.평가금).toLocaleString("ko-KR")}</p>
              <p>{Math.round(ele.averagePrice).toLocaleString("ko-KR")}</p>
              <p>{ele.qty}</p>
            </History>
          );
        })}
      </ul>
    </PortfoiloContainer>
  );
};

export default Portfolio;

const PortfoiloContainer = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 70rem;
  height: calc(100vh - 134px);
  margin: 50px 1rem 0 0;
  padding: 1rem;
`;

const History = styled.li`
  text-decoration: none;
  display: flex;
  & p {
    text-align: center;
    width: calc(100% / 8);
  }
`;
