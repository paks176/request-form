import Vue from 'vue';
import store from '@/store';

const routes = [
    {   
        name: '404',
        path: '*',
        component: () => import('../components/PageError404.vue'),
    },
    {   
        name: 'Requests',
        path: '/requests',
        component: () => import('../components/RequestsList.vue'),
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../components/AuthPage.vue'),
    }
];

import VueRouter from "vue-router";

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to,from, next) => {
    if (!store.getters.getAuthStatus && to.name !== 'Login') {
        next({
            name: 'Login',
            replace: true
        })
    } else {
        next();
    }
})

Vue.use(VueRouter);

export default router;