export default {
    install(Vue) {
        Vue.prototype.$bytesToBase64 = function (bytes) {
            const binString = Array.from(bytes, (byte) =>
                String.fromCodePoint(byte),
            ).join("");
            return btoa(binString);
        }
    }
}