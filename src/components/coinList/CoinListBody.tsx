import React from "react";
import styled from "styled-components";
import { ReactComponent as Exclamation } from "../../asset/svg/exclamation.svg";
import { ticker, market } from "types/types";
import { useRecoilValue } from "recoil";
import { menuSelect } from "recoil/atoms";
import CoinListItem from "./CoinListItem";
import useGetCoins from "hooks/useGetCoins";
import useGetBookmark from "hooks/bookmark/useGetBookmark";

const CoinListBody = () => {
  const { coinMarketList, coinTicker } = useGetCoins();
  const { data: bookmark } = useGetBookmark();
  const selectedMenu = useRecoilValue(menuSelect);
  const filterBookmark = Object.values<ticker>(coinTicker).filter((ele) => bookmark?.includes(ele.code));
  const bookmarkCoinMarkets = coinMarketList.filter((ele: market) => bookmark?.includes(ele.market));

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
