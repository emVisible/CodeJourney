<template>
  <div>
    <button class="yBtn" @click="changeType">{{ state == "piecewise" ? "分段型数据" : "连续型数据" }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const state = ref("piecewise")
const emits = defineEmits(['state'])
function changeType() {
  state.value = state.value == "continuous" ? "piecewise" : "continuous"
  emits('state', state.value)
}
</script>

<style scoped lang="scss">
.yBtn{
  bottom:200px
}
</style>