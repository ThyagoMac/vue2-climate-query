<template>
  <v-col cols="12" :md="size">
    <v-card class="my-3 mx-3 white" elevation="1" :loading="isLoading">
      <v-card-title>
        <v-row no-gutters justify="space-between">
          <div>{{ title }}</div>
          <v-btn icon @click="handleEditClick(id)">
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text><slot /></v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
export default {
  name: "WeatherCard",
  props: {
    id: {
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
    title: String,
  },
  data: () => {
    return {};
  },
  methods: {
    handleEditClick(id: number) {
      this.$emit("edit", id);
      console.log("11");
    },
  },
};
</script>
