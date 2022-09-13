<template>
  <div class="tile-panel">
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
          <p class="card-header-title">
            Tiles
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <ul v-if="tiles.data.length > 0" class="player-list">
          <li class="button is-small" v-for="tile in tiles.data" :key="tile.id" v-on:click="selectedTile = tile">{{
              tile.name
          }}</li>
        </ul>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="">Admin</a>
      </footer>
    </b-collapse>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'TilePanel',
  data() {
    return {
      selectedTile: {}
    }
  },
  props: {
    tiles: Object,
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
