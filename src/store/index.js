import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false,
        authData: '',
        list: null,
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
                    context.commit("encodeAuthData", `${body.username}:${body.password}`);
                }
            }).catch(error => {
                context.commit("setAuthorized", false);
                console.log(error)
            })
        },
        sendAppealsRequest(context) {
            return axios.get(
                'https://dev.moydomonline.ru/api/appeals/v1.0/appeals/',
                {
                    headers: {'Authorization' : `Basic ${context.state.authData}`},
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                        context.commit("setList", response.data);
                    }
                })
        }
    },
    mutations: {
        setAuthorized(state, authorized) {
            state.authorized = authorized;
        },
        encodeAuthData(state, data) {
            state.authData = Vue.prototype.$bytesToBase64(new TextEncoder().encode(data));
        },
        setList(state, list) {
            state.list = list;
        }
    },
    getters: {
        getAuthStatus: state => {
            return state.authorized;
        },
        decodeAuthData: state => {
            return new TextDecoder().decode(Vue.prototype.$base64ToBytes(state.authData));
        },
        getList: state => {
            return state.list
        },
    }
});