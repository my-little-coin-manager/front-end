import { atom, selector } from "recoil";
import instance from "service/API";
import { marketName, tickerInfo } from "types/types";

//실시간 코인 시세
export const coinTickers = atom<tickerInfo>({
  key: "coinTickers",
  default: {}
});

//코인 마켓 가져오기
export const coinMarkets = atom<marketName>({
  key: "coinMarkets",
  default: []
});

//선택된 코인
export const coinSelect = atom<string>({
  key: "coinSelect",
  default: "KRW-BTC"
});

//코인 차트데이터
export const coinCandle = atom({
  key: "coinCandle",
  default: {}
});

//차트 실시간데이터
export const liveCandleData = atom({
  key: "liveCandleData",
  default: {}
});

//북마크 정보
export const userBookmark = atom<string[] | string>({
  key: "userBookmark",
  default: []
});

export const userBookmarkSelctor = selector({
  key: "userBookmarkSelector",
  get: async ({ get }) => {
    get(userBookmark);
    if (localStorage.getItem("accessToken")) {
      const response = await instance.get("/bookmark");
      return response.data.result.bookmark;
    }
    return [];
  },

  set: ({ set }, newValue) => {
    console.log(newValue);
    if (localStorage.getItem("accessToken")) set(userBookmark, newValue);
  }
});

//전체코인 or 북마크 선택
export const menuSelect = atom<string>({
  key: "menuSelect",
  default: "all"
});

export const portfolio = atom<any>({
  key: "portfolio",
  default: []
});
