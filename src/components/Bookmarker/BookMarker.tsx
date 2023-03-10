import React from "react";
import { useRecoilValue } from "recoil";
import { coinMarkets, coinTickers } from "../../recoil/atoms";
import styled from "styled-components";
import { ticker } from "Types/types";

const BookMarker = () => {
  // const [myBookMarker, setMyBookMarker] = useRecoilState(bookmarker);
  const coinMarketList = useRecoilValue(coinMarkets);
  const coinTicker = useRecoilValue(coinTickers);

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
        {Object.values(coinTicker).map((ele: ticker, idx: number) => {
          console.log(ele);
          return (
            <div key={ele.code}>
              <p>{coinMarketList.KRW[idx].korean_name}</p>
              <p>{ele.trade_price}</p>
            </div>
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
