import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { coinSelect } from "recoil/atoms";
import { IInitialData } from "types/types";
import { useQuery } from "react-query";

const useGetCoinCandles = () => {
  const selected = useRecoilValue(coinSelect);

  const config = {
    params: {
      market: selected,
      to: new Date().toISOString(),
      count: 200
    }
  };

  const getCandles = async () => {
    try {
      const response = await axios.get(`https://api.upbit.com/v1/candles/days`, config);
      const data = response.data;
      const item = data.reverse().map((item: IInitialData) => {
        const { opening_price, low_price, high_price, trade_price, timestamp, candle_acc_trade_volume } = item;
        return {
          open: opening_price,
          low: low_price,
          high: high_price,
          close: trade_price,
          volume: candle_acc_trade_volume,
          timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000
        };
      });

      return item;
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinCandles = () => {
    return useQuery(["coinCandles", selected], getCandles, {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 0
    });
  };

  return getCoinCandles();
};
export default useGetCoinCandles;
