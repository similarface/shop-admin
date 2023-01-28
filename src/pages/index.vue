<template>
    <div>
        good {{count}}
        <el-button @click="addCount">+1</el-button>
        addCount2 use reactive {{form.count}}
        <el-button @click="addCount2">+1</el-button>
    </div>
</template>
<script setup>
    import { ref, reactive } from "vue"
    // 普通类型变量
    let count = ref(1)
    // 复杂类型变量
    let form = reactive({
        count:1
    })
    function addCount(){
        count.value++
        console.log("addCount")
    }
    function addCount2(){
        form.count++
        console.log("addCount2")
    }
</script>