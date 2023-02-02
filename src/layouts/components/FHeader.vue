<template>
  <div>
    <div class="f-header">
      <span class="logo">
        <el-icon class="mr-1"><eleme-filled /></el-icon>
        帝莎编程
      </span>
      <el-icon><fold /></el-icon>
      <el-icon><refresh /></el-icon>
      <div>
        <el-icon><full-screen /></el-icon>
        <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FHeader"
}
</script>

<style scoped>
.f-header{
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
</style>