import { useMutation, useQueryClient } from "react-query";
import instance from "service/API";

interface IHistory {
  transaction: string;
  price: number;
  qty: number;
  date: string;
}

const postPortfolio = async (history: IHistory) => {
  const response = await instance.post("/history", { history });
  return response.data;
};

const usePostPortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation(postPortfolio, {
    onSuccess() {
      queryClient.invalidateQueries("portfolio");
    }
  });
};

export default usePostPortfolio;
