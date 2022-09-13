<template>
  <div id="app">
    <router-view>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/account">Account</router-link> |
        <router-link to="/game">Game</router-link> |
        <router-link to="/editor">Editor</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div>
    </router-view>
  </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {};
</script>
