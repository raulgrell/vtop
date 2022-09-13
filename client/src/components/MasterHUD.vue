<template>
    <div id="ui" class="flex flex-column justify-between">
        <div id="board">
            <Board :mapTiles="mapTiles" :units="mapTokens" @mapTokenClicked="" @mapTileClicked="" @emptyClicked="">
            </Board>
        </div>
        <div class="top flex justify-between items-start">
            <!-- Top Left -->
            <div class="ui-panel flex-column">
                <slot />
            </div>
            <!-- Top -->
            <div class="ui-panel flex-column">
                <TurnTokenPanel :units="units"></TurnTokenPanel>
            </div>
            <!-- Top Right -->
            <div class="ui-panel flex-column has-text-right">
                <UserPanel :worldUsers="worldUsers"></UserPanel>
                <MapPanel :maps="maps" @onMapSelected=""></MapPanel>
                <TilePanel :tiles="tiles" @onTileSelected=""></TilePanel>
                <TokenPanel :tokens="tokens" @beginInitiative="" @nextTurn="" @setTurn="" @endInitiative="">
                </TokenPanel>
            </div>
        </div>
        <div class="bottom flex justify-between items-end">
            <div class="ui-panel flex-column">
                <TileInfo :selectedTile="selectedTile"></TileInfo>
                <PlayerPanel :player="player"></PlayerPanel>
                <PlayerActionInfo :selectedAction="selectedAction"></PlayerActionInfo>
            </div>
            <div class="ui-panel flex-column has-text-centered">
                <RollPanel>
                </RollPanel>
            </div>
            <div class="ui-panel flex-column has-text-right">
                <PlayerActions :unitActions="unitActions"></PlayerActions>
                <MapActionPanel :mapActions="mapActions"></MapActionPanel>
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

export default {
    name: 'MasterHUD',

    data() {
        return {
            selectedTile: {},
            selectedAction: {}
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
        MasterHUD
    }
};
</script>

<style scoped>
</style>