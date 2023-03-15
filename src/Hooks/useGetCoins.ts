import { useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { coinMarkets, coinTickers } from "recoil/atoms";
import { market, ticker } from "Types/types";

const useGetCoins = () => {
  const [coinMarketList, setCoinMarketList] = useRecoilState<any>(coinMarkets);
  const [coinTicker, setCoinTicker] = useRecoilState<any>(coinTickers);

  const marketUrl = "https://api.upbit.com/v1/market/all";
  const webSocketUrl = "wss://api.upbit.com/websocket/v1";

  const ws = useRef<any>();

  const getMarkets = async () => {
    try {
      const config = { params: { isDeatils: true } };
      const response = await axios.get(marketUrl, config);
      const coinMarkets = response.data;

      const KRW_markets = coinMarkets
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: string) => data);

      setCoinMarketList([...KRW_markets]);

      return KRW_markets;
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinTikcer = (markets: market[]) => {
    ws.current = new WebSocket(webSocketUrl);
    const marketName = markets.map((data: market) => data.market);
    const data = [{ ticket: "test" }, { type: "ticker", codes: marketName }];

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(data));
    };

    ws.current.onmessage = async (e: any) => {
      const { data } = e;
      const text: any = await new Response(data).text();
      const parseText = JSON.parse(text);

      setCoinTicker((prev: ticker) => {
        return { ...prev, [parseText.code]: parseText };
      });
    };

    ws.current.onerror = (error: string) => {
      console.log(error);
    };
  };

  useEffect(() => {
    getMarkets().then((res) => {
      getCoinTikcer(res);
    });

    return () => {
      ws.current.close = () => {
        console.log("종료");
      };
    };
  }, []);

  return { coinMarketList, coinTicker };
};

export default useGetCoins;
