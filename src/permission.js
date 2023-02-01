import router from "~/router"
import  { getToken } from '~/composables/auth'
import { toast ,showFullLoading,hiddenFullLoading } from './composables/util'
import store from "./store"
// 全局 前置守卫

router.beforeEach(async(to, from, next) => {
    // 显示loading
    showFullLoading()
    // to and from are both route objects. must call `next`.
    const token = getToken()
    // 没有登录去登录页面
    if(!token && to.path!="/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }
    // 防止重复登录

    if(token && to.path=="/login"){
        return next({path:from.path?from.path:"/"})
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex当中
    if(token){
        await store.dispatch("getinfo")
    }
    next()
})

router.afterEach((to,from)=>{
    hiddenFullLoading()
})