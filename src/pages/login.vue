<template>
  <!--  “vh”是css中的一个相对长度单位，是相对于视窗的高度 100vh”就是指元素的高度等于当前浏览器的视窗高度，即浏览器内部的可视区域的高度大小-->
  <!--  <el-row style="min-height: 100vh;" class="bg-pink-500">-->
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :span="16" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临。。。</div>
        <div class="text-gray-400 text-4xl">Vue+vite balalala</div>
      </div>
    </el-col>
    <el-col :span="8" class="flex items-center justify-center flex-col bg-light-500">
      <h2 class="font-bold tet-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form :model="form" class="w-[250px]">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="w-[250px]">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive} from 'vue'

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>