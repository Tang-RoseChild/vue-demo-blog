import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const SET_USER_MUTATION = 'setUser'
export const SET_BLOG_MUTATION = 'setBlog'
export const SET_TOKEN_MUTATION = 'setToken'

const store = new Vuex.Store({
  state: {
    user: {
      mobile: '',
      name: '',
      avatar: ''
    },
    blog: null,
    token: ''
  },
  mutations: {
    [SET_USER_MUTATION] (state, payload) {
      state.user = {...payload}
    },
    [SET_BLOG_MUTATION] (state, payload) {
      state.blog = {...payload}
    },
    [SET_TOKEN_MUTATION] (state, payload) {
      state.token = payload
    }
  },
  getters: {
    isAdmin (state) {
      return state.user.mobile.length
    }
  }
})

export default store
