import { atom } from "recoil";

export const bookmarker = atom({
  key: "bookmarker",
  default: []
});

export const allCoinName = atom({
  key: "allCoinNames",
  default: []
});

export const allCoinTicker = atom({
  key: "allCoinTicker",
  default: []
});

// export const selectTicker = atom({
//   key: "selectTicker"
//   get:
// })
