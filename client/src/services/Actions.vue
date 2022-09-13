<template>
  <div class="action-service">
    <h3 class="title">Actions</h3>
    <div v-if="actions.data.length > 0">
      <button v-for="action in actions.data" :key="action.id" v-on:click="selection = action" class="button">
        {{ action.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionService'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
