<template>
  <div class="player-panel">
    <div v-if="player.id" class="active-pc">
      <h3 class="title">{{  player.data.name  }} <a @click="openCharacterSheet">+</a></h3>
      <h4 class="subtitle">
        {{  player.data.race  }} ({{  player.data.size  }}) - {{  player.data.alignment  }}
      </h4>
      <b-tabs :animated="false">
        <b-tab-item label="Status">
          <div class="flex">
            <div class="flex-column">
              <FeatureTable :entries="Object.entries(player.data.base)"></FeatureTable>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Features">
          <div class="flex">
            <div class="flex-column w-third">
              <FeatureTable :entries="Object.entries(player.data.ability)" :roll="true"></FeatureTable>
            </div>
            <div class="flex-column third">
              <FeatureTable :entries="Object.entries(player.data.rolls)" :roll="true"></FeatureTable>
            </div>
            <div class="flex-column third">
              <FeatureTable :entries="Object.entries(player.data.saves)" :roll="true"></FeatureTable>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Actions">
          <div class="flex">
            <div class="flex-column">
              <ActionTable :entries="player.data.actions"></ActionTable>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Effects">
          <div class="flex">
            <div class="flex-column">
              <EffectTable :entries="player.data.effects"></EffectTable>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";
import { state } from "@/state.js";

import CharacterSheetVue from "@/components/windows/CharacterSheet.vue";
import FeatureTable from "@/components/UI/FeatureTable.vue";
import ActionTable from "@/components/UI/ActionTable.vue";
import EffectTable from "@/components/UI/EffectTable.vue";

export default {
  name: 'PlayerPanel',
  data() {
    return {
      selectedTurnToken: {}
    }
  },
  components: {
    FeatureTable,
    ActionTable,
    EffectTable
  },
  methods: {
    updatePC(event) {
      console.log(event);
      const unit = state.units.data[0];
      client.service("unit").update(unit.id, unit).then(console.log).catch(this.onError);
    },
    openCharacterSheet() {
      this.$buefy.modal.open({
        parent: this,
        component: CharacterSheetVue,
        props: { unit: this.$props.player },
        hasModalCard: true,
        trapFocus: true
      });
    }
  },
  props: {
    player: Object,
  },
  computed: {
    showActivePlayer() {
      return isEmpty(this.player)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
