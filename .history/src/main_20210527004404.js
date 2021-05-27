import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import JsonExcel from "vue-json-excel";

// Vue.component("downloadExcel", JsonExcel);
// use
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')