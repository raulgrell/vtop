  <template>

  <MasterHUD 
        :player="player"
        :mapTiles="mapTiles"
        :units="units"
        :worldUsers="worldUsers"
        :maps="maps"
        :tiles="tiles"
        :tokens="tokens"
        :unitActions="unitActions"
        :mapActions="mapActions"
        :mapTokens="mapTokens"><slot /></MasterHUD>
</template>

<style>
#ui {
  height: 100%;
}

#board {
  position: absolute;
  height: 100%;
  width: 100%;
}

.ui-panel {
  width: 100%;
  z-index: 20;
}

.is-tinted {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

<script>
import {
  state,
  syncService,
  componentModal
} from "@/state.js";

import Board from "../components/Board.vue";
import UserPanel from "../components/HUD/UserPanel.vue";
import TokenPanel from "../components/HUD/TokenPanel.vue";
import TurnTokenPanel from "../components/HUD/TurnTokenPanel.vue";
import MapPanel from "../components/HUD/MapPanel.vue";
import TilePanel from "../components/HUD/TilePanel.vue";
import PlayerPanel from "../components/HUD/PlayerPanel.vue";
import PlayerActions from "../components/HUD/PlayerActions.vue";
import PlayerActionInfo from "../components/HUD/PlayerActionInfo.vue";
import RollPanel from "../components/HUD/RollPanel.vue";
import TileInfo from "../components/HUD/TileInfo.vue";
import MapActionPanel from "../components/HUD/MapActionPanel.vue";
import PlayerHUD from "../components/PlayerHUD.vue";
import MasterHUD from "../components/MasterHUD.vue";

import ActionsVue from "../services/Actions.vue";
import EffectsVue from "../services/Effects.vue";
import MapActionsVue from "../services/MapActions.vue";
import MapTilesVue from "../services/MapTiles.vue";
import MapsVue from "../services/Maps.vue";
import MapTokensVue from "../services/MapTokens.vue";
import SpritesheetsVue from "../services/Spritesheets.vue";
import TilesVue from "../services/Tiles.vue";
import TokensVue from "../services/Tokens.vue";
import UnitActionsVue from "../services/UnitActions.vue";
import UnitsVue from "../services/Units.vue";
import UsersVue from "../services/Users.vue";
import WorldsVue from "../services/Worlds.vue";

// Vue

export default {
  name: "Game",
  data() {
    return state;
  },
  beforeDestroy() {
  },
  methods: {
    actionsModal: componentModal(ActionsVue),
    effectsModal: componentModal(EffectsVue),
    mapActionsModal: componentModal(MapActionsVue),
    mapTilesModal: componentModal(MapTilesVue),
    mapsModal: componentModal(MapsVue),
    mapTokensModal: componentModal(MapTokensVue),
    spritesheetModal: componentModal(SpritesheetsVue),
    tilesModal: componentModal(TilesVue),
    tokensModal: componentModal(TokensVue),
    unitActionsModal: componentModal(UnitActionsVue),
    unitsModal: componentModal(UnitsVue),
    usersModal: componentModal(UsersVue),
    worldsModal: componentModal(WorldsVue),
  },
  computed: {
    player: () => state.units.data.find((x) => x.user_id == 1) || {},
  },
  services: {
    action: syncService("actions"),
    effect: syncService("effects"),
    feature: syncService("features"),
    "map-action": syncService("mapActions"),
    "map-tile": syncService("mapTiles"),
    "map-token": syncService("mapTokens"),
    map: syncService("maps"),
    "unit-action": syncService("unitActions"),
    unit: syncService("units"),
    template: syncService("templates"),
    tile: syncService("tiles"),
    token: syncService("tokens"),
    users: syncService("users"),
    world: syncService("worlds"),
    "world-user": syncService("worldUsers"),
    "world-event": syncService("worldEvents"),
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
