<template>
  <v-container class="max-w-850">
    <Mybutton
      class="mb-3"
      block
      xLarge
      color="black"
      @click="showConfigs = !showConfigs"
    >
      Settings <v-icon class="ml-1" small> mdi-cog </v-icon>
    </Mybutton>
    <v-row no-gutters justify="center">
      <WeatherCard
        v-for="(weather, index) in weatherList"
        :key="weather.id"
        :index="index"
        :is-loading="isLoading"
        :weather="weather"
        :size="lastWeather(index)"
        @actionClick="openDetails"
      />
    </v-row>

    <!-- config cards -->
    <WeatherSettings
      :is-open="showConfigs"
      @reloadWeather="reloadWeather"
      @close="closeShowConfigs"
    />

    <!-- end config cards -->
    <!-- showdetails -->
    <WeatherDetails
      :isOpen="showDetails"
      :showWeather="showWeather"
      height="800"
      @close="closeDetailsDialog"
    />
    <!-- endshowdetails -->
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WeatherType } from "@/types/WeatherType";
import { BrStatesType } from "@/types/BrStatesType";
import WeatherCard from "@/components/weather/WeatherCard.vue";
import Mybutton from "@/components/buttons/Mybutton.vue";
import WeatherDetails from "@/components/weather/WeatherDetails.vue";
import WeatherSettings from "@/components/weather/WeatherSettings.vue";
import WeatherService from "@/services/WeatherService";

const weatherService = new WeatherService();

export default defineComponent({
  name: "HomePage",

  components: { WeatherCard, Mybutton, WeatherSettings, WeatherDetails },
  data() {
    return {
      isLoading: false,
      showDetails: false,
      showConfigs: false,
      weatherList: [] as WeatherType[],
      weatherConfigurations: {} as BrStatesType,
      showWeather: {
        id: 0,
        main: {
          temp: 0,
        },
        name: "",
      } as WeatherType,
    };
  },
  methods: {
    isOdd(num: number) {
      return num % 2 !== 0;
    },
    lastWeather(index: number) {
      if (
        this.isOdd(this.weatherList?.length) &&
        index + 1 === this.weatherList?.length
      ) {
        return 12;
      }
      return 6;
    },
    closeShowConfigs() {
      this.showConfigs = false;
    },
    closeDetailsDialog() {
      this.showDetails = false;
    },
    openDetailsDialog() {
      this.showDetails = true;
    },
    reloadWeather(config: BrStatesType) {
      this.showConfigs = false;
      this.weatherConfigurations = config;
      this.loadWeather();
    },
    openDetails(id: number) {
      const weatherToShow = { ...this.weatherList[id] };
      this.showWeather = weatherToShow;
      this.openDetailsDialog();
    },
    getActiveWeathers() {
      return this.weatherConfigurations.filter((item) => item.displayed);
    },
    async loadWeather() {
      try {
        const activeWeathers = this.getActiveWeathers();

        this.weatherList = [];
        activeWeathers.forEach(async (activeWeather) => {
          const { data } = await weatherService.getWeather(
            activeWeather.lat,
            activeWeather.lon
          );

          this.weatherList = [...this.weatherList, data];
        });
      } catch (error) {
        console.log("erro:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
<style scoped>
.max-w-850 {
  max-width: 850px;
}
</style>
