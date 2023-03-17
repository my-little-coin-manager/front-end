import { useRecoilValue } from "recoil";
import { userBookmark } from "recoil/atoms";

const useBookmarkData = () => {
  const userData = useRecoilValue(userBookmark);
  //   const 필터링된 코인 = coinTickers.filter((ele, idx)=> ele.code === bookmarker[idx])
};

export default useBookmarkData;
