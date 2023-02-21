import axios from "axios";
import React, { useEffect, useState } from "react";

// interface CoinList {
//   KRW: { [key: string]: string }[];
//   BTC: { [key: string]: string }[];
// }

const CoinTicker = () => {
  const [coinList, setCoinList] = useState<any>({
    KRW: [],
    BTC: []
  });

  const [data, setData] = useState<any>({
    KRW: []
  });

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

      setCoinList((prevState: any) => {
        return { ...prevState, KRW: KRWCoinName, BTC: BTCCoinName };
      });

      // 코인 마켓 코드 분류
      const responseKRW = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data.market);

      const responseBTC = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("BTC-"))
        .map((data: any) => data.market);

      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");

      ws.onopen = () => {
        // ws.send(`[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(responseKRW)}}]`);
        ws.send(`[{"ticket":"test"},{"type":"ticker","codes": ['KRW-TON', 'KRW-CRE']}]`);
      };

      ws.onmessage = async (e) => {
        const { data } = e;

        const text = await new Response(data).text();
        const parseText = JSON.parse(text);

        // console.log(parseText.code);
        // setData((prevState: any) => {
        //   return { ...prevState, KRW: [...prevState.KRW, parseText] };
        // });
      };

      ws.onerror = (e) => {
        console.log(e);
      };
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(coinList.KRW);
  // const getAllCoinTicker = async (coinMarket: any) => {
  //   console.log(coinMarket);
  //   try {
  //     const config = {
  //       params: { markets: coinMarket }
  //     };
  //     const response: any = await axios.get("https://api.upbit.com/v1/ticker", config);
  //     console.log(response.data);
  //     // for (let i = 0; i <= response.data.length; i++) {}
  //   } catch (error) {
  //     console.log(coinMarket);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getCoinName(); /* .then((res) => {
      getAllCoinTicker(res);
    }); */
  }, []);

  return (
    <div>
      {/* {시세.KRW.map((data: any) => {
        console.log(data);
        return <div key={data.code}>{data.trade_price}</div>;
      })} */}
    </div>
  );
};

export default CoinTicker;
