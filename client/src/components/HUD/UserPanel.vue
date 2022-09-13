<template>
  <div class="user-panel">
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
          <p class="card-header-title">
            Users
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <button v-for="user in worldUsers.data" :key="user.id" v-on:click="selectedUserToken = user"
          class="button is-small">
          {{ user.user_data.name }}
        </button>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="worldUsersModal">Admin</a>
      </footer>
    </b-collapse>
  </div>
</template>

<script>

import WorldUsersVue from "@/services/WorldUsers.vue";

export default {
  name: 'UserPanel',
  data() {
    return {
      selectedUserToken: {}
    }
  },
  methods: {
    worldUsersModal() {
      this.$buefy.modal.open({
        parent: this,
        component: WorldUsersVue,
        props: { worldUsers: this.$props.worldUsers },
        hasModalCard: true,
        trapFocus: true
      });
    }
  },
  props: {
    worldUsers: Object,
  },
  computed: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>