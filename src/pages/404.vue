<template>
    <el-row>
    <el-col :sm="12" :lg="6">
      <el-result
        icon="warning"
        title="404 Tip"
        sub-title="你找的页面不存在。。。"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>