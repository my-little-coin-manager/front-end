import React from "react";
import { ticker } from "types/types";
import { useRecoilValue } from "recoil";
import { menuSelect, userBookmark } from "recoil/atoms";
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
    </>
  );
};

export default CoinListBody;
