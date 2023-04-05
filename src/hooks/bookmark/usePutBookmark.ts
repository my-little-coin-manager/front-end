import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Bookmark } from "types/types";
import instance from "service/API";

interface IData {
  selected: string;
  bookmark: Bookmark;
}

const putBookmark = async (data: IData) => {
  if (!data.bookmark.includes(data.selected)) {
    const response = await instance.put("/bookmark", { bookmark: data.selected });
    return response.data.result.bookmark;
  }
  const response = await instance.delete(`/bookmark/${data.selected}`);
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
