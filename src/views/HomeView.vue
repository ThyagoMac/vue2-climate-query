<template>
  <v-container class="max-w-850">
    <Mybutton
      class="mb-3"
      block
      xLarge
      color="black"
      @click="showConfigs = !showConfigs"
    >
      Config <v-icon class="ml-1" small> mdi-cog </v-icon>
    </Mybutton>
    <v-row no-gutters justify="center">
      <WeatherCard
        v-for="(weather, index) in weatherList"
        :key="weather.id"
        :index="index"
        :is-loading="isLoading"
        :weather="weather"
        :size="lastWeather(index)"
        @edit="loadEditWeather"
        @remove="removeWeather"
        @actionClick="openDetails"
      >
      </WeatherCard>
    </v-row>

    <!-- sheet -->
    <v-bottom-sheet v-model="showEditWeatherSheet">
      <v-sheet class="text-center">
        <Mybutton
          class="mt-6"
          color="red"
          @click="showEditWeatherSheet = !showEditWeatherSheet"
        >
          close
        </Mybutton>
        <div class="py-3">
          {{ editWeather }}
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <!-- end sheet -->
    <!-- config cards -->
    <v-dialog v-model="showConfigs" width="700">
      <v-card>
        <v-card-title class="text-h5"> Select or remove states </v-card-title>

        <v-card-text>
          <v-row class="mt-4">
            <v-col
              v-for="(weatherConfiguration, index) in weatherConfigurations"
              :key="index"
              cols="12"
              sm="4"
              md="4"
              class="pt-0 pb-0"
            >
              <v-checkbox
                class="mt-0 mb-0"
                v-model="weatherConfiguration.displayed"
                :label="weatherConfiguration.name"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <Mybutton :outlined="true" color="black" @click="showConfigs = false">
            close
          </Mybutton>
          <Mybutton :outlined="true" color="black" @click="reloadWeather">
            confirm
          </Mybutton>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import mockBrStates from "@/utils/mock/brStates";
import WeatherCard from "@/components/WeatherCard.vue";
import Mybutton from "@/components/buttons/Mybutton.vue";
import WeatherDetails from "@/components/WeatherDetails.vue";
import WeatherService from "@/services/WeatherService";

const weatherService = new WeatherService();

const weatherConfigurations: BrStatesType = mockBrStates;

export default defineComponent({
  name: "HomePage",

  components: { WeatherCard, Mybutton, WeatherDetails },
  data() {
    return {
      isLoading: false,
      weather: null,
      showEditWeatherSheet: false,
      showDetails: false,
      showConfigs: false,
      weatherList: [] as WeatherType[],
      weatherConfigurations: weatherConfigurations as BrStatesType,
      editWeather: {
        id: 0,
        main: {
          temp: 0,
        },
        name: "",
      } as WeatherType,
      showWeather: {
        id: 0,
        main: {
          temp: 0,
        },
        name: "",
      } as WeatherType,
    };
  },
  async mounted() {
    await this.loadWeather();
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
    toggleEditWeatherSheet() {
      this.showEditWeatherSheet = !this.showEditWeatherSheet;
    },
    closeDetailsDialog() {
      this.showDetails = false;
    },
    openDetailsDialog() {
      this.showDetails = true;
    },
    toggleshowConfigsDialog() {
      this.showConfigs = !this.showConfigs;
    },
    reloadWeather() {
      this.showConfigs = false;
      this.loadWeather();
    },
    loadEditWeather(id: number) {
      const finalWeather = { ...this.weatherList[id] };
      this.editWeather = finalWeather;
      this.toggleEditWeatherSheet();
    },
    removeWeather(id: number) {
      const finalWeatherList = this.weatherList.filter(
        (weather) => weather.id !== id
      );
      this.weatherList = finalWeatherList;
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
