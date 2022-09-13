<template>
    <div id="ui" class="flex flex-column justify-between">
        <div id="board">
            <Board :mapTiles="mapTiles" :units="mapTokens"
                @unitSelected="(unit) => selectedUnit = unit"
                @emptySelected="(tile) => (selectedTile = tile, selectedUnit = {})"
                @tileSelected="(tile) => selectedTile = tile">
            </Board>
        </div>
        <div class="top flex justify-between items-start">
            <!-- Top Left -->
            <div class="ui-panel flex-column is-3">
                <slot />
                <PlayerActionInfo :selectedAction="selectedAction"></PlayerActionInfo>
                <UnitInfo :selectedUnit="selectedUnit"></UnitInfo>
            </div>
            <!-- Top -->
            <div class="ui-panel flex-column is-3">
                <TileInfo :selectedTile="selectedTile"></TileInfo>
            </div>
            <!-- Top Right -->
            <div class="ui-panel flex-column is-3 has-text-right">
                <TurnTokenPanel :units="units"></TurnTokenPanel>
            </div>
        </div>
        <div class="bottom flex justify-between items-end">
            <div class="ui-panel flex-column is-3">
                <PlayerPanel :player="player"
                    @playerActionSelected="(action) => selectedAction = action"></PlayerPanel>
            </div>
            <div class="ui-panel flex-column is-3 has-text-centered">
                <RollPanel>
                </RollPanel>
            </div>
            <div class="ui-panel flex-column is-3 has-text-right">
                <EventPanel :worldEvents="worldEvents"></EventPanel>
                <PlayerActions :unitActions="unitActions"></PlayerActions>
            </div>
        </div>
    </div>
</template>

<script>

import Board from "@/components/Board.vue";
import UserPanel from "@/components/HUD/UserPanel.vue";
import TokenPanel from "@/components/HUD/TokenPanel.vue";
import TurnTokenPanel from "@/components/HUD/TurnTokenPanel.vue";
import MapPanel from "@/components/HUD/MapPanel.vue";
import TilePanel from "@/components/HUD/TilePanel.vue";
import PlayerPanel from "@/components/HUD/PlayerPanel.vue";
import PlayerActions from "@/components/HUD/PlayerActions.vue";
import PlayerActionInfo from "@/components/HUD/PlayerActionInfo.vue";
import RollPanel from "@/components/HUD/RollPanel.vue";
import TileInfo from "@/components/HUD/TileInfo.vue";
import MapActionPanel from "@/components/HUD/MapActionPanel.vue";
import PlayerHUD from "@/components/PlayerHUD.vue";
import MasterHUD from "@/components/MasterHUD.vue";
import EventPanel from "./HUD/EventPanel.vue";
import UnitInfo from "./HUD/UnitInfo.vue";

export default {
    name: 'PlayerHUD',

    data() {
        return {
            selectedTile: {},
            selectedAction: {},
            selectedUnit: {}
        };
    },

    props: {
        player: Object,
        mapTiles: Object,
        units: Object,
        worldUsers: Object,
        maps: Object,
        tiles: Object,
        tokens: Object,
        unitActions: Object,
        mapActions: Object,
        mapTokens: Object,
        worldEvents: Object,
    },

    mounted() {

    },

    methods: {

    },
    components: {
    Board,
    UserPanel,
    TokenPanel,
    TurnTokenPanel,
    MapPanel,
    TilePanel,
    PlayerPanel,
    PlayerActions,
    PlayerActionInfo,
    RollPanel,
    TileInfo,
    MapActionPanel,
    PlayerHUD,
    MasterHUD,
    EventPanel,
    UnitInfo
}
};
</script>

<style scoped>
</style>