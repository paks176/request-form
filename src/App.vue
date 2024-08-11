<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(['getAuthStatus'])
  },
  mounted() {
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
