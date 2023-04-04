import React from "react";
import { ticker, market } from "types/types";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { menuSelect, userBookmark } from "recoil/atoms";
import { ReactComponent as Exclamation } from "../../asset/svg/exclamation.svg";
import CoinListItem from "./CoinListItem";
import useGetCoins from "hooks/useGetCoins";

const CoinListBody = () => {
  const { coinMarketList, coinTicker } = useGetCoins();
  const bookmarkList = useRecoilValue(userBookmark);
  const selectedMenu = useRecoilValue(menuSelect);
  const filterBookmark = Object.values<ticker>(coinTicker).filter((ele) => bookmarkList?.includes(ele.code));
  const bookmarkCoinMarkets = coinMarketList.filter((ele: market) => bookmarkList?.includes(ele.market));

  return (
    <>
      {selectedMenu === "all" &&
        Object.values<ticker>(coinTicker).map((ele, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList[idx]} />;
        })}
      {selectedMenu === "bookmark" &&
        filterBookmark.map((ele: ticker, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={bookmarkCoinMarkets[idx]} />;
        })}
      {selectedMenu === "bookmark" && !filterBookmark.length && !!localStorage.getItem("accessToken") && (
        <NoResultMsg>
          <Exclamation />
          <p>아직 북마크에 담긴 코인이 없어요.</p>
        </NoResultMsg>
      )}
      {selectedMenu === "bookmark" && !filterBookmark.length && !localStorage.getItem("accessToken") && (
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
