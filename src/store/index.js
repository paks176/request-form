import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false,
    },
    actions: {
    },
    mutations: {
    },
    getters: {
        getAuthStatus: state => {
            return state.authorized;
        }
    }
});