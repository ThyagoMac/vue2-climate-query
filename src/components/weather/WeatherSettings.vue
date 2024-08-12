<template>
  <v-dialog v-model="showConfigs" width="700" @click:outside="close">
    <v-card>
      <v-card-title class="text-h5 d-block">
        <div class="text-h5">Select or remove states</div>
        <div class="text-caption">
          ({{ activeWeathers.length }}) selected limit of 10 states
        </div>
      </v-card-title>

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
              :disabled="disableAddMore(weatherConfiguration.displayed)"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Mybutton :outlined="true" color="black" @click="close">
          close
        </Mybutton>
        <Mybutton :outlined="true" color="black" @click="reloadWeather">
          confirm
        </Mybutton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { BrStatesType } from "@/types/BrStatesType";
import mockBrStates from "@/utils/mock/brStates";
import Vue from "vue";
import Mybutton from "../buttons/Mybutton.vue";

export default Vue.extend({
  name: "WeatherSettings",
  components: { Mybutton },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      showConfigs: false,
      weatherConfigurations: [] as BrStatesType,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const localString = localStorage.getItem("weatherSettings");
      const localConfig: BrStatesType | 1 = localString
        ? JSON.parse(localString)
        : 1;

      this.weatherConfigurations = mockBrStates;

      if (localConfig !== 1) {
        this.weatherConfigurations = localConfig;
      }
      this.reloadWeather();
    },
    reloadWeather() {
      localStorage.setItem(
        "weatherSettings",
        JSON.stringify(this.weatherConfigurations)
      );
      this.$emit("reloadWeather", this.activeWeathers);
    },
    close() {
      this.showConfigs = false;
      this.$emit("close");
    },
    disableAddMore(alreadyDisplayed: boolean) {
      if (alreadyDisplayed) {
        return false;
      }
      if (this.activeWeathers?.length === 10) {
        return true;
      }
      return false;
    },
  },
  computed: {
    activeWeathers(): BrStatesType {
      return this.weatherConfigurations.filter((item) => item.displayed);
    },
  },
  watch: {
    isOpen(newVal) {
      if (this.showConfigs !== newVal) {
        this.showConfigs = newVal;
      }
    },
  },
});
</script>
