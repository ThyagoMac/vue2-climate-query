<template>
  <v-container>
    <div class="purple darken-2 text-center">
      <span class="white--text">Lorem ipsum</span>
      https://api.openweathermap.org/data/2.5/weather?lat=-15.868607497813757&lon=-47.82130864112691&lang=pt_br&appid=83bbcf10c1644a357a6a29b9c6d66fa0
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",

  components: {},
  created() {
    console.log("created");
  },
});
</script>
