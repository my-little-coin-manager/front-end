import { useEffect, useRef } from "react";
import { Market } from "types/types";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import useGetMarkets from "./useGetMarkets";

const useGetCoins = () => {
  const queryClient = useQueryClient();
  const { data: coinMarketList } = useGetMarkets();
  const ws = useRef<WebSocket>();
  const coinTicker = useQuery(
    "coinTicker",
    async () => {
      const marketName = coinMarketList?.map((data: Market) => data.market);
      if (marketName) {
        const response = await axios.get(`https://api.upbit.com/v1/ticker?markets=${marketName}`);
        return response.data;
      }
    },
    {
      staleTime: Infinity
    }
  );

  const webSocketUrl = "wss://api.upbit.com/websocket/v1";

  const getCoinTicker = () => {
    ws.current = new WebSocket(webSocketUrl);
    const marketName = coinMarketList.map((data: Market) => data.market);
    const data = [{ ticket: "test" }, { type: "ticker", codes: marketName }];

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify(data));
    };

    ws.current.onmessage = async (e: any) => {
      const { data } = e;
      const text: any = await new Response(data).text();
      const parseText = JSON.parse(text);

      queryClient.setQueriesData("coinTicker", (prevData: any) => ({ ...prevData, [parseText.code]: parseText }));
    };
  };

  useEffect(() => {
    coinMarketList && getCoinTicker();
  }, [coinMarketList]);

  return coinTicker;
};

export default useGetCoins;
