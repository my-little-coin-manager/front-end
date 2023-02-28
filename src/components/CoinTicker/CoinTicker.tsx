import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { coinMarkets, coinTickers, coinSelect } from "recoil/atoms";
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
  const [coinSelected, setCoinSelected] = useRecoilState<any>(coinSelect);

  const ws = useRef<any>(null);
  const inputRef = useRef<any>();

  const getCoinMarkets = async () => {
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

      console.log("getCoin 실행");

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

    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.current.onopen = () => {
      ws.current.send(`[{"ticket":"test"},{"type":"ticker","codes":${JSON.stringify(KRW_marketName)}}]`);
    };

    ws.current.onmessage = async (e: any) => {
      const { data } = e;
      const text: any = await new Response(data).text();
      const parseText = JSON.parse(text);

      setCoinTicker((prev: any) => {
        return { ...prev, [parseText.code]: parseText };
      });
    };

    ws.current.onerror = (error: any) => {
      console.log(error);
    };
  };

  useEffect(() => {
    getCoinMarkets().then((res) => {
      onWebSocket(res);
    });

    return () => {
      ws.current.onclose();
    };
  }, []);

  return (
    <CoinTickerContainer>
      <table align="center">
        <thead>
          <tr>
            <th>한글명</th>
            <th>현재가</th>
            <th>전일대비</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(coinTicker).map((ele: any, idx: number) => {
            return (
              <CoinList
                onClick={() => {
                  setCoinSelected(ele.code);
                }}
                key={ele.code}
              >
                <CoinName>
                  <img src={`https://static.upbit.com/logos/${ele.code.split("-")[1]}.png`} alt="" />
                  <p>{coinMarketList.KRW[idx].korean_name}</p>
                  <p>{ele.code}</p>
                </CoinName>
                <CoinPrice change={ele.change}>{ele.trade_price.toLocaleString("ko-KR")} KRW</CoinPrice>
                <Change>
                  <p>{(ele.signed_change_rate * 100).toFixed(2)}%</p>
                  <p>{ele.signed_change_price}</p>
                </Change>
                <td>{Math.round(ele.acc_trade_price_24h / 1000000).toLocaleString("ko-KR")}백만</td>
              </CoinList>
            );
          })}
        </tbody>
      </table>
    </CoinTickerContainer>
  );
};

const CoinTickerContainer = styled.aside`
  width: 30%;
  height: calc(100vh - 100px);
  overflow-y: scroll;
  margin-top: 50px;
  border: 1px solid black;
  & ul {
    margin: 0;
    padding: 0;
  }
  & ul li:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

const CoinList = styled.tr`
  &:hover {
    background-color: blueviolet;
  }
`;

const Change = styled.td`
  text-align: right;
  & p {
    margin: 0;
  }
`;

const CoinName = styled.td`
  display: flex;
  & img {
    width: 25px;
    height: 25px;
    margin: auto 0;
  }
  & p {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const CoinPrice = styled.td<{ change: string }>`
  font-size: 1em;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
  text-align: right;
  font-weight: 700;
`;

export default CoinTicker;
