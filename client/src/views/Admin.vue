<template>
  <div class="admin">
    <slot />
  </div>
</template>

<style scoped>
#ui {
  height: 100%;
}
</style>

<script>
import {
  state,
} from "@/state.js";

export default {
  name: "Admin",
  data() {
    return state;
  },
  methods: {
  },
  computed: {
  },
};
</script>
