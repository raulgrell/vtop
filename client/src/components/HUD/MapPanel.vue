<template>
  <div class="map-panel">
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
          <p class="card-header-title">
            Maps
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <ul v-if="maps.data.length > 0" class="player-list">
          <span class="button is-small" v-for="map in maps.data" :key="map.id" v-on:click="selectedMap = map">
            {{ map.name }}
          </span>
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
  name: 'MapPanel',
  data() {
    return {
      selectedMap: {}
    }
  },
  props: {
    maps: Object,
  },
  computed: {
    showMapInfo() {
      return isEmpty(this.selectedMap)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
