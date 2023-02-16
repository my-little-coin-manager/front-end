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

  const [시세, set시세] = useState<any>({
    KRW: []
  });

  const getCoinName = async () => {
    try {
      const config = { params: { isDeatils: true } };
      const response: any = await axios.get("https://api.upbit.com/v1/market/all", config);
      // allCoin = response.data;
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

      const responseKRW = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
        .map((data: any) => data.market);

      const responseBTC = coinList
        .filter((data: { [key: string]: string }) => data.market.includes("BTC-"))
        .map((data: any) => data.market);

      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(`[{"ticket":"test"},{"type":"ticker","codes": ["KRW-BTC"]}]`);
      };

      const allCoin: any[] = [];
      ws.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).text();
        const text2 = JSON.parse(text);
        console.log(text2);
        // allCoin.push(text2);
        set시세((prevState: any) => {
          return { KRW: [text2] };
        });
        // console.log(allCoin);
      };

      ws.onerror = (e) => {
        console.log(e);
      };

      // let KRWCoin = "";
      // let BTCCoin = "";
      // for (const coin of coinList) {
      //   if (!coin.market.indexOf("KRW")) {
      //     console.log(coin.market.indexOf("KRW"));
      //     KRWCoin += `${coin.market},`;
      //   } else {
      //     BTCCoin += `${coin.market},`;
      //   }
      // }

      // await setCoinMarket(() => {
      //   return { KRW: KRWCoin.substring(0, KRWCoin.length - 1), BTC: BTCCoin.substring(0, BTCCoin.length - 1) };
      // });

      // return KRWCoin.substring(0, KRWCoin.length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(시세);
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
  console.log(시세);

  return (
    <div>
      {시세.KRW.map((data: any) => {
        console.log(data);
        return <div key={data.code}>{data.trade_price}</div>;
      })}
    </div>
  );
};

export default CoinTicker;
