<template>
  <!-- <div class="flex"> -->
    <div class="flex justify-between p-10">
      <Card2 v-for="item of data" :key="item.id" class="ml-4">
        <template v-slot:img>
          {{ item.img + 'Service' + item.id }}
        </template>
        <template v-slot:content>
          XXX 服务
        </template>
      </Card2>
  </div>
</template>

<script setup lang="ts">
import Card2 from '@/components/card2.vue'
import { reactive, ref } from 'vue'
const data = reactive([
  {
    id: 1,
    img: `*`,
    content: 'Service',
  },
  {
    id: 2,
    img: '*',
    content: 'Service',
  },
  {
    id: 3,
    img: '*',
    content: 'Service',
  },
  {
    id: 4,
    img: '*',
    content: 'Service',
  },
  {
    id: 5,
    img: '*',
    content: 'Service',
  },
])
</script>

<style scoped></style>
