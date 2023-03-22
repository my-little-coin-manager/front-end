import React, { useState, useEffect, useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userBookmark, coinSelect } from "../../recoil/atoms";
import styled from "styled-components";
import filledStar from "../../asset/png/filled_star.png";
import emptyStar from "../../asset/png/empty_star.png";
import axios from "axios";
import { market } from "types/types";

interface NameBoxProps {
  select: string;
  focus?: market;
}

const BookMarker = ({ select, focus }: NameBoxProps) => {
  // const select = useRecoilValue<string>(coinSelect);
  const [status, setStatus] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState<any>(userBookmark);

  const check = async () => {
    const getUserBookmark = await axios.get(process.env.REACT_APP_API_URL + "/bookmark", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setBookmarkInfo(getUserBookmark.data.result.bookmark);
  };

  const changeStatus = async () => {
    if (!status) {
      setStatus(true);
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/bookmark",
        { bookmark: select },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      );
      setBookmarkInfo(response.data.result);
    } else {
      setStatus(false);
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/bookmark/${select}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });
      setBookmarkInfo(response.data.result);
    }
  };
  // console.log(bookmarkInfo);

  useEffect(() => {
    check().then(() => {
      if (bookmarkInfo.includes(select)) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    });
  });

  return (
    <BookmarkStar onClick={changeStatus}>
      <img src={status ? filledStar : emptyStar}></img>
    </BookmarkStar>
  );
};
export default React.memo(BookMarker);

const BookmarkStar = styled.div``;
