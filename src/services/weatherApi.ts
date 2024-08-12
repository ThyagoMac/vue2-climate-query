import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_WEATHER_API_URL,
  params: {
    appid: process.env.VUE_APP_WEATHER_APPID,
    lang: "pt_br",
    units: "metric",
  },
});
