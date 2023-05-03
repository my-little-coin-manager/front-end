import instance from "service/API";
import { useQuery } from "react-query";

const getBookmark = async () => {
  if (localStorage.getItem("accessToken")) {
    const response = await instance.get("/bookmark");
    return response.data.result.bookmark;
  }
};

const useGetBookmark = () => {
  return useQuery("bookmark", getBookmark, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 0
  });
};

export default useGetBookmark;
