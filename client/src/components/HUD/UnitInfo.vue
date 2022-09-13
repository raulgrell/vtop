<template>
  <div v-if="showSelectedUnit" class="unit-info">
    <figure>
      <img :alt="selectedUnit.unit_data.name" :src="selectedUnit.unit_data.meta.image"
        class="unit-info-image" />
      <caption>{{  selectedUnit.unit_data.name  }} - {{  selectedUnit.unit_data.race  }}</caption>
    </figure>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'UnitInfo',
  data() {
    return {
    }
  },
  props: {
    selectedUnit: Object,
  },
  computed: {
    showSelectedUnit() {
      return isEmpty(this.selectedUnit)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.unit-info {
  width: 100%;
}

figure {
  width: 100%;
}

.unit-info-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  object-position: center;
}
</style>
