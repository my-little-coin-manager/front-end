import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coinMarkets, coinTickers, coinCandle, coinSelect } from "recoil/atoms";
import React, { useEffect, useState } from "react";

const useGetInitialDataList = () => {
  const market = useRecoilValue(coinMarkets);
  const tickers = useRecoilValue(coinTickers);
  const selected = useRecoilValue(coinSelect);

  const [coinCandles, setCoinCandles] = useRecoilState<any>(coinCandle);

  const config = {
    params: {
      market: selected,
      to: new Date().toISOString(),
      count: 200
    }
  };

  // console.log(config);

  const getCandles = async () => {
    try {
      const response = await axios.get(`https://api.upbit.com/v1/candles/days`, config);
      const data = response.data;
      const item = data.reverse().map((item: any) => {
        const { opening_price, low_price, high_price, trade_price, timestamp, candle_acc_trade_volume } = item;
        return {
          open: opening_price,
          low: low_price,
          high: high_price,
          close: trade_price,
          volume: candle_acc_trade_volume,
          timestamp: timestamp,
          turnover: ((opening_price + low_price + high_price + trade_price) / 4) * candle_acc_trade_volume
        };
      });

      setCoinCandles(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandles();
  }, [selected]);

  // console.log(coinCandles);
  return { coinCandles };
};

export default useGetInitialDataList;
