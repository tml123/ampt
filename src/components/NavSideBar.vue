<template>
  <v-navigation-drawer
    :mini-variant="mini"
    fixed
    permanent
    dark
    clipped
    app
  >
    <v-toolbar dark>
      <v-list class="pt-0" dense>
        <v-list-tile>
          <v-list-tile-action>
            <router-link to="/"><v-icon>home</v-icon></router-link>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!--<v-btn flat icon color="pink" @click.stop="mini = !mini">
          <v-icon>chevron_right</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <router-link to="/telemetry-monitor">
            <v-icon>insert_chart</v-icon>
          </router-link>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Telemetry Monitor</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <router-link to="/world-view"><v-icon>public</v-icon></router-link>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Globe</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavSideBar',
  data() {
    return {
      mini: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li a {
  text-decoration: none;
  }
</style>
