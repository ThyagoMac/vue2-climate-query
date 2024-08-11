<template>
  <v-dialog :max-width="width" v-model="showDetails" @click:outside="close">
    <v-card class="scoopedee2">
      <v-card-title class="text-h5 d-block">
        <div class="text-h5">
          {{ showWeather.name }}
        </div>
        <div class="text-caption">forecast for 5 days</div>
      </v-card-title>

      <v-card-text>
        <div class="" id="chart">
          <apexchart
            v-if="!isLoading"
            type="line"
            height="350"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Mybutton :outlined="true" color="" @click="close"> close </Mybutton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { WeatherType } from "@/types/WeatherType";
import { defineComponent, PropType } from "vue";
import Mybutton from "@/components/buttons/Mybutton.vue";
import VueApexCharts from "vue-apexcharts";
import fiveDays from "@/utils/mock/fiveDays";

import WeatherService from "@/services/WeatherService";

const weatherService = new WeatherService();

export default defineComponent({
  name: "WeatherDetails",
  components: { Mybutton, apexchart: VueApexCharts },
  props: {
    showWeather: {
      type: Object as PropType<WeatherType>,
      required: true,
    },
    width: {
      type: String,
      default: "800",
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      showDetails: false,
      fiveDays: fiveDays,
      series: [
        {
          name: "Cº",
          data: [] as number[],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          row: {
            colors: ["#f5f5f5", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [] as string[],
        },
        colors: ["#3eb2ff"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#ffbb3e", "#ffbb3e", "#3eb2ff"],
            shadeIntensity: 0.5,
            type: "vertical",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 25, 100],
            colorStops: [],
          },
        },
      },
    };
  },
  methods: {
    getUniqueDays() {
      this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];
      const uniqueDaysWeather = this.fiveDays.list.reduce((acc, current) => {
        const currentDay = current.dt_txt.split(" ")[0];

        if (
          !acc.some((weather) => weather.dt_txt.split(" ")[0] === currentDay)
        ) {
          //add x axis
          const stgDate = current.dt_txt.split(" ")[0];
          const [year, month, day] = stgDate.split("-");
          const finalDate = `${day}-${month}-${year}`;

          this.chartOptions.xaxis.categories.push(finalDate);

          //fill data y axis
          this.series[0].data.push(Math.round(current.main.temp));
          acc.push(current);
        }

        return acc;
      }, [] as typeof this.fiveDays.list);

      return uniqueDaysWeather;
    },
    async loadData() {
      this.isLoading = true;
      try {
        const { data } = await weatherService.getFoirecast(
          this.showWeather.coord?.lat,
          this.showWeather.coord?.lon
        );
        this.fiveDays = data;

        const uniqueDaysWeather = this.getUniqueDays();
        uniqueDaysWeather.forEach((element) => {
          console.log(element.dt_txt);
        });
      } catch (error) {
        console.log("erro:", error);
      } finally {
        this.isLoading = false;
      }
    },
    close() {
      this.showDetails = false;
      this.$emit("close");
    },
  },
  watch: {
    isOpen(newVal) {
      if (this.showDetails !== newVal) {
        this.showDetails = newVal;
      }
      if (newVal) {
        this.loadData();
      }
    },
  },
});
</script>
<style scoped>
.max-w-850 {
  max-width: 850px !important;
}
</style>
