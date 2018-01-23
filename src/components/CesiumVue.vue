<template>
  <div id='cesiumContainer'></div>
</template>

<script>
import Cesium from 'cesium/Cesium';

require('cesium/Widgets/widgets.css');

export default {
  name: 'CesiumVue',
  props: {
    viewerOptions: {
      type: Object,
      function() {
        return {};
      },
    },
    handler: {
      type: Object,
      function() {
        return {};
      },
    },
  },
  mounted() {
    if (this.viewerOptions){
      this.viewer = new Cesium.Viewer('cesiumContainer', this.viewerOptions);
    }
    else {
      this.viewer = new Cesium.Viewer('cesiumContainer');
    }
    this.handler.$on('NEW_CZML', (czml) => {
      this.viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cesiumContainer {
  min-height: 100vh;
}
</style>
