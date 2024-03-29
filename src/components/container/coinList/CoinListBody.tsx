import React from "react";
import styled from "styled-components";
import { ReactComponent as Exclamation } from "asset/svg/exclamation.svg";
import { Ticker, Market } from "types/types";
import { useRecoilValue } from "recoil";
import { menuSelect } from "recoil/atoms";
import CoinListItem from "./CoinListItem";
import useGetCoins from "hooks/useGetCoins";
import useGetMarkets from "hooks/useGetMarkets";
import useGetBookmark from "hooks/bookmark/useGetBookmark";
import NoResultMsg from "components/atoms/NoResultMsg";

const CoinListBody = () => {
  const { data: coinTicker } = useGetCoins();
  const { data: coinMarketList } = useGetMarkets();
  const { data: bookmark } = useGetBookmark();
  const selectedMenu = useRecoilValue(menuSelect);
  const filterBookmark = coinTicker && Object.values<Ticker>(coinTicker).filter((ele) => bookmark?.includes(ele.code));
  const bookmarkCoinMarkets = coinMarketList?.filter((ele: Market) => bookmark?.includes(ele.market));

  return (
    <>
      {selectedMenu === "all" &&
        coinTicker &&
        Object.values<Ticker>(coinTicker).map((ele, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList[idx]} />;
        })}

      {selectedMenu === "bookmark" &&
        filterBookmark.map((ele: Ticker, idx: number) => {
          return <CoinListItem key={ele.code} item={ele} coinMarkets={bookmarkCoinMarkets[idx]} />;
        })}

      {selectedMenu === "bookmark" && !filterBookmark.length && !!localStorage.getItem("accessToken") && (
        <NoResultMsg>아직 북마크에 담긴 코인이 없어요.</NoResultMsg>
      )}

      {selectedMenu === "bookmark" && !filterBookmark.length && !localStorage.getItem("accessToken") && (
        <NoResultMsg>로그인 후 이용해 주세요.</NoResultMsg>
      )}
    </>
  );
};

export default CoinListBody;
