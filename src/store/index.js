import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: true,
    },
    actions: {
        sendAuthRequest(context, body) {
            return axios.post(
                'https://dev.moydomonline.ru/api/auth/login/',
                body,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                if (response.status === 200) {
                    context.commit("setAuthorized", true);
                }
            }).catch(error => {
                context.commit("setAuthorized", false);
                console.log(error)
            })
        }
    },
    mutations: {
        setAuthorized(state, authorized) {
            state.authorized = authorized;
        }
    },
    getters: {
        getAuthStatus: state => {
            return state.authorized;
        }
    }
});