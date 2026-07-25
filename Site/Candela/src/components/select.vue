<template>
  <el-select v-model="value" class="m-2" :placeholder="$props.locate_name">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="$props.locate_name + ' 县/市/镇区'"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue'
defineProps({
  locate_name: String,
})
const value = ref('')

const options = [
  {
    value: '城市1',
    label: '城市1',
  },
  {
    value: '城市2',
    label: '城市2',
  },
  {
    value: '城市3',
    label: '城市3',
  },
  {
    value: '城市4',
    label: '城市4',
  },
  {
    value: '城市5',
    label: '城市5',
  },
]
</script>
