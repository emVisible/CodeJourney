<template>
  <div>今日：{{ time }}</div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'

let time = ref("")
time.value = moment().locale('zh-cn').format('YYYY年MM月DD日 HH点mm分ss秒')

function getTime() {
  setInterval(() => {
    time.value = moment().locale('zh-cn').format('YYYY年MM月DD日 HH点mm分ss秒')
  }, 1000)
}
onMounted(() => {
  getTime()
})

</script>

<style scoped></style>
