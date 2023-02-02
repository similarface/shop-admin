import {createRouter, createWebHashHistory} from "vue-router";


import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Base from '~/layouts/base.vue'
// 定义路由

const routes = [
    {
        path: "/",
        component: Base,
        children:[
            {
                path:"/",
                component:Index,
                media:{
                    title:"后台首页"
                }
            }
        ]
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router