import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userBookmark } from "../../recoil/atoms";
import styled from "styled-components";
import filledStar from "../../asset/png/filled_star.png";
import emptyStar from "../../asset/png/empty_star.png";
import axios from "axios";

interface NameBoxProps {
  select: string;
}

const BookMarker = ({ select }: NameBoxProps) => {
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState<any>(userBookmark);

  const check = async () => {
    const getUserBookmark = await axios.get(process.env.REACT_APP_API_URL + "/bookmark", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setBookmarkInfo(getUserBookmark.data.result.bookmark);
  };

  const changeStatus = async () => {
    if (!bookmarkInfo.includes(select)) {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/bookmark",
        { bookmark: select },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      );
      setBookmarkInfo(response.data.result);
    } else {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/bookmark/${select}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });
      setBookmarkInfo(response.data.result);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <BookmarkStar onClick={changeStatus}>
      <img src={bookmarkInfo.includes(select) ? filledStar : emptyStar}></img>
    </BookmarkStar>
  );
};
export default BookMarker;

const BookmarkStar = styled.div``;
