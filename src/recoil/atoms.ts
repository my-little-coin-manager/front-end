import { atom } from "recoil";

const API_HOST = "https://api.upbit.com/v1/market/all";

export const bookmarker = atom({
  key: "bookmarker",
  default: []
});

//실시간 코인 시세
export const coinTickers = atom({
  key: "coinTickers",
  default: {}
});

//코인 마켓 가져오기
export const coinMarkets = atom({
  key: "coinMarkets",
  default: {
    KRW: [],
    BTC: []
  }
});

//선택된 코인
export const coinSelect = atom({
  key: "coinSelect",
  default: "KRW-BTC"
});
