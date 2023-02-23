import { atom, selector } from "recoil";

const API_HOST = "https://api.upbit.com/v1/market/all";

export const bookmarker = atom({
  key: "bookmarker",
  default: []
});

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

export const websocketState = atom({
  key: "websocketState",
  default: {}
});
