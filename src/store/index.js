import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false,
    },
    actions: {
        sendAuthRequest(context, body) {
            axios.post('https://dev.moydomonline.ru/api/auth/login/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response.status === 200) {
                    context.commit("setAuthorized", true);
                } else {
                    context.commit("setAuthorized", false);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mutations: {
        setAuthorized (state, authorized) {
            state.authorized = authorized;
        }
    },
    getters: {
        getAuthStatus: state => {
            return state.authorized;
        }
    }
});