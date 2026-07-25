<template>
  <div class="demo-date-picker ml-10">
    <el-date-picker
      :border="false"
      v-model="value2"
      type="daterange"
      unlink-panels
      range-separator="到"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :shortcuts="shortcuts"
      :size="size"
      style="border: none;"
      popper-class="customer"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>

<style scoped>
.customer{
  border: none;
}
/* $border-color-base: transparent; */
.demo-date-picker >>> .el-input__wrapper {
  border: 0 ;
}

.demo-date-picker {
  display: flex;
  flex: 1;
  padding: 0;
  flex-wrap: wrap;
  border: 0;
}
.el-date-editor {
  border:none;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-date-picker .el-range-input {
  display: flex !important;
  padding: 30px !important;
}
::v-deep .el-date-editor {
  height: 100% !important;
    border: 0;
}



</style>
