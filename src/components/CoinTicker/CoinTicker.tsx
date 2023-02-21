import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";

// interface CoinList {
//   KRW: { [key: string]: string }[];
//   BTC: { [key: string]: string }[];
// }

type TCoin = {
  code: string;
};

type TCoinList = {
  [key: string]: TCoin;
};

const CoinTicker = () => {
  const [coinList, setCoinList] = useState<any>({
    KRW: [],
    BTC: []
  });

  const [allCoin, setAllCoin] = useState<TCoinList>({});
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

      setCoinList((prevState: any) => {
        return { ...prevState, KRW: KRWCoinName, BTC: BTCCoinName };
      });

      return coinList;

    } catch (error) {
      console.log(error);
    }
  };

  const onWebSocket = () => {
    const responseKRW = coinList.KRW.filter((data: { [key: string]: string }) => data.market.includes("KRW-")).map(
      (data: any) => data.market
    );
    const responseBTC = coinList.BTC.filter((data: { [key: string]: string }) => data.market.includes("BTC-")).map(
      (data: any) => data.market
    );
    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws.current.onopen = () => {
      // ws.send(`[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(responseKRW)}}]`);
      ws.current.send(`[{"ticket":"test"},{"type":"ticker","codes": ['KRW-TON', 'KRW-CRE']}]`);
    };

    ws.current.onerror = (e: any) => {
      console.log(e);
    };
  };

  console.log(allCoin);

  useEffect(() => {
    getCoinName().then(() => {
      onWebSocket();
    });
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = async (e: any) => {
      const { data } = e;
      const text = await new Response(data).text();
      const parseText = JSON.parse(text);

      // --------------------------------------

      const allCoin = {
        "KRW-CRE": {},
        "KRW-TON": {},
        "KRW-BTC": {}
      };

      setAllCoin((prev: any) => ({
        ...prev,
        [parseText.code]: parseText
      }));

      const allCoinArray = Object.values(allCoin); // [{code:"KRW-CRE", ...}, {code:"KRW-BTC", ...}]

      // if (!allCoin.map((list: any) => list.code).includes(parseText.code)) {
      //   setAllCoin((prevState: any) => {
      //     // console.log(prevState.concat(parseText));
      //     return prevState.concat(parseText);
      //   });
      // } else {
      //   setAllCoin((prevState: any) => {
      //     // console.log(prevState.fillter((list: any) => list.code !== parseText.code).concat(parseText));
      //     return prevState
      //       .filter((list: any) => {
      //         console.log("hey", list.code, parseText.code);
      //         return list.code !== parseText.code;
      //       })
      //       .concat(parseText);
      //   });
      // }

      // --------------------------------------
    };
  }, [ws.current, allCoin]);

  return (
    <div>
      {JSON.stringify(Object.values(allCoin))}

      {/* {시세.KRW.map((data: any) => {
        console.log(data);
        return <div key={data.code}>{data.trade_price}</div>;
      })} */}
    </div>
  );
};

export default CoinTicker;
