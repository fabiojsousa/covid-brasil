import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 10000
});

export const apiGeocode = axios.create({
  baseURL: "https://api.bigdatacloud.net/data",
});
