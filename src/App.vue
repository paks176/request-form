<template>
  <div id="app">
    <Component :is="currentComponent"/>
  </div>
</template>

<script>
import AuthPage from './components/AuthPage.vue';
import RequestsList from './components/RequestsList.vue';
import { mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    AuthPage,
    RequestsList
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
      this.currentComponent = RequestsList;
    } else {
      this.currentComponent = AuthPage;
    }
  }
}
</script>

<style>
</style>
