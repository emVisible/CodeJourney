<template>
  <div
    class="flex flex-col w=full h-[650px] bg-[url('@/assets/train.png')] bg-no-repeat bg-cover py-6"
  >
    <div class="flex flex-[1] h-32 justify-center items-center text-[28px] p-2">
      <h1>专属陪诊一站通</h1>
    </div>
    <div class="flex flex-[3] p-10">
      <Card3
        class="flex ml-4 shadow-xl"
        v-for="item of data"
        :key="item.id"
        :imgSrc=item.image
      >
        <template v-slot:description>
          {{ item.description }}
        </template>
        <template v-slot:content>
          {{ item.content }}
        </template>
      </Card3>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card3 from '@/components/card3.vue'
import { reactive } from 'vue'
const data = reactive([
  {
    id: 1,
    image: '/assets/pic1.png',
    description: '优质伴诊服务',
    content: '挑选伴诊服务',
  },
  {
    id: 2,
    image: '/assets/pic2.png',
    description: '实时的伴诊追踪',
    content: '进入烛光小镇',
  },
  {
    id: 3,
    image: '/assets/pic3.png',
    description: '系统化的培养方案',
    content: '了解宵明陪诊师',
  },
])
console.log(data[0].image)
</script>

<style scoped></style>
