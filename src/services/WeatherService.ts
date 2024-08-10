import weatherApi from "./weatherApi";

export default class WeatherService {
  getWeather(lat: number, lon: number) {
    return weatherApi.get(`?lat=${lat}&lon=${lon}`);
  }
}
