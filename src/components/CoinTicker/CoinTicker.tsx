import React, { useEffect, useState } from "react";
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
  const [flash, setFlash] = useState<any>(false);

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
    <CoinTickerContainer>
      <ul>
        {Object.values(coinTicker).map((ele: any, idx: number) => {
          return (
            <CoinList key={ele.code}>
              <img src={`https://static.upbit.com/logos/${ele.code.split("-")[1]}.png`} alt="" />
              <p>{coinMarketList.KRW[idx].korean_name}</p>
              <p>{ele.trade_price.toLocaleString("ko-KR")}</p>
            </CoinList>
          );
        })}
      </ul>
    </CoinTickerContainer>
  );
};

const CoinTickerContainer = styled.aside`
  width: 30%;
  height: 100vh;
  overflow-y: scroll;
  margin: 0;

  & ul {
    margin: 0;
    padding: 0;
  }

  & ul li:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

const CoinList = styled.li`
  display: flex;

  & img {
    width: 25px;
    height: 25px;
    margin: auto 0;
  }

  & p {
    margin-left: 10px;
  }
`;

export default CoinTicker;
