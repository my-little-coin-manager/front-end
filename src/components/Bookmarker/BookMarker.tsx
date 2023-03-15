import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userBookmark, coinSelect } from "../../recoil/atoms";
import styled from "styled-components";
import { ticker } from "types/types";
import { market } from "types/types";
import filledStar from "../../asset/png/filled_star.png";
import emptyStar from "../../asset/png/empty_star.png";
import axios from "axios";

const BookMarker = () => {
  const selected = useRecoilValue<string>(coinSelect);
  const [status, setStatus] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState<any>(userBookmark);

  const check = async () => {
    const getUserBookmark = await axios.get(process.env.REACT_APP_API_URL + "/bookmark", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setBookmarkInfo(getUserBookmark.data.result.bookmark);
  };

  const changeStatus = () => {
    if (!status) {
      setStatus(true);
      axios.put(
        process.env.REACT_APP_API_URL + "/bookmark",
        { bookmark: selected },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      );
    } else {
      setStatus(false);
      axios.delete(process.env.REACT_APP_API_URL + `/bookmark/${selected}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });
    }
  };

  useEffect(() => {
    check().then(() => {
      console.log(bookmarkInfo);
      if (bookmarkInfo.includes(selected)) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    });
  }, [selected]);

  return (
    <BookmarkStar onClick={changeStatus}>
      <img src={status ? filledStar : emptyStar}></img>
    </BookmarkStar>
  );
};
export default BookMarker;

const BookmarkStar = styled.div``;
