<template>
  <div class="roll-panel">
    <div>
      <span v-for="d in dice" class="button" @click="$client.service('world-event').create({
        world_id: 1,
        user_id:1,
        data: {
          type: 'roll',
          dice: d
        }
      }).then($log).catch(onError)">{{ d }}</span>
    </div>
    <slot />
  </div>
</template>

<script>

const dice = [
  "2d2 + 3",
  "2d3 + 3",
  "2d4 + 3",
  "2d6 + 3",
  "2d8 + 3",
  "2d10 + 3",
  "2d12 + 3",
  "2d20 + 3",
  "2d100 + 3"
];

export default {
  name: 'RollPanel',
  data() {
    return {
      dice
    }
  },
  props: {
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
