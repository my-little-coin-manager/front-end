import React from "react";
import { useRecoilState } from "recoil";
import { userBookmarkSelctor } from "../../recoil/atoms";
import instance from "service/API";
import { ReactComponent as DisabledStar } from "../../asset/svg/star-disabled.svg";
import { ReactComponent as AbledStar } from "../../asset/svg/star-abled.svg";

interface NameBoxProps {
  select: string;
}

const BookMarker = ({ select }: NameBoxProps) => {
  const [bookmarkInfo, setBookmarkInfo] = useRecoilState(userBookmarkSelctor);

  console.log(bookmarkInfo);
  const changeStatus = async () => {
    if (!localStorage.getItem("accessToken")) {
      alert("북마크 기능은 로그인 후 사용할 수 있습니다.");
    } else if (!bookmarkInfo.includes(select)) {
      const response = await instance.put("/bookmark", { bookmark: select });
      setBookmarkInfo(response.data.result);
    } else {
      const response = await instance.delete(`/bookmark/${select}`);
      setBookmarkInfo(response.data.result);
    }
  };

  return (
    <div onClick={changeStatus}>
      {bookmarkInfo.includes(select) && <AbledStar />}
      {!bookmarkInfo.includes(select) && <DisabledStar />}
    </div>
  );
};
export default BookMarker;
