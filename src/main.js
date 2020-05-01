import Vue from 'vue'
import App from './App.vue'
//import Autocomplete from 'v-autocomplete'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
//import 'v-autocomplete/dist/v-autocomplete.css'

//Vue.use(Autocomplete)
import VueAutosuggest from "vue-autosuggest";
import VueRouter from 'vue-router';
import Ark from "./components/Ark";
import Filter from "./components/Filter";
import Links from "./components/Links";
import ServerList from "./components/ServerList";

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import Recipe from "./components/Recipe";
import Boss from "./components/Boss";
Vue.use(Vuesax, {
	// options here
})

Vue.use(VueAutosuggest);
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	routes : [
		{ path: '/', component: Filter, name: 'filter' },
		{path : '/taming', component: Ark, name : 'taming'},
		{path : '/links', component: Links, name : 'links'},
		{path : '/boss', component: Boss, name : 'boss'},
		{path : '/recipe', component: Recipe, name : 'recipe'},
		{path : '/server', component: ServerList, name : 'server'}
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

