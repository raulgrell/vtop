<template>
  <div class="player-action-info">
    <div v-if="showSelectedAction">
      <v-jsoneditor v-model="selectedAction" :options="editorOptions" :plus="false" height="100%" @error="onError">
      </v-jsoneditor>
      <button class="button is-small" v-on:click="selectedAction = {}">
        Hide
      </button>
      <hr />
    </div>

  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'PlayerActionInfo',
  data() {
    return {
    }
  },
  props: {
    selectedAction: Object,
  },
  computed: {
    showSelectedAction() {
      return isEmpty(this.selectedAction)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
