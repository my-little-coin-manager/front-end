import { atom, selector } from "recoil";
import axios from "axios";

const API_HOST = "https://api.upbit.com/v1/market/all";

export const bookmarker = atom({
  key: "bookmarker",
  default: []
});

export const coinTicker = atom({
  key: "coinTicker",
  default: {}
});

//코인 마켓 가져오기
export const coinMarkets = atom({
  key: "coinMarkets",
  default: {
    KRW: [],
    BTC: []
  },
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const config = { params: { isDeatils: true } };

      axios
        .get(API_HOST, config)
        .then((response) => {
          const KRWcoin = response.data
            .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
            .map((data: any) => data);

          const BTCcoin = response.data
            .filter((data: { [key: string]: string }) => data.market.includes("KRW-"))
            .map((data: any) => data);

          setSelf({ KRW: KRWcoin, BTC: BTCcoin });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  ]
});

export const websocketState = atom({
  key: "websocketState",
  default: {}
});

export const websocketOn = selector({
  key: "websocketOn",
  get: ({ get }) => {
    console.log(get);
  }
});
