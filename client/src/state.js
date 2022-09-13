import Vue from 'vue'

const Collection = () => ({ total: 0, limit: 0, skip: 0, data: [] });

const services = [
  { name: 'action', state: 'actions' },
  { name: 'effect', state: 'effects' },
  { name: 'feature', state: 'features' },
  { name: 'map-action', state: 'mapActions' },
  { name: 'map-tile', state: 'mapTiles' },
  { name: 'map-token', state: 'mapTokens' },
  { name: 'map', state: 'maps' },
  { name: 'unit-action', state: 'unitActions' },
  { name: 'unit', state: 'units' },
  { name: 'template', state: 'templates' },
  { name: 'tile', state: 'tiles' },
  { name: 'token', state: 'tokens' },
  { name: 'users', state: 'users' },
  { name: 'world', state: 'worlds' },
  { name: 'world-user', state: 'worldUsers' },
  { name: 'world-event', state: 'worldEvents' },
];

const selections = [
  'User',
  'Map',
  'MapToken',
  'MapTile',
];

const serviceCollection = services.map(x => ({ [x.state]: Collection() }));
const serviceState = serviceCollection.reduce((r, x) => Object.assign(r, x), {});

const state = {
  ...serviceState,
  selectedTile: {},
  selectedMap: {},
  selectedAction: {},
  selectedTurnToken: {},
  selectedUserToken: {},
  selectedUnit: {}
};

const socket = io("ws://localhost:3030");
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());
client.configure((app) => {
  app.mixins.push((service) => {
    service.findOne = (params) => {
      params = params || {}
      params.query = params.query || {}
      params.query.$limit = 1
      return service.find(params).then((result) => {
        var data = result.data || result
        return Array.isArray(data) ? data[0] : data
      })
    }
  })
})

const login = async () => {
  try {
    return await client.reAuthenticate();
  } catch (error) {
    return await client.authenticate({
      strategy: 'local',
      email: 'raulgrell@gmail.com',
      password: 'rg0'
    });
  }
};

const updateState = (key) => (result) => {
  state[key] = result;
  return Promise.resolve(result);
};

const onServiceInit = (serviceState) => function (serviceName) {
  client.service(serviceName).find({})
    .then(updateState(serviceState))
    .catch(this.onError);
};

const onServiceCreated = (serviceState) => (item) => {
  state[serviceState].data.push(item);
  return item;
};

const onServicePatched = (serviceState) => (item) => {
  const index = state[serviceState].data.findIndex(x => x.id == item.id);
  Vue.set(state[serviceState].data, index, item);
  return item;
};

const onServiceUpdated = (serviceState) => (item) => {
  const index = state[serviceState].data.findIndex(x => x.id == item.id);
  Vue.set(state[serviceState].data, index, item);
  return item;
};

const onServiceRemoved = (serviceState) => (item) => {
  const index = state[serviceState].data.findIndex(x => x.id == item.id);
  state[serviceState].data.splice(index, 1);
  return item;
};

const syncService = (serviceState) => ({
  init: onServiceInit(serviceState),
  created: onServiceCreated(serviceState),
  patched: onServicePatched(serviceState),
  updated: onServiceUpdated(serviceState),
  removed: onServiceRemoved(serviceState),
});

function componentModal(component, props) {
  return function() {
    this.$buefy.modal.open({
      parent: this,
      component: component,
      hasModalCard: true,
      trapFocus: true
    })
  }
}

export {
  state,
  client,
  login,
  updateState,
  syncService,
  onServiceInit,
  onServiceCreated,
  onServicePatched,
  onServiceUpdated,
  onServiceRemoved,
  componentModal
};
