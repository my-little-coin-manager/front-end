import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { coinMarkets, coinTickers } from "recoil/atoms";
import axios from "axios";
import styled from "styled-components";

// type TCoin = {
//   code: string;
// };

// type TCoinList = {
//   [key: string]: TCoin;
// };

const CoinTicker = () => {
  const [coinMarketList, setCoinMarketList] = useRecoilState<any>(coinMarkets);
  const [coinTicker, setCoinTicker] = useRecoilState<any>(coinTickers);

  const getCoinName = async () => {
    try {
      const config = { params: { isDeatils: true } };
      const response: any = await axios.get("https://api.upbit.com/v1/market/all", config);
      const coinMarkets = response.data;

      const KRW_markets = coinMarkets
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data);
      const BTC_markets = coinMarkets
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data);

      setCoinMarketList((prevState: any) => {
        return { ...prevState, KRW: KRW_markets, BTC: BTC_markets };
      });

      return KRW_markets;
    } catch (error) {
      console.log(error);
    }
  };

  const onWebSocket = async (res: any) => {
    //받아온 모든 코인정보 웹소켓 연결
    const KRW_marketName = res.map((data: any) => data.market);

    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.onopen = () => {
      ws.send(`[{"ticket":"test"},{"type":"ticker","codes":${JSON.stringify(KRW_marketName)}}]`);
    };

    ws.onmessage = async (e) => {
      const { data } = e;
      const text: any = await new Response(data).text();
      const parseText = JSON.parse(text);

      setCoinTicker((prev: any) => {
        return { ...prev, [parseText.code]: parseText };
      });
    };

    ws.onerror = (error: any) => {
      console.log(error);
    };
  };

  useEffect(() => {
    getCoinName().then((res) => {
      onWebSocket(res);
    });
  }, []);

  return (
    <ul>
      {Object.values(coinTicker).map((ele: any, idx: number) => {
        return (
          <CoinList key={ele.code}>
            <p>{coinMarketList.KRW[idx].korean_name}</p>
            <p>{ele.trade_price}</p>
          </CoinList>
        );
      })}
    </ul>
  );
};

const CoinList = styled.li`
  text-decoration: none;
`;

export default CoinTicker;
