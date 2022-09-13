import Vue from 'vue'

import VJsoneditor from 'v-jsoneditor'
import VueKonva from 'vue-konva';

import { 
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow
} from 'vue-dataset'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from './router'
import {
  client,
  login,
  state
} from './state'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueKonva);
Vue.use(VJsoneditor);
Vue.use(window['vue-swatches']);

Vue.component('Dataset', Dataset)
Vue.component('DatasetItem', DatasetItem)
Vue.component('DatasetInfo', DatasetInfo)
Vue.component('DatasetPager', DatasetPager)
Vue.component('DatasetSearch', DatasetSearch)
Vue.component('DatasetShow', DatasetShow)

Vue.mixin({
  created() {
    this.$client = client;
    this.$services = client.services;
    if (!this.$options.services) return;
    for (const name of Object.keys(this.$options.services)) {
      const service = this.$options.services[name];
      for (const ev of Object.keys(service)) {
        if (ev === 'init') client.service(name).find({}).then(service.init(name));
        client.service(name).on(ev, service[ev].bind(this));
      }
    }
  },
  beforeDestroy() {
    if (!this.$options || !this.$options.services) return;
    for (const name of Object.keys(this.$options.services)) {
      const service = this.$options.services[name];
      for (const ev of Object.keys(service)) {
        if (ev === 'init') continue;
        client.service(name).removeListener(ev, service[ev].bind(this));
      }
    }
  }
});

Vue.mixin({
  data: function () {
    return {
      editorOptions: {
        mainMenuBar: false,
        navigationBar: false
      }
    }
  },
})

Vue.mixin({
  methods: {
    onError: function (err) {
      console.error(err);
    },
    $log: function (...args) {
      console.log(...args);
    },
  },
})

let auth = {};

window.root = new Vue({
  data: {
    state,
    auth
  },
  render: h => h(App),
  router,
  created: async () => {
    auth = await login();
    state.user = auth.user;
    console.log('User is authenticated', auth.user);
  }
}).$mount('#app');


