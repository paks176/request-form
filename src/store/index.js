import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false,
        authData: "",
        appealsData: {},
        premisesData: {},
    },
    actions: {
        sendAuthRequest(context, body) {
            return axios.post(
                "https://dev.moydomonline.ru/api/auth/login/",
                body,
                {
                    headers: {"Content-Type": "multipart/form-data"}
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
        
        sendAppealsRequest(context, params) {
            const queryParams = params ? "?" + (new URLSearchParams(params)).toString() : "";
            return fetch(
                `https://dev.moydomonline.ru/api/appeals/v1.0/appeals${queryParams}`,
                {   
                    method: "GET",
                    headers: { "Authorization" : `Basic ${context.state.authData}` },
                })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                            .then(data => {
                                context.commit("setAppealsData", data);
                            })
                    }
                }).catch(error => {
                    console.log(error);
                })
        },

        sendPremisesRequest(context) {
            return fetch(
                'https://dev.moydomonline.ru/api/geo/v2.0/user-premises/',
                {
                    method: "GET",
                    headers: { "Authorization" : `Basic ${context.state.authData}` },
                })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                            .then(data => {
                                context.commit("setPremises", data);
                            })
                    }
                }).catch(error => {
                    console.log(error);
                })
        },
    },
    mutations: {
        setAuthorized(state, authorized) {
            state.authorized = authorized;
        },
        encodeAuthData(state, data) {
            state.authData = Vue.prototype.$bytesToBase64(new TextEncoder().encode(data));
        },
        setAppealsData(state, data) {
            state.appealsData = data;
        },
        setPremises(state, data) {
            state.premisesData = data;
        }
    },
    getters: {
        getAuthStatus: state => {
            return state.authorized;
        },
        decodeAuthData: state => {
            return new TextDecoder().decode(Vue.prototype.$base64ToBytes(state.authData));
        },
        getAppealsList(state) {
            return state.appealsData;
        },
        getPremisesData: state => {
            return state.premisesData;
        }
    }
});