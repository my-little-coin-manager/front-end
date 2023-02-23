import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coinMarkets, websocketState } from "recoil/store";

// type TCoin = {
//   code: string;
// };

// type TCoinList = {
//   [key: string]: TCoin;
// };

const CoinTicker = () => {
  // const coinMarketList = useRecoilValue(coinMarkets);
  const [coinMarketList, setCoinMarketList] = useState({
    KRW: [],
    BTC: []
  });
  const [allCoin, setAllCoin] = useRecoilState(websocketState);
  const ws = useRef<any>();

  const getCoinName = async () => {
    try {
      // 코인 마켓 코드 가져오는 코드
      const config = { params: { isDeatils: true } };
      const response: any = await axios.get("https://api.upbit.com/v1/market/all", config);
      const coinList = response.data;

      const KRWCoinName = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data);
      const BTCCoinName = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data);

      setCoinMarketList((prevState: any) => {
        return { ...prevState, KRW: KRWCoinName, BTC: BTCCoinName };
      });

      return KRWCoinName;

    } catch (error) {
      console.log(error);
    }
  };

  const onWebSocket = (res: any) => {
    const KRW_MarketName = res.map((data: any) => data.market);

    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws.current.onopen = () => {
      console.log("연결완료");
      console.log(KRW_MarketName);
      ws.current.send(`[{"ticket":"test"},{"type":"ticker","codes":${JSON.stringify(KRW_MarketName)}}]`);
    };

    ws.current.onerror = (e: any) => {
      console.log(e);
    };
  };


  useEffect(() => {
    getCoinName().then((res) => {
      onWebSocket(res);
    });
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = async (e: any) => {
      const { data } = e;
      const text = await new Response(data).text();
      const parseText = JSON.parse(text);

      setAllCoin((prev) => ({
        ...prev,
        [parseText.code]: parseText
      }));
    };
  }, [ws.current, allCoin]);

  return (
    <ul>
      {Object.values(allCoin).map((data: any) => {
        return (
          <li key={data.code}>
            <p>{data.code}</p>
            <p>{data.trade_price}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CoinTicker;
