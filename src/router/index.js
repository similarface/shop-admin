import { createRouter, createWebHashHistory } from "vue-router";


import Index from '~/pages/index.vue'

// 定义路由

const routes = [
    {path: "/", 
    component: Index}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router