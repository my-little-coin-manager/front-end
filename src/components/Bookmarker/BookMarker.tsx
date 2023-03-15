import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { coinMarkets, coinTickers, userBookmark } from "../../recoil/atoms";
import styled from "styled-components";
import { ticker } from "Types/types";
import { market } from "Types/types";
import filledStar from "../../asset/png/filled_star.png";
import emptyStar from "../../asset/png/empty_star.png";

interface BookmarkerProps {
  focus?: market;
}

const BookMarker = ({ focus }: BookmarkerProps) => {
  const [status, setStatus] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState(userBookmark);

  // const coinMarketList = useRecoilValue(coinMarkets);
  // const coinTicker = useRecoilValue(coinTickers);
  const changeStatus = () => {
    if (!status) {
      setStatus(true);
    } else {
      setStatus(false);
      //   const remove = bookmarkInfo?.filter((value: any) => !value.includes(focus?.market));
      //   setBookmarkInfo(remove);
      // }
    }
    console.log(bookmarkInfo);
  };

  return (
    <BookmarkStar onClick={changeStatus}>
      <img src={status ? filledStar : emptyStar}></img>
    </BookmarkStar>
  );
};
export default BookMarker;

const BookmarkStar = styled.div``;
