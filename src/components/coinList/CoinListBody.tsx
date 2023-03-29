import React from "react";
import { ticker } from "types/types";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { menuSelect, userBookmark } from "recoil/atoms";
import { ReactComponent as Exclamation } from "../../asset/svg/exclamation.svg";
import CoinListItem from "./CoinListItem";

import useGetCoins from "hooks/useGetCoins";

const CoinListBody = () => {
  const { coinMarketList, coinTicker } = useGetCoins();
  const users = useRecoilValue(userBookmark);
  const select = useRecoilValue(menuSelect);
  const filterBookmark = Object.values(coinTicker).filter((ele: any) => users.includes(ele.code));
  const bookmarkCoinMarkets = coinMarketList.filter((ele: any) => users.includes(ele.market));

  return (
    <>
      {select === "all" &&
        Object.values<ticker>(coinTicker).map((ele, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList[idx]} />;
        })}
      {select === "bookmark" &&
        filterBookmark.map((ele: any, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={bookmarkCoinMarkets[idx]} />;
        })}
        
      {select === "bookmark" && !filterBookmark.length && !!localStorage.getItem("accessToken") && (
        <NoResultMsg>
          <Exclamation />
          <p>아직 북마크에 담긴 코인이 없어요.</p>
        </NoResultMsg>
      )}

      {select === "bookmark" && !filterBookmark.length && !localStorage.getItem("accessToken") && (
        <NoResultMsg>
          <Exclamation />
          <p>로그인 후 이용해 주세요.</p>
        </NoResultMsg>
      )}
    </>
  );
};

export default CoinListBody;

const NoResultMsg = styled.div`
  text-align: center;
  margin-top: 8rem;
  & p {
    margin-top: 1rem;
    color: #c0c0c0;
  }
`;
