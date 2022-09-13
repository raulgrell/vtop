<template>
  <div class="map-action-panel">
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
          <p class="card-header-title">
            Map Actions
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div v-if="mapActions.data.length > 0">
          <button v-for="action in mapActions.data" :key="action.id" v-on:click="selectedAction = action"
            class="button">
            {{ action.id }}
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

export default {
  name: 'MapActionPanel',
  data() {
    return {
    }
  },
  props: {
    mapActions: Object,
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>