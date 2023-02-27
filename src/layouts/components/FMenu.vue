<template>
  <div class="f-menu">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
    >
      <template v-for="(item,index) in asideMenus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter()
import {Help, ShoppingBag, ShoppingCartFull, HomeFilled} from "@element-plus/icons-vue";

const asideMenus = [
  {
    "name": "数据图表",
    "icon": "help",
    "child": [{
      "name": "主控台",
      "icon": "home-filled",
      "frontpath": "/",
    }]
  }, {
    "name": "任务管理",
    "icon": "shopping-bag",
    "child": [{
      "name": "所有任务",
      "icon": "shopping-cart-full",
      "frontpath": "/goods/list",
    }, {
      "name": "运行任务",
      "icon": "shopping-cart-full",
      "frontpath": "/goods/list",
    },
     {
      "name": "失败任务",
      "icon": "shopping-cart-full",
      "frontpath": "/goods/list",
    }]
  },
  {
    "name": "参数管理",
    "icon": "shopping-bag",
    "child": [{
      "name": "物种管理",
      "icon": "shopping-cart-full",
      "frontpath": "/goods/list",
    },
      {
        "name": "产品管理",
        "icon": "shopping-cart-full",
        "frontpath": "/goods/list",
      },
      {
        "name": "参考基因组管理",
        "icon": "shopping-cart-full",
        "frontpath": "/goods/list",
      }
    ]
  }
]
const handleSelect = (e) => {
  router.push(e)
}
</script>

<style scoped>
.f-menu {
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;
  @apply shadow-md fixed bg-light-50;
}
</style>