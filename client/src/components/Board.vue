<template>
  <div class="game-canvas" ref="board">
    <v-stage :config="configKonva" ref="stage">
      <v-layer>
        <v-group :config="{ x: width / 2, y: height / 2 }">
          <v-rect v-for="tile in viewportTiles" :key="tile.id" :config="tile" :data="tile"
            @click="emptyClicked"
            @mouseover=""
            @mouseenter=""
            @mouseleave=""
            @dragstart="emptyDrag"
            @dragmove="emptyDragging"
            @dragend="emptyDragged"></v-rect>
        </v-group>
      </v-layer>
      <v-layer>
        <v-group :config="{ x: width / 2, y: height / 2 }">
          <v-rect v-for="tile in mapTiles.data" :key="tile.id" :data="tile" :config="makeMapTile(tile.x, tile.y)"
            @click="tileClicked"
            @dragstart="tileDrag"
            @dragmove="tileDragging"
            @dragend="tileDragged"></v-rect>
        </v-group>
      </v-layer>
      <v-layer>
        <v-group :config="{ x: width / 2, y: height / 2 }">
          <v-rect v-for="unit in units.data" :key="unit.id" :data="unit" :config="makeUnitTile(unit.x, unit.y)"
            @click="unitClicked"
            @dragstart="unitDrag"
            @dragmove="unitDragging"
            @dragend="unitDragged"></v-rect>
        </v-group>
      </v-layer>
      <v-layer>
        <v-group :config="{ x: width / 2, y: height / 2 }">
          <v-rect v-for="unit in units.data" :key="unit.id" :data="unit" :config="makeTileIndicator(unit.x, unit.y)"></v-rect>
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>

import { state, client } from '../state'
import { gridToCanvas, tileSize } from '../board'

const width = window.innerWidth;
const height = window.innerHeight;

function dragBoundFixed() {
  var pos = this.getAbsolutePosition();
  return { x: pos.x, y: pos.y };
}

const baseTile = {
    width: tileSize,
    height: tileSize,
    stroke: 'black',
    strokeWidth: 1,
    draggable: true,
    dragBoundFunc: dragBoundFixed
}

function makeEmptyTile(id, i, j) {
  return {
    ...baseTile,
    id: id.toString(),
    x: gridToCanvas(i, 0).x,
    y: gridToCanvas(0, j).y,
    fill: '#EEE',
  }
}
function makeMapTile(x, y) {
  return {
    ...baseTile,
    x: gridToCanvas(x, 0).x,
    y: gridToCanvas(0, y).y,
    fill: 'grey',
    strokeWidth: 2,
  };
}
function makeUnitTile(x, y) {
  return {
    ...baseTile,
    x: gridToCanvas(x, 0).x,
    y: gridToCanvas(0, y).y,
    fill: 'blue',
    strokeWidth: 2,
  }
}
function makeTileIndicator(x, y) {
  return {
    ...baseTile,
    x: gridToCanvas(x, 0).x - 3,
    y: gridToCanvas(0, y).y - 3,
    width: tileSize + 6,
    height: tileSize + 6,
    fill: 'transparent',
    stroke: 'red',
    strokeWidth: 3,
    hitFunc: function(context) {}
  }
}

const viewportTiles = [];
let viewportTileIndex = 0;
for (let i = -12; i <= 12; i++) {
  for (let j = -12; j <= 12; j++) {
    viewportTiles.push(makeEmptyTile(viewportTileIndex++, i, j));
  }
}

export default {
  data() {
    return {
      width,
      height,
      viewportTiles,
      configKonva: { width, height },
    };
  },
  methods: {
    gridToCanvas,
    makeEmptyTile,
    makeMapTile,
    makeUnitTile,
    makeTileIndicator,
    fitStageIntoParentContainer() {
      var container = this.$refs.board;
      this.$refs.stage.getNode().width(container.offsetWidth);
      this.$refs.stage.getNode().height(container.offsetHeight);
    },
    emptyClicked(ev) {
      this.$emit("emptySelected", {});
    },
    emptyDrag(ev) {
      console.log("mapEmptyDrag", ev);
      this.$emit("mapEmptyDrag", ev.target.attrs.data);
    },
    emptyDragging(ev) {
      console.log("mapEmptyDragging", ev);
      this.$emit("mapEmptyDragging", ev.target.attrs.data);
    },
    emptyDragged(ev) {
      console.log("mapEmptyDragging", ev);
      this.$emit("mapEmptyDragging", ev.target.attrs.data);
    },
    tileClicked(ev) {
      this.$emit("tileSelected", ev.target.attrs.data);
    },
    tileDrag(ev) {
      console.log("mapTileDrag", ev);
      this.$emit("mapTileDrag", ev.target.attrs.data);
    },
    tileDragging(ev) {
      console.log("mapTileDragging", ev);
      this.$emit("mapTileDragging", ev.target.attrs.data);
    },
    tileDragged(ev) {
      console.log("mapTileDragging", ev);
      this.$emit("mapTileDragging", ev.target.attrs.data);
    },
    unitClicked(ev) {
      this.$emit("unitSelected", ev.target.attrs.data);
    },
    unitDrag(ev) {
      console.log("mapUnitDrag", ev);
      this.$emit("mapUnitDrag", ev.target.attrs.data);
    },
    unitDragging(ev) {
      console.log("mapUnitDragging", ev);
      this.$emit("mapUnitDragging", ev.target.attrs.data);
    },
    unitDragged(ev) {
      console.log("mapUnitDragged", ev);
      this.$emit("mapUnitDragged", ev.target.attrs.data);
    },
  },
  props: {
    mapTiles: Object,
    units: Object,
  },
  computed: {
  },
  mounted() {
    window.addEventListener('resize', this.fitStageIntoParentContainer)
    document.addEventListener('keydown', movement);
    this.fitStageIntoParentContainer();
    this.$refs.stage.getNode().addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  },
  unmounted() {
    window.removeEventListener('resize', this.fitStageIntoParentContainer)
    document.removeEventListener('keydown', movement);
  },
};

function movement(event) {
  const token = state.mapTokens.data[0];
  const tokenService = client.service('map-token');
  if (event.key === 'w') tokenService.patch(token.id, { x: token.x, y: token.y - 1 });
  if (event.key === 's') tokenService.patch(token.id, { x: token.x, y: token.y + 1 });
  if (event.key === 'a') tokenService.patch(token.id, { x: token.x - 1, y: token.y });
  if (event.key === 'd') tokenService.patch(token.id, { x: token.x + 1, y: token.y });
}

</script>
