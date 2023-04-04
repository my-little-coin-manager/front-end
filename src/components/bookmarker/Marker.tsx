import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userBookmark, coinSelect } from "../../recoil/atoms";
import useGetBookmark from "hooks/bookmark/useGetBookmark";
import instance from "service/API";
import { ReactComponent as DisabledStar } from "../../asset/svg/star-disabled.svg";
import { ReactComponent as AbledStar } from "../../asset/svg/star-abled.svg";
import usePutBookmark from "hooks/bookmark/usePutBookmark";
import { useMutation } from "react-query";

// interface NameBoxProps {
//   select: string;
// }
// { select }: NameBoxProps
const BookMarker = () => {
  const { data } = useGetBookmark();
  const { mutate } = usePutBookmark();
  const selected = useRecoilValue<any>(coinSelect);
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState(userBookmark);

  const changeStatus = () => {
    mutate(data, selected);
  };

  console.dir(mutate);

  return (
    <div onClick={changeStatus}>
      {bookmarkInfo?.includes(selected) && <AbledStar />}
      {!bookmarkInfo?.includes(selected) && <DisabledStar />}
    </div>
  );
};
export default BookMarker;
