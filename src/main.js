import Vue from 'vue'
import App from './App.vue'
import Autocomplete from 'v-autocomplete'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(Autocomplete)

import VueAutosuggest from "vue-autosuggest";
Vue.use(VueAutosuggest);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

