<template>
  <v-btn
    :icon="icon"
    :text="text"
    :color="color"
    :block="block"
    :outlined="outlined"
    :x-large="xLarge"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "MyButton",
  props: {
    color: {
      type: String,
      default: "white accent-4",
    },
    text: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
  },
};
</script>
