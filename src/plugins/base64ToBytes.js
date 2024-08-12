export default {
    install(Vue) {
        Vue.prototype.$base64ToBytes = function(base64) {
            const binString = atob(base64);
            return Uint8Array.from(binString, (m) => m.codePointAt(0));
        }
    }
}