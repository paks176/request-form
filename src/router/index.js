import Vue from 'vue';
// import Store from '@/store/index'

const routes = [
    {
        path: '*',
        component: () => import('../components/PageError404.vue'),
    }

];

import VueRouter from "vue-router";

const router = new VueRouter({
    mode: 'history',
    routes
});

// router.beforeEach((to, from, next) => {
//     Store.dispatch('getInfoAboutMe')
//         .then(() => {next()})
// })

Vue.use(VueRouter);

export default router;