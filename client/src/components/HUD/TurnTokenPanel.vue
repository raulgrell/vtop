<template>
  <div class="flex justify-end turn-token-panel">
    <div class="flex flex-grow">
      <figure v-for="pc in units.data" :key="pc.id">
        <img v-on:click="selectedTurnToken = pc" :alt="pc.data.name" :src="pc.data.meta.image"
          class="turn-token-image" />
      </figure>
    </div>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'TurnTokenPanel',
  data() {
    return {
      selectedTurnToken: {}
    }
  },
  props: {
    units: Object,
  },
  computed: {
    showTurnTokenInfo() {
      return isEmpty(this.selectedTurnToken)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.turn-token-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  object-position: center;
}
</style>
