import { WeatherType } from "@/types/WeatherType";

const mockWeatherList: WeatherType[] = [
  {
    coord: {
      lon: -47.8213,
      lat: -15.8686,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "céu limpo",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 22.37,
      feels_like: 22.05,
      temp_min: 22.37,
      temp_max: 22.37,
      pressure: 1012,
      humidity: 53,
      sea_level: 1012,
      grnd_level: 895,
    },
    visibility: 8000,
    wind: {
      speed: 5.14,
      deg: 260,
    },
    clouds: {
      all: 6,
    },
    dt: 1723309259,
    sys: {
      type: 1,
      id: 8336,
      country: "BR",
      sunrise: 1723282261,
      sunset: 1723323736,
    },
    timezone: -10800,
    id: 3461936,
    name: "Guará",
    cod: 200,
  },
  {
    coord: {
      lon: -44.38,
      lat: -18.1,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "céu limpo",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 29.18,
      feels_like: 27.73,
      temp_min: 29.18,
      temp_max: 29.18,
      pressure: 1010,
      humidity: 24,
      sea_level: 1010,
      grnd_level: 936,
    },
    visibility: 10000,
    wind: {
      speed: 4.98,
      deg: 276,
      gust: 5.97,
    },
    clouds: {
      all: 1,
    },
    dt: 1723309911,
    sys: {
      country: "BR",
      sunrise: 1723281594,
      sunset: 1723322751,
    },
    timezone: -10800,
    id: 3465512,
    name: "Corinto",
    cod: 200,
  },
  {
    coord: {
      lon: -46.64,
      lat: -23.55,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "nublado",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 13.35,
      feels_like: 12.8,
      temp_min: 11.33,
      temp_max: 13.35,
      pressure: 1019,
      humidity: 79,
      sea_level: 1019,
      grnd_level: 928,
    },
    visibility: 10000,
    wind: {
      speed: 2.57,
      deg: 0,
    },
    clouds: {
      all: 75,
    },
    dt: 1723309921,
    sys: {
      type: 2,
      id: 2082654,
      country: "BR",
      sunrise: 1723282543,
      sunset: 1723322887,
    },
    timezone: -10800,
    id: 3448439,
    name: "São Paulo",
    cod: 200,
  },
  {
    coord: {
      lon: -51.22,
      lat: -30.01,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "nublado",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 30.48,
      feels_like: 11.69,
      temp_min: 12.48,
      temp_max: 13.05,
      pressure: 1020,
      humidity: 73,
      sea_level: 1020,
      grnd_level: 1017,
    },
    visibility: 10000,
    wind: {
      speed: 5.66,
      deg: 280,
    },
    clouds: {
      all: 100,
    },
    dt: 1723310118,
    sys: {
      type: 2,
      id: 2021802,
      country: "BR",
      sunrise: 1723284169,
      sunset: 1723323459,
    },
    timezone: -10800,
    id: 3452925,
    name: "Porto Alegre",
    cod: 200,
  },
  {
    coord: {
      lon: -49.44,
      lat: -27.33,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "céu limpo",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 15.09,
      feels_like: 13.78,
      temp_min: 15.09,
      temp_max: 15.09,
      pressure: 1018,
      humidity: 43,
      sea_level: 1018,
      grnd_level: 946,
    },
    visibility: 10000,
    wind: {
      speed: 0.85,
      deg: 272,
      gust: 1.22,
    },
    clouds: {
      all: 5,
    },
    dt: 1723310118,
    sys: {
      country: "BR",
      sunrise: 1723283516,
      sunset: 1723323258,
    },
    timezone: -10800,
    id: 3460514,
    name: "Ituporanga",
    cod: 200,
  },
];

export default mockWeatherList;
