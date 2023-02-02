import {reactive, ref} from "vue";
import {showModal, toast} from "~/composables/util.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {logout} from "~/api/manager.js";

export  function  useLogout(){
    const router = useRouter()
    const store = useStore()

    function handleLogout() {
        showModal("是否要退出登录").then(res => {
            logout()
                .finally(() => {
                    store.dispatch("logout")
                    router.push("/login")
                    toast("退出登录成功")
                })
        })
    }
    return {handleLogout}
}
export function useResetPassword() {

    const router = useRouter()
    const store = useStore()
    // 修改密码
    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }

    const openRestPassword = () => {
        formDrawerRef.value.open()
    }
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            resetPassword(form).then(res => {
                toast("修改密码成功，请重新登录")
                store.dispatch("logout")
                // 跳转回登录页
                router.push("/login")
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }

    return {formDrawerRef, formRef, form, rules, onSubmit, openRestPassword}
}