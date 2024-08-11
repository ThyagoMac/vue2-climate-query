<template>
  <v-col cols="12" :md="size">
    <!-- 
      class="my-3 mx-3 blue accent-1 white--text"
    -->
    <v-card
      class="my-3 mx-3"
      :class="cardClasses"
      elevation="4"
      :loading="isLoading"
    >
      <v-card-title>
        <v-row no-gutters justify="space-between">
          <div class="font-weight-bold text-h4">
            {{ weather.name }}
            <v-icon class="mb-1"> mdi-map-marker </v-icon>
          </div>
          <!--
          <div>
            <Mybutton icon @click="$emit('edit', index)">
              <v-icon> mdi-pencil </v-icon>
            </Mybutton>
            -->
          <!--
            <Mybutton icon @click="$emit('remove', index)">
              <v-icon> mdi-delete </v-icon>
            </Mybutton>
          </div>
          -->
        </v-row>
      </v-card-title>
      <v-card-text>
        <slot>
          <v-row class="mb-4" no-gutters :align="'start'">
            <v-col cols="12">
              <div class="font-weight-bold text-h3">
                <v-icon class="mb-1" large>mdi-thermometer</v-icon>
                {{ Math.round(weather.main.temp)
                }}<v-icon class="text-top mt-1 white--text">
                  mdi-temperature-celsius
                </v-icon>
              </div>
            </v-col>
          </v-row>
          <span class="mx-1">
            Feels Like
            {{ Math.round(weather.main.feels_like)
            }}<v-icon class="text-top" small>mdi-temperature-celsius</v-icon>
          </span>
          <span class="mx-1">
            Humidity
            {{ weather.main.humidity.toFixed(2) }}%<v-icon class="mb-1" small
              >mdi-water</v-icon
            >
          </span>
        </slot>
      </v-card-text>
      <v-card-actions class="pt-0">
        <Mybutton block @click="$emit('actionClick', index)">
          More info <v-icon small class="ml-1">mdi-chart-bar</v-icon>
        </Mybutton>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherType } from "@/types/WeatherType";
import Mybutton from "./buttons/Mybutton.vue";

export default defineComponent({
  name: "WeatherCard",
  components: { Mybutton },
  props: {
    index: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 6,
    },
    weather: {
      type: Object as PropType<WeatherType>,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    cardClasses() {
      if (this.weather.main.temp < 23) {
        return "card-bg-cold";
      }
      if (this.weather.main.temp < 35) {
        return "card-bg-normal";
      }

      return "card-bg-hot";
    },
  },
});
</script>
<style scoped>
.text-top {
  vertical-align: top;
}

.card-bg-cold {
  background: linear-gradient(#8ad0ff45, #8ad0ff);
  color: #fff;
}
.card-bg-cold .v-btn__content,
.card-bg-cold div {
  color: #fff;
}

.card-bg-normal {
  background: linear-gradient(#3eb2ff45, #3eb2ff);
  color: #fff;
}
.card-bg-normal .v-btn__content,
.card-bg-normal div {
  color: #fff;
}

.card-bg-hot {
  background: linear-gradient(#ffbb3e45, #ff1d1d45);
  color: #fff;
}
.card-bg-hot span.v-btn__content,
.card-bg-hot div {
  color: #fff;
}
</style>
