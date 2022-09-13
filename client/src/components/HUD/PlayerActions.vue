<template>
  <div class="player-actions">
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
          <p class="card-header-title">
            Player Actions
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div v-if="unitActions.data.length > 0">
          <button v-for="action in unitActions.data" :key="action.id" v-on:click="selectedAction = action"
            class="button">
            {{ action.name }}
          </button>
        </div>
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
  name: 'PlayerActions',
  data() {
    return {
    }
  },
  props: {
    unitActions: Object,
    selectedAction: Object,
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
