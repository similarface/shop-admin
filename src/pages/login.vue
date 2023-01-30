<template>
  <!--  “vh”是css中的一个相对长度单位，是相对于视窗的高度 100vh”就是指元素的高度等于当前浏览器的视窗高度，即浏览器内部的可视区域的高度大小-->
  <!--  <el-row style="min-height: 100vh;" class="bg-pink-500">-->
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临。。。</div>
        <div>Vue+vite balalala</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码</span>
        <span class="line"></span>
      </div>
      <el-form ref="refForm" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="w-[250px]" :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import { User, Lock, Failed } from "@element-plus/icons-vue";
import { login, getinfo } from "~/api/manager"
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
// import { useCookies } from '@vueuse/integrations/useCookies'
import { setToken } from "~/composables/auth"
import { toast } from "~/composables/util";
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const loading=ref(false)
// import { FormRules } from 'element-plus'

// do not use same name with ref

const refForm = ref(null);
const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "用户名非空", trigger: "blur" },
    { min: 3, max: 15, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [{ required: true, message: "密码非空", trigger: "blur" }],
};


const onSubmit = () => {
  refForm.value.validate((valid)=>{
    if(!valid){
      return false
    }
    loading.value = true
    login(form.username, form.password).then(res=>{
      // 提示成功
      toast("登录成功")
      // ElNotification({
      //   title: '',
      //   message: "登录成功",
      //   type: 'success',
      //   duration:3000
      // })
      // 存储token 和用户相关信息
      // const cookie = useCookies()
      // console.log(cookie)
      // cookie.set("admin-token", res.token)
      setToken(res.token)

      // 获取用户相关信息
      getinfo().then((res2)=>{
        store.commit("SET_USERINFO", res2)
        console.log(res2)
      })
      // 跳转到首页
      router.push("/")
    }).finally( ()=>{
      loading.value=false 
    })
    console.log(valid.data)
  })
  console.log("submit!");
};
</script>
<style scope>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply flex-col bg-light-500;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-400 text-4xl;
}
.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>