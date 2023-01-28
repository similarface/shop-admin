<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
<style scoped>
.btn {
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-full transition-all hover:( bg-purple-900 ) focus:( ring-8 );
}
</style>