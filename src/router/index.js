import Vue from 'vue';
import store from '@/store';
import {Modal} from 'bootstrap';

const routes = [
    {
        name: '404',
        path: '*',
        component: () => import('../components/PageError404.vue'),
    },
    {
        name: 'Requests',
        path: '/',
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

router.beforeEach((to, from, next) => {
    if (!store.getters.getAuthStatus && to.name !== 'Login') {
        next({
            name: 'Login',
            replace: true
        })
    } else {
        const authModal = Modal.getInstance('#auth-modal');
        if (authModal) {
            authModal.hide();
        }
        setTimeout(() => {
            next();
        }, 1000)
    }
})

Vue.use(VueRouter);

export default router;