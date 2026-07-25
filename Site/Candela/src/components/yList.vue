<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#333333"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1">陪诊师</el-menu-item>
    <el-menu-item index="2">视频会话</el-menu-item>
    <el-menu-item index="3">定制服务</el-menu-item>
    

  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import YList2 from './yList2.vue'

const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
