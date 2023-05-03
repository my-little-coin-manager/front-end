import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { coinSelect, liveCandleData } from "recoil/atoms";

const useNewData = () => {
  const [liveCandle, setLiveCandle] = useRecoilState(liveCandleData);
  const selected = useRecoilValue(coinSelect);
  const data = [{ ticket: "test" }, { type: "ticker", codes: [selected], isOnlyRealtime: true }];
  const ws = useRef<any>();

  useEffect(() => {
    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(data));
    };
    ws.current.onmessage = async (e: any) => {
      const text = await new Response(e.data).text();
      const message = JSON.parse(text);
      const { opening_price, low_price, high_price, trade_price, timestamp, trade_volume } = message;

      setLiveCandle({
        open: opening_price,
        low: low_price,
        high: high_price,
        close: trade_price,
        volume: trade_volume,
        timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover: ((opening_price + low_price + high_price + trade_price) / 4) * trade_volume
      });
    };
    ws.current.onerror = () => {
      ws.current.close();
    };
    return () => {
      ws.current.close();
    };
  }, [selected]);

  return liveCandle;
};

export default useNewData;
