<template>
  <v-container class="max-w-900">
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
    <!-- showdetails -->
    <v-dialog v-model="showDetails" height="800">
      <v-card>
        <v-card-title class="text-h5">
          {{ showWeather }}
        </v-card-title>

        <v-card-text>
          {{ showWeather }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <Mybutton :outlined="true" color="" @click="showDetails = false"
            >close</Mybutton
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- endshowdetails -->
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherService from "@/services/WeatherService";
import { WeatherType } from "@/types/WeatherType";
import mockWeatherList from "@/utils/mock/weather";
import WeatherCard from "@/components/WeatherCard.vue";
import Mybutton from "@/components/buttons/Mybutton.vue";
import { BrStatesType } from "@/types/BrStatesType";
import mockBrStates from "@/utils/mock/brStates";

const weatherService = new WeatherService();

const weatherList: WeatherType[] = mockWeatherList;
const weatherConfigurations: BrStatesType = mockBrStates;

export default defineComponent({
  name: "HomePage",

  components: { WeatherCard, Mybutton },
  data() {
    return {
      isLoading: false,
      weather: null,
      showEditWeatherSheet: false,
      showDetails: false,
      showConfigs: false,
      weatherList: weatherList,
      weatherConfigurations: weatherConfigurations,
      editWeather: {},
      showWeather: {},
    };
  },
  async mounted() {
    await this.loadWeather();
    console.log("mounted");
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
    toggleDetailsDialog() {
      this.showDetails = !this.showDetails;
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
      this.toggleDetailsDialog();
    },
    getActiveWeathers() {
      return this.weatherConfigurations.filter((item) => item.displayed);
    },
    async loadWeather() {
      try {
        //this.weatherList = [];
        const activeWeathers = this.getActiveWeathers();
        console.log("try", weatherService, activeWeathers);
        /* 
        activeWeathers.forEach(async (activeWeather) => {
          const { data } = await weatherService.getWeather(
            activeWeather.lat,
            activeWeather.lng
          );

          this.weatherList = [...this.weatherList, data];
        }); */
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
.max-w-900 {
  max-width: 850px;
}
</style>
