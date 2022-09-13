<template>
  <div class="tile-info">
    <div v-if="showSelectedTile">
      <v-jsoneditor v-model="selectedTile" :options="editorOptions" :plus="false" height="100%" @error="onError">
      </v-jsoneditor>
      <button class="button is-small" v-on:click="selectedTile = {}">
        Hide
      </button>
    </div>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'TileInfo',
  data() {
    return {
    }
  },
  props: {
    selectedTile: Object,
  },
  computed: {
    showSelectedTile() {
      return isEmpty(this.selectedTile)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
