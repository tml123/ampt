<template>
  <v-layout>
    <v-navigation-drawer
      fixed
      right
      permanent
      dark
      app
    >
    <v-list>
      <v-list-tile
        avatar
        v-for="sat in sats"
        v-bind:key="sat._id">
        <v-list-tile-action>
          <v-checkbox v-model="sat.isChecked" @change="handleSatChange(sat._id)"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{sat._id}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-content>
      <CesiumVue :handler="cesiumBus" :viewer-options="viewerOptions"/>
    </v-content>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import CesiumVue from './CesiumVue';

export default {
  name: 'GlobeView',
  data() {
    this.cesiumBus = new Vue();
    return {
      viewerOptions: {
        automaticallyTrackDataSourceClocks: true,
      },
      cesiumBus: this.cesiumBus,
      drawer: null,
      drawerRight: null,
      right: null,
      left: null,
      sats: [
        { _id: 'SAT1', isChecked: false },
        { _id: 'SAT2', isChecked: false },
        { _id: 'SAT3', isChecked: false },
        { _id: 'SAT4', isChecked: false },
        { _id: 'SAT5', isChecked: false },
        { _id: 'SAT6', isChecked: false },
        { _id: 'SAT7', isChecked: false },
        { _id: 'SAT8', isChecked: false },
        { _id: 'SAT9', isChecked: false },
      ],
    };
  },
  methods: {
    handleSatChange(satId) {
      fetch('http://localhost:8000/api/1.0/orbit/ground_track/' + satId + '/1496275200000/1496361599000')
        .then((response) => {
          this.cesiumBus.$emit('NEW_CZML', response.json());
        });
    },
  },
  components: { CesiumVue },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
