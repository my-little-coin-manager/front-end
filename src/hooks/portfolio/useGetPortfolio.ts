import instance from "service/API";
import { useQuery } from "react-query";

const getPortfolio = async () => {
  const reponse = await instance.get("/history");
  return reponse.data;
};

const useGetPortfolio = () => {
  return useQuery("portfolio", getPortfolio, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 0
  });
};

export default useGetPortfolio;
