<template>
    <div>
        good
        <el-button @click="set">设置cookie</el-button>
        <el-button @click="get">读取cookie</el-button>
        <el-button @click="remove">删除cookie</el-button>
    </div>
</template>
<script setup>
 import { useCookies } from '@vueuse/integrations/useCookies'

 const cookie = useCookies()

function set(){
    cookie.set("admin-token","1234")
}
function get(){
    console.log(cookie.get("admin-token"))
}
function remove(){
    cookie.set("admin-token")
}
</script>