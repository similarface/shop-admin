import router from "~/router"
import  { getToken } from '~/composables/auth'
import { toast  } from './composables/util'

// 全局 前置守卫

router.beforeEach((to, from, next) => {
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


    next()
})