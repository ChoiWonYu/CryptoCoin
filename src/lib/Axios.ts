import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
});
