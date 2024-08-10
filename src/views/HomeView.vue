<template>
  <v-container class="">
    <v-row no-gutters justify="center">
      <WeatherCard
        v-for="(weather, index) in weatherList"
        :key="index"
        :id="index"
        :is-loading="isLoading"
        :title="weather.name"
        :size="lastWeather(index)"
        @edit="loadEditWeather"
      >
        {{ weather.weather[0]?.main }}
      </WeatherCard>
    </v-row>

    <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
    https://api.openweathermap.org/data/2.5/weather?lat=-15.868607497813757&lon=-47.82130864112691&lang=pt_br&appid=83bbcf10c1644a357a6a29b9c6d66fa0

    <!-- sheet -->
    <v-bottom-sheet v-model="showSheet">
      <v-sheet class="text-center">
        <v-btn class="mt-6" text color="red" @click="showSheet = !showSheet">
          close
        </v-btn>
        <div class="py-3">
          {{ editWeather }}
          <div>{{ editWeather }}</div>
          <div>{{ editWeather }}</div>
          <div>{{ editWeather }}</div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherService from "@/services/WeatherService";
import { WeatherType } from "@/types/WeatherType";
import mockWeatherList from "@/utils/mock/weather";
import WeatherCard from "@/components/WeatherCard.vue";

const weatherService = new WeatherService();

const weatherList: WeatherType[] = mockWeatherList;

export default Vue.extend({
  name: "HomePage",

  components: { WeatherCard },
  data: () => {
    return {
      isLoading: false,
      weather: null,
      showSheet: false,
      weatherList: weatherList,
      editWeather: {},
    };
  },
  async created() {
    await this.loadWeather();
    console.log("created");
  },
  methods: {
    lastWeather(index: number) {
      if (index + 1 === this.weatherList?.length) {
        return 12;
      }
      return 6;
    },
    toggleSheet() {
      this.showSheet = !this.showSheet;
    },
    loadEditWeather(id: number) {
      const weatherToEdit = { ...this.weatherList[id] };
      this.editWeather = weatherToEdit;
      this.toggleSheet();
    },
    async loadWeather() {
      try {
        console.log("try", weatherService);
        /* const { data } = await weatherService.getWeather(-22.84, -43.15);
        this.weather = data; */
      } catch (error) {
        console.log("erro:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
