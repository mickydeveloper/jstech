import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
      recent: [],
      settings: []
  },
  getters: {
    recentTabResponse(state){
      return state.recent
    }
  },
  mutations: {
    FETCH_RECENT(state, recent) {
        state.recent = recent
    },
    FETCH_SETTINGS(state, settings) {
        state.settings = settings
    }
  },
  actions: {
    fetchRecent({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get("https://api.myjson.com/bins/10qr9n").then((response) => {
                commit("FETCH_RECENT", response.body);
                resolve();
            })
            .catch((error => {
                console.log(error.statusText);
            }));
        });
    },
    fetchSettings({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get("https://api.myjson.com/bins/9y91n").then((response) => {
                commit("FETCH_SETTINGS", response.body);
                resolve();
            })
            .catch((error => {
                console.log(error.statusText);
            }));
        });
    }
  }
})
