<template>
    <div class="c3-chart"></div>
</template>

<script>
import c3 from 'c3';

export default {
  name: 'VueC3',
  props: {
    options: {
      type: Object,
      function() {
        return {};
      },
    },
  },
  mounted() {
    this.options.data.bindto = this.$el;
    this.$chart = c3.generate(this.options.data);
    this.options.$on('FLOW_DATA', (data) => {
      this.$chart.flow(data);
    });
    this.options.$on('LOAD', (data) => {
      this.$chart.load(data);
    });
  },
  beforeDestroy() {
    this.$chart.destroy();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
