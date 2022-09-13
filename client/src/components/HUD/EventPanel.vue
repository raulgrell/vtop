<template>
  <div class="event-panel">
    <EventBox v-for="e in worldEvents.data" :key="e.id" :event="e"></EventBox>
  </div>
</template>

<script>

import EventBox from "../UI/EventBox.vue";

export default {
  name: 'EventPanel',
  data() {
    return {
    }
  },
  props: {
    worldEvents: Object,
  },
  computed: {
  },
  components: {
    EventBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event-panel {
  overflow-y: scroll;
  max-height: 66vh;
}
</style>
