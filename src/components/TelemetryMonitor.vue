<template>
  <v-container grid-list-md>
    <v-card color="grey lighten-4" flat>
      <v-toolbar color="white" light dense>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Telemetry Monitor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in ['SAT1', 'SAT2', 'SAT3', 'SAT4']" :key="item">
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
    <v-layout row>
      <v-flex xs6>
        <v-card class="pa-1">
          <VueC3 :options="solarHealthBus"></VueC3>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="pa-1">
          <VueC3 :options="data2"></VueC3>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <v-card class="pa-1">
          <VueC3 :options="cmgBus"></VueC3>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="pa-1">
          <VueC3 :options="voltageBus"></VueC3>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueC3 from './Graph';

export default {
  name: 'TelemetryMonitor',
  data() {
    this.eventBus2 = new Vue({
      data: {
        data: {
          data: {
            columns: [
              ['Yaw', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150],
              ['Pitch', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150],
              ['Roll', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150],
            ],
          },
          axis: {
            x: {
              label: 'Time',
              position: 'outer-center',
            },
            y: {
              label: 'Power',
              position: 'outer-middle',
            },
          },
        },
      },
    });

    this.cmgBus = new Vue({
      data: {
        data: {
          data: {
            columns: [
              ['RPM', 2000, 2005, 2990, 2898, 3000, 2500, 2600, 2789, 2730, 2700, 3000, 2100, 2200, 2150],
            ],
          },
          axis: {
            x: {
              label: 'Time',
              position: 'outer-center',
            },
            y: {
              label: 'RPM',
              position: 'outer-middle',
            },
          },
        },
      },
    });

    this.voltageBus = new Vue({
      data: {
        data: {
          data: {
            columns: [
              ['Voltage', 1000, 999, 998, 1000, 1000, 1000, 1000, 1000, 999, 997, 995, 1000, 999, 999, 998, 998, 998, 1000],
            ],
          },
          axis: {
            x: {
              label: 'Time',
              position: 'outer-center',
            },
            y: {
              label: 'Voltage',
              position: 'outer-center',
            },
          },
        },
      },
    });

    this.solarHealthBus = new Vue({
      data: {
        data: {
          data: {
            columns: [
              ['Health', 91.4],
            ],
            type: 'gauge',
          },
          color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
              values: [30, 60, 90, 100],
            },
          },
        },
      },
    });

    return {
      solarHealthBus: this.solarHealthBus,
      data2: this.eventBus2,
      voltageBus: this.voltageBus,
      cmgBus: this.cmgBus,
    };
  },
  components: { VueC3 },
  methods: {
    randomizeYPR() {
      const ypr = [
        Math.floor(Math.random() * Math.floor(Math.random() * 400)),
        Math.floor(Math.random() * Math.floor(Math.random() * 400)),
        Math.floor(Math.random() * Math.floor(Math.random() * 400)),
      ];
      const flowData = {
        columns: [
          ['Yaw', ypr[0]],
          ['Pitch', ypr[1]],
          ['Roll', ypr[2]],
        ],
      };
      this.eventBus2.$emit('FLOW_DATA', flowData);
      return flowData;
    },
    randomizeCMG() {
      const cmg = 2000 - Math.floor(Math.random() * 2000);
      const flowData = {
        columns: [['RPM', 3000 - cmg]],
      };
      this.cmgBus.$emit('FLOW_DATA', flowData);
      return flowData;
    },
    randomizeBatteryVoltage() {
      const voltage = [
        'Voltage',
        Math.floor(1000 - Math.floor((Math.random() * 10))),
      ];
      const flowData = {
        columns: [voltage],
      };
      this.voltageBus.$emit('FLOW_DATA', flowData);
      return voltage;
    },
    randomizeSolarHealth() {
      const health = [
        'Health',
        Math.floor(100 - Math.floor((Math.random() * 50))),
      ];
      const flowData = {
        columns: [health],
      };
      this.solarHealthBus.$emit('LOAD', flowData);
    },
  },
  mounted() {
    setInterval(this.randomizeYPR, 5000);
    setInterval(this.randomizeCMG, 5000);
    setInterval(this.randomizeBatteryVoltage, 5000);
    setInterval(this.randomizeSolarHealth, 5000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
