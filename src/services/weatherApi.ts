import axios from "axios";

export default axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: "83bbcf10c1644a357a6a29b9c6d66fa0",
    lang: "pt_br",
    units: "metric",
  },
});
