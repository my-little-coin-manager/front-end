// 차트 이니셜데이터(KRW-BTC)
export interface IInitialData {
  market: string;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  change_price: number;
  change_rate: number;
  high_price: number;
  low_price: number;
  opening_price: number;
  prev_closing_price: number;
  timestamp: number;
  trade_price: number;
}

// Atom coinMarkets
export type market = {
  market: string;
  korean_name: string;
  english_name: string;
};
export type marketName = market[];

// Atom coinTickers
export type ticker = {
  acc_ask_volume: number;
  acc_bid_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  ask_bid: string;
  change: string;
  change_price: number;
  change_rate: number;
  code: string;
  delisting_date?: string;
  high_price: number;
  highest_52_week_date: string;
  highest_52_week_price: number;
  is_trading_suspended: boolean;
  low_price: number;
  lowest_52_week_date: string;
  lowest_52_week_price: number;
  market_state: string;
  market_warning: string;
  opening_price: number;
  prev_closing_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  stream_type: string;
  timestamp: number;
  trade_date: string;
  trade_price: number;
  trade_time: string;
  trade_timestamp: number;
  trade_volume: number;
  type: string;
};
export type tickerInfo = { [market: string]: ticker };

// Atom liveCandleData
export type livecandle = {
  open: number;
  close: number;
  high: number;
  low: number;
  timestamp: number;
  turnover: number;
  volume: number;
};
