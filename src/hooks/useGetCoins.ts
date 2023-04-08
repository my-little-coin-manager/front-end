import { useEffect, useRef } from "react";
import { market } from "types/types";
import { useQuery, useQueryClient } from "react-query";
import useGetMarkets from "./useGetMarkets";

const useGetCoins = () => {
  const { data: coinMarketList } = useGetMarkets();
  const coinTicker = useQuery("coinTicker", () => ({}), {
    staleTime: Infinity
  });
  const queryClient = useQueryClient();
  const webSocketUrl = "wss://api.upbit.com/websocket/v1";

  const ws = useRef<WebSocket>();

  const getCoinTicker = () => {
    ws.current = new WebSocket(webSocketUrl);
    const marketName = coinMarketList.map((data: market) => data.market);
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
