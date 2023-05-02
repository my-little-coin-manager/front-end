import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Bookmark } from "types/types";
import instance from "service/API";

interface IData {
  selected: string;
  bookmark: Bookmark;
}

const putBookmark = async (data: IData) => {
  const { bookmark, selected } = data;
  if (!bookmark?.includes(selected)) {
    const response = await instance.put("/bookmark", { bookmark: selected });
    return response.data.result.bookmark;
  }
  const response = await instance.delete(`/bookmark/${selected}`);
  return response.data.result.bookmark;
};

const usePutBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation(putBookmark, {
    onSuccess() {
      queryClient.invalidateQueries("bookmark");
    }
  });
};

export default usePutBookmark;
