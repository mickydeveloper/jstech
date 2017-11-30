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
    },
    settingsTabResponse(state){
      return state.settings
    },
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
            Vue.http.get("https://api.myjson.com/bins/rdlx7").then((response) => {
                commit("FETCH_RECENT", response.body);
                resolve();
            })
            .catch((error => {
                console.log(error.statusText);
            }));
        });
    },
    postRecent(context) {
        console.log("posted recent back to server")
        /* Can post this data back to the API with post request or just pass the changed object into the method to only post the change
        console.log(this.state.recent)*/
    },
    postSettings(context) {
        console.log("posted settings back to server")
        /* Can post this data back to the API with post request or just pass the changed object into the method to only post the change
        console.log(this.state.settings)*/
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
