import React from "react";
import { useRecoilValue } from "recoil";
import { coinSelect } from "recoil/atoms";
import { ReactComponent as DisabledStar } from "asset/svg/star-disabled.svg";
import { ReactComponent as AbledStar } from "asset/svg/star-abled.svg";
import useGetBookmark from "hooks/bookmark/useGetBookmark";
import usePutBookmark from "hooks/bookmark/usePutBookmark";
import styled from "styled-components";

const BookMarker = () => {
  const { data: bookmark } = useGetBookmark();
  const { mutate: putBookmark } = usePutBookmark();
  const selected = useRecoilValue<string>(coinSelect);

  const changeStatus = () => {
    if (!localStorage.getItem("accessToken")) {
      alert("북마크 기능은 로그인 후 사용할 수 있습니다.");
    } else {
      putBookmark({ selected, bookmark });
    }
  };

  return (
    <Bookmark onClick={changeStatus}>
      {bookmark?.includes(selected) && <AbledStar />}
      {!bookmark?.includes(selected) && <DisabledStar />}
    </Bookmark>
  );
};
export default BookMarker;

const Bookmark = styled.div`
  cursor: pointer;
`;
