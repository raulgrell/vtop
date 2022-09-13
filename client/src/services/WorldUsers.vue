<template>
  <div class="card world-users-service">
    <div class="card-content">
      <h3 class="subtitle">Users</h3>
      <table v-if="worldUsers" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th><abbr title="User Name">Name</abbr></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="user in worldUsers.data" :key="user.id" v-on:click="selection = user">
            <th>{{ user.user_id }}</th>
            <td>{{ user.user_data.name }}</td>
          </tr>
        </tbody>
      </table>
      </button>
    </div>
    <div v-if="showUserTokenInfo">
      <v-jsoneditor v-model="selection" :options="editorOptions" :plus="false" height="100%" @error="onError">
      </v-jsoneditor>
      <button class="button is-small" v-on:click="selection = {}">
        Hide
      </button>
    </div>
  </div>
  </div>
</template>

<script>

import { isEmpty } from "@/fx.js";

export default {
  name: 'WorldUsers',
  data() {
    return {
      selection: {}
    }
  },
  props: {
    worldUsers: Object,
  },
  computed: {
    showUserTokenInfo() {
      return isEmpty(this.selection)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>