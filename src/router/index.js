import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/Home';
import NavSideBar from '../components/NavSideBar';
import TelemetryMonitor from '../components/TelemetryMonitor';
import VueC3 from '../components/Graph';
import CesiumVue from '../components/CesiumVue';
import GlobeView from '../components/GlobeView';

Vue.use(CesiumVue);
Vue.use(VueC3);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        contentview: HomePage,
        sidebar: NavSideBar,
      },
    },
    {
      path: '/telemetry-monitor',
      components: {
        contentview: TelemetryMonitor,
        sidebar: NavSideBar,
      },
    },
    {
      path: '/world-view',
      components: {
        contentview: GlobeView,
        sidebar: NavSideBar,
      },
    },
  ],
});
