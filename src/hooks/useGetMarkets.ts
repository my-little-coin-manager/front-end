import { useQuery } from "react-query";
import axios from "axios";

const marketUrl = "https://api.upbit.com/v1/market/all";

const getMarkets = async () => {
  try {
    const config = { params: { isDeatils: true } };
    const response = await axios.get(marketUrl, config);
    const coinMarkets = response.data;

    const KRW_markets = coinMarkets
      .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
      .map((data: string) => data);

    return KRW_markets;
  } catch (error) {
    throw new Error("네트워크가 원활하지 않습니다. 다시 시도해 주세요.");
  }
};

const useGetMarkets = () => {
  return useQuery("coinMarket", getMarkets, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 0
  });
};

export default useGetMarkets;
