<template>
  <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled/></el-icon>
            快乐编程
        </span>
    <el-tooltip effect="dark" content="折叠" placement="bottom">
      <el-icon class="icon-btn">
        <Fold/>
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen"/>
          <aim v-else/>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"/>
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-drawer v-model="showDrawer"
             title="修改密码"
             size="45%"
             close-on-click-modal="false"
  >
    <el-form ref="refForm" :model="form" :rules="rules" >
      <el-form-item prop="oldpassword" label="旧密码" label-width="80px" size="small">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码" label-width="80px" size="small">
        <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码" label-width="80px" size="small">
        <el-input
            v-model="form.repassword"
            placeholder="请输入确认密码"
            type="password"
            show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="w-[250px]" :loading="loading"
        >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import {Fold, Refresh, ArrowDown, FullScreen, Aim} from "@element-plus/icons-vue";
import {ref,reactive} from 'vue'
import {showModal, toast} from "~/composables/util"
import {logout, updatepassword} from '~/api/manager'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {useFullscreen} from '@vueuse/core'
const {isFullscreen, enter, exist, toggle} = useFullscreen()
const router = useRouter()
const store = useStore()
// 修改密码部分
const showDrawer=ref(false)
const loading=ref(false)
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout()
      break
    case "rePassword":
      showDrawer.value = true
      break
  }
}

const refForm = ref(null);
const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

const rules = {
  oldpassword: [{ required: true, message: "旧密码非空", trigger: "blur" }],
  password: [{ required: true, message: "密码非空", trigger: "blur" }],
  repassword: [{ required: true, message: "确认密码非空", trigger: "blur" }],
};


const onSubmit = () => {
  refForm.value.validate((valid)=>{
    if(!valid){
      return false
    }
    loading.value = true
    updatepassword(form)
        .then(res=>{
          toast("修改密码成功，请重新登录")
          store.dispatch("logout")
          router.push("/login")
        })
        .finally(()=>{
          loading.value=false
        })
  })
};





// 刷新
const handleRefresh = () => location.reload()

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
</script>
<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>