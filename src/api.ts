import { Axios } from "./lib/Axios";
import axios from "axios";

export async function fetchCoins() {
  const res = await Axios("/coins");
  return res.data;
}

export async function fetchCoinInfo(coinId: string) {
  const res = await Axios(`/coins/${coinId}`);
  return res.data;
}

export async function fetchCoinPrice(coinId: string) {
  const res = await Axios(`/tickers/${coinId}`);
  return res.data;
}

export async function fetchChartInfo(coinId: string) {
  const res = await axios(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  return res.data;
}
