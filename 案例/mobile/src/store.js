import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from 'pages/home/store/'

export default new Vuex.Store({
  Module:{
  	home:home
  }
})
