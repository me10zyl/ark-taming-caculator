import Vue from 'vue'
import App from './App.vue'
import Autocomplete from 'v-autocomplete'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(Autocomplete)

import VueAutosuggest from "vue-autosuggest";
import VueRouter from 'vue-router';
import Ark from "./components/Ark";

Vue.use(VueAutosuggest);
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
	routes : [
		{ path: '/', component: Ark }
	]
})

new Vue({
	el: '#app',
	router : router,
	render: h => h(App),
    data : {
      pageTitle : 'yilnz\'s 方舟工具'
    }
});

