import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userBookmark } from "../../recoil/atoms";
import styled from "styled-components";
import filledStar from "../../asset/png/filled_star.png";
import emptyStar from "../../asset/png/empty_star.png";
import axios from "axios";

interface NameBoxProps {
  select: string;
  status: boolean;
}

const BookMarker = ({ select, status }: NameBoxProps) => {
  const setBookmarkInfo = useSetRecoilState<any>(userBookmark);

  const check = async () => {
    const getUserBookmark = await axios.get(process.env.REACT_APP_API_URL + "/bookmark", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setBookmarkInfo(getUserBookmark.data.result.bookmark);
  };

  const changeStatus = async () => {
    if (!status) {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/bookmark",
        { bookmark: select },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      );
      console.log(status);
      console.log("수정");
      setBookmarkInfo(response.data.result);
    } else {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/bookmark/${select}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });
      console.log(status);
      console.log("삭제");
      console.log(response);
      setBookmarkInfo(response.data.result);
    }
  };

  console.log(status);

  useEffect(() => {
    check();
  }, []);


  return (
    <BookmarkStar onClick={changeStatus}>
      <img src={status ? filledStar : emptyStar}></img>
    </BookmarkStar>
  );
};
export default BookMarker;

const BookmarkStar = styled.div``;
