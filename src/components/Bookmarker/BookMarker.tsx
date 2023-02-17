import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookmarker } from "../../recoil/store";

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
        <button>추가</button>
        <button>삭제</button>
      </div>
      <div>
        {allCoinList.map((data: any) => {
          // console.log(allCoinList);
          return <div key={data.market}>{data.market}</div>;
        })}
      </div>
    </>
  );
};

export default BookMarker;
