import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookmarker } from "../../recoil/store";
import styled from "styled-components";

const BookMarker = () => {
  const [myBookMarker, setMyBookMarker] = useRecoilState(bookmarker);
  const [allCoinList, setAllCoinList] = useState<any[]>([]);
  const [bookmarkResult, setBookmarkResult] = useState<any>([]);

  const user = async () => {
    try {
      //유저 데이터 받아오기
      const allData: any = await axios.get("http://localhost:5000/users");
      //모든 코인정보 받아오기
      const allCoin: any | string = await axios.get("http://api.upbit.com/v1/market/all");

      //유저 데이터 북마크 추출
      const userData = allData.data;
      const userBookmark = userData[0];
      setMyBookMarker(userBookmark.bookmark);
      // console.log(myBookMarker);

      //모든 코인정보 코드 추출
      const coinList = allCoin.data;
      setAllCoinList(coinList);
      // console.log((a: { [key: string]: any }) => myBookMarker.includes(a));
      setBookmarkResult(allCoinList);
    } catch {
      throw new Error("Whoops!");
    }

    //내 북마크 모든코인에서 조회한 결과 값
  };

  useEffect(() => {
    user();
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
          <CoinName>
            <span>한글명</span>
          </CoinName>
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
        {allCoinList.map((data: any) => {
          console.log(data);
          return (
            <CoinBlock key={data.market}>
              <span>{data.korean_name}</span>
              <br />
              <span>{data.market}</span>
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
const CoinName = styled.div``;
const CoinPrice = styled.div``;
const CoinPrevPrice = styled.div``;
const CoinValue = styled.div``;

// 리스트에 각 코인의 정보를 담음 (map으로 찍어냄)
const CoinBlock = styled.div`
  display: block;
`;
