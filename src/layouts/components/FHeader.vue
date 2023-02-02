<template>
  <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled/></el-icon>
            快乐编程
        </span>
    <el-icon class="icon-btn">
      <Fold/>
    </el-icon>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="全屏"
          placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen"/>
          <aim v-if="isFullscreen"/>
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
            <el-dropdown-item command="resetPassWord">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


  <form-drawer
      ref="formDrawerRef"
      title="修改密码"
      destroyOnClose
      @submit="onSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" placeholder="请再次输入密码"></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import {Fold, Refresh, ArrowDown, FullScreen, Aim, ElemeFilled} from "@element-plus/icons-vue";
import {logout} from '~/api/manager'
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue"
import {useResetPassword, useLogout} from "~/composables/userManager.js";
const {formDrawerRef, formRef, form, rules, onSubmit, openRestPassword} = useResetPassword()
const {handleLogout} = useLogout()

//全屏
const {
  isFullscreen, // 是否全屏
  toggle  //切换全屏
} = useFullscreen()


const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout()
      break
    case "resetPassWord":
      openRestPassword()
      break
  }
}

// 刷新
const handleRefresh = () => location.reload()

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