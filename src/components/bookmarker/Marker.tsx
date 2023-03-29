import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userBookmark } from "../../recoil/atoms";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as DisabledStar } from "../../asset/svg/star-disabled.svg";
import { ReactComponent as AbledStar } from "../../asset/svg/star-abled.svg";

interface NameBoxProps {
  select: string;
}

const BookMarker = ({ select }: NameBoxProps) => {
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState<any>(userBookmark);

  const check = async () => {
    const getUserBookmark = await axios.get(process.env.REACT_APP_API_URL + "/bookmark", {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` }
    });
    setBookmarkInfo(getUserBookmark.data.result.bookmark);
  };

  const changeStatus = async () => {
    if (!localStorage.getItem("accessToken")) {
      alert("북마크 기능은 로그인 후 사용할 수 있습니다.");
    } else if (!bookmarkInfo.includes(select)) {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/bookmark",
        { bookmark: select },
        {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` }
        }
      );
      setBookmarkInfo(response.data.result);
    } else {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/bookmark/${select}`, {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` }
      });
      setBookmarkInfo(response.data.result);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <BookmarkStar onClick={changeStatus}>
      {bookmarkInfo.includes(select) && <AbledStar />}
      {!bookmarkInfo.includes(select) && <DisabledStar />}
    </BookmarkStar>
  );
};
export default BookMarker;

const BookmarkStar = styled.div``;
