import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookmarker, allCoinTicker, allCoinName } from "../../recoil/store";
import styled from "styled-components";
import { parseJsonText } from "typescript";

const BookMarker = () => {
  // const [myBookMarker, setMyBookMarker] = useRecoilState(bookmarker);
  const [coinName, setCoinName] = useRecoilState(allCoinName);
  const [coinTicker, setCoinTicker] = useRecoilState(allCoinTicker);

  const getAllCoinData = async () => {
    try {
      // //유저 데이터 받아오기
      // const allData: any = await axios.get("http://localhost:5000/users");

      //모든 코인정보 받아오고 웹소켓 연결위한 분류 (한글명, 마켓네임, 영문명)
      const allData: any | string = await axios.get("http://api.upbit.com/v1/market/all");
      const coinKRW = allData.data
        .filter((list: { [key: string]: string }) => list.market.includes("KRW-"))
        .map((list: any) => list);
      setCoinName(coinKRW);

      // // 유저 데이터 북마크 추출
      // const userData = allData.data;
      // const userBookmark = userData[0];
      // setMyBookMarker(userBookmark.bookmark);

      // //모든 코인정보 추출 (한글명, 마켓네임, 영문명)
      // const coinInfo = allCoin.data;
      // setAllCoinList(coinInfo);
      return coinKRW;
    } catch (error) {
      console.log(error);
    }
  };

  const onWebSocket = async (res: any) => {
    //받아온 모든 코인정보 웹소켓 연결
    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.onopen = () => {
      ws.send(`[{"ticket":"test"},{"type":"ticker","codes":${JSON.stringify(res.map((list: any) => list.market))}}]`);
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

  // console.log(coinTicker);

  // console.log(coinName);
  // console.log(JSON.stringify(coinName.map((list: any) => list.market)));

  useEffect(() => {
    getAllCoinData().then((res: any) => {
      onWebSocket(res);
    });
  }, []);
  // useEffect(() => {
  //   fetch("http://localhost:5000/users")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((userBookmark) => {
  //       setMyBookMarker(userBookmark);
  //       const test = myBookMarker.toString();
  //       console.log(myBookMarker[0]);
  //     });
  // }, []);

  return (
    <>
      <div>
        <div></div>
        <input></input>
        <button>추가</button>
        <button>삭제</button>
      </div>
      <ListContainer>
        <ListhHead>
          <CoinCode>
            <span>한글명</span>
          </CoinCode>
          <CoinPrice>
            <span>현재가</span>
          </CoinPrice>
          <CoinPrevPrice>
            <span>전일대비</span>
          </CoinPrevPrice>
          <CoinValue>
            <span>거래대금</span>
          </CoinValue>
        </ListhHead>
        {coinName.map((data: any) => {
          // console.log(data);
          return (
            <CoinBlock key={data.market}>
              <div>
                <span>{data.korean_name}</span>
                <br />
                <span>{data.market}</span>
              </div>
            </CoinBlock>
          );
        })}
      </ListContainer>
    </>
  );
};
export default BookMarker;

//모든 코인들이 출력될 컨테이너
const ListContainer = styled.div`
  display: block;
  margin: 0 auto;
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  overflow: scroll;
`;
//코인 리스트 상단
const ListhHead = styled.div`
  display: flex;
`;
const CoinCode = styled.div``;
const CoinPrice = styled.div``;
const CoinPrevPrice = styled.div``;
const CoinValue = styled.div``;

// 리스트에 각 코인의 정보를 담음 (map으로 찍어냄)
const CoinBlock = styled.div`
  display: block;
  border: 1px solid blue;
`;
