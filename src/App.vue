<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import router from "@/router";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      currentComponent: null,
    }
  },
  methods: {
    ...mapMutations(["pushNewToast"]),
  },
  computed: {
    ...mapGetters(['getAuthStatus', 'getErrorsStack'])
  },
  watch: {
    getErrorsStack() {
      this.$toast.processNew(this.getErrorsStack[0])
    }
  },
  mounted() {
    this.pushNewToast({
      header: 'Здесь будут выводиться ошибки и другие сообщения',
      text: 'Это самодельный плагин'
    })
    if (this.getAuthStatus) {
      router.push({name: 'Requests'});
    } else {
      router.push({name: 'Login'});
    }
  }
}
</script>

<style>
</style>
