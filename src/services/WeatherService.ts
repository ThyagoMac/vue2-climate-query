import weatherApi from "./weatherApi";

export default class WeatherService {
  getWeather(lat: number, lon: number) {
    return weatherApi.get(`/weather?lat=${lat}&lon=${lon}`);
  }
  getFoirecast(lat: number, lon: number) {
    return weatherApi.get(`/forecast?cnt=32&lat=${lat}&lon=${lon}&cnt=32`);
  }
}
