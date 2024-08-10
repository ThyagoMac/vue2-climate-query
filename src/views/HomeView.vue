<template>
  <v-container class="">
    <v-row no-gutters justify="center">
      <v-col cols="12" md="">
        <v-card class="my-3 mx-3" elevation="1" :loading="isLoading">
          <v-card-title>
            <v-row no-gutters justify="space-between">
              <div>Cafe Badilico</div>
              <div>edit</div>
            </v-row>
          </v-card-title>
          <v-card-text>1</v-card-text>
          <v-card-actions>
            <v-btn color="" text> substituir </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="" class="yellow">2</v-col>
      <v-col cols="12" lg="" class="blue">3</v-col>
      <v-col cols="12" lg="" class="green">4</v-col>
      <v-col cols="12" lg="" class="orange">5</v-col>
    </v-row>

    https://api.openweathermap.org/data/2.5/weather?lat=-15.868607497813757&lon=-47.82130864112691&lang=pt_br&appid=83bbcf10c1644a357a6a29b9c6d66fa0
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherService from "@/services/WeatherService";

const weatherService = new WeatherService();

export default Vue.extend({
  name: "HomePage",

  components: {},
  data: () => {
    return {
      isLoading: false,
      weather: null,
    };
  },
  async created() {
    await this.loadWeather();
    console.log("created");
  },
  methods: {
    async loadWeather() {
      try {
        const { data } = await weatherService.getWeather(
          -15.868607497813757,
          -47.82130864112691
        );
        this.weather = data;
      } catch (error) {
        console.log("erro:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
