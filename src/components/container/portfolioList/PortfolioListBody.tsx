import React from "react";
import styled from "styled-components";
import { Ticker } from "../../../types/types";
import useGetPortfolio from "hooks/portfolio/useGetPortfolio";
import CoinTilteBlock from "../../blocks/portfolioList/CoinTilteBlock";
import PortfolioValueBlock from "../../blocks/portfolioList/PortfolioValueBlock";
import useGetCoins from "hooks/useGetCoins";

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

const PortfolioListBody = () => {
  const { data: coinTicker } = useGetCoins();
  const { data: history } = useGetPortfolio();

  const historyMarket = [...new Set(history?.map((ele: IHistory) => ele.history.market))];
  const filterTicker =
    coinTicker &&
    Object.values(coinTicker).filter((ele: any) => {
      return historyMarket.includes(ele.code);
    });

  const groupValues = history?.reduce((acc: IAcc, current: IHistory) => {
    if (!filterTicker) return;

    const tickerInfo: Ticker[] = filterTicker?.filter((ele: Ticker) => {
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

  return (
    <>
      {groupValues &&
        Object.values<CoinInfo>(groupValues).map((ele) => {
          return (
            <History key={ele.code}>
              <CoinTilteBlock koreanName={ele.koreanName} marketCode={ele.code} />
              <PortfolioValueBlock
                income={ele.income}
                totalPrice={ele.totalPrice}
                nowPrice={ele.nowPrice}
                equitiesValue={ele.equitiesValue}
                averagePrice={ele.averagePrice}
                profitRate={ele.profitRate}
                qty={ele.qty}
              />
            </History>
          );
        })}
    </>
  );
};

export default PortfolioListBody;

const History = styled.li`
  text-decoration: none;
  height: 4rem;
  display: flex;
  font-size: 15px;

  :not(:last-child) {
    border-bottom: solid 1px #d6d6d6;
  }

  :not(:first-child) {
    padding: 0 1rem;
  }
`;
