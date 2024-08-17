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
        premisesAutocomplete: [],
        apartmentAutocomplete: [],
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
            return axios.get(
                `https://dev.moydomonline.ru/api/appeals/v1.0/appeals${queryParams}`,
                {
                    headers: {"Authorization": `Basic ${context.state.authData}`},
                })
                .then(response => {
                    if (response.status === 200) {
                        context.commit("setAppealsData", response.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
        },

        sendPremisesRequest(context) {
            return axios.get(
                'https://dev.moydomonline.ru/api/geo/v2.0/user-premises/',
                {
                    headers: {"Authorization": `Basic ${context.state.authData}`},
                })
                .then(response => {
                    if (response.status === 200) {
                        context.commit("setPremises", response.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
        },

        sendPremisesAutocompleteRequest(context, request) {
            if (request) {
                axios.get('https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=' + request,
                    {
                        headers: {"Authorization": `Basic ${context.state.authData}`},
                    })
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data?.results.length) {
                                context.commit("setPremisesAutocomplete", response.data.results);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                setTimeout(() => {
                    context.commit("setPremisesAutocomplete", []);
                }, 1000)
            }
        },
        
        sendApartmentAutocompleteRequest(context, { apartment, premise }) {
            if (premise) {
                axios.get(`https://dev.moydomonline.ru/api/geo/v1.0/apartments/?premise_id=${premise}&search=${apartment}`, 
                    {
                        headers: {"Authorization": `Basic ${context.state.authData}`},
                    })
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data?.results.length) {
                                context.commit("setApartmentAutocomplete", response.data.results);
                            }
                        }
                    })
                    .catch(error => {
                    console.log(error);
                })
            }
        },
        
        changeAppeal(context, body) {
            body.due_date = new Date(body.due_date).toISOString();
            
            if (body.appeal_id) {
                return axios.patch(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals/${body.appeal_id}/`, body,
                    {
                        headers: {"Authorization": `Basic ${context.state.authData}`}
                    })
                    .then(response => {
                        if (response.status === 200) {
                            return response.data;
                        }
                    })
                    .catch(error => {
                    console.log(error);
                })
            }
        }
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
        },
        setPremisesAutocomplete(state, data) {
            state.premisesAutocomplete = data;
        },
        setApartmentAutocomplete(state, data) {
            state.apartmentAutocomplete = data;
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
        },
        getPremisesAutocomplete: state => {
            return state.premisesAutocomplete;
        },
        getApartmentAutocomplete: state => {
            return state.apartmentAutocomplete;
        },
    }
});