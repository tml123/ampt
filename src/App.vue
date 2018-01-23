<template>
  <v-app id="app">
    <router-view class="view" name="sidebar"></router-view>
    <router-view class="view" name="contentview"></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
