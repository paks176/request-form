import Vue from 'vue';

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

// router.afterEach((to, from) => {
//     if (!store.getters.getAuthStatus) {
//         router.replace({
//             name: 'Login',
//         })
//     } else {
//         const authModal = Modal.getInstance('#auth-modal');
//         if (authModal) {
//             authModal.hide();
//         }
//         setTimeout(() => {
//             router.replace({
//                 name: 'Requests',
//                 query: {
//                     page: "1",
//                     page_size: "10",
//                 }
//             })
//         }, 500)
//     }
// });


Vue.use(VueRouter);

export default router;