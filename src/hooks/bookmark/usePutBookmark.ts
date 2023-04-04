import React from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import instance from "service/API";

interface Bookmark {
  bookmark: [];
}

const putBookmark = async (data: any, selected: any): Promise<Bookmark> => {
  console.log(data, selected);
  if (!localStorage.getItem("accessToken")) {
    alert("북마크 기능은 로그인 후 사용할 수 있습니다.");
  } else if (!data.includes(selected)) {
    const response = await instance.put("/bookmark", { bookmark: selected });
    return response.data.result;
  }
  const response = await instance.delete(`/bookmark/${selected}`);
  return response.data.result;
};

const usePutBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation("putBookmark", putBookmark, {
    onSuccess: (data) => {
      console.log(data); // mutation 이 성공하면 response를 받을 수 있다.
    },
    onError: (error) => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};

export default usePutBookmark;
