<template>
  <div class="  bg-yellow-100 flex flex-col px-12 py-6">
    <section class="h-32 text-3xl flex items-center pl-3">
      您的专属陪诊
    </section>
    <section class="grid grid-cols-3 grid-rows-3 gap-5 mt-0">
      <select_
        v-for="item of data"
        :key="item.id"
        :locate_name="item.locate"
      ></select_>
    </section>
    <section class="flex  py-10 bg-white mt-12 ">
      <div class="flex flex-col flex-[5] p-20">
        <div class="flex-[2] flex flex-col justify-evenly gap-5 text-3xl">
          <div>
            与烛光同行
          </div>
          <div>
            全国各地 专属陪诊
          </div>
        </div>
        <div class="flex-[1]">
          <button
            class="flex-[5] mt-10 bg-yellow-300 w-[75%] h-[80%] font-bold text-slate-800 rounded-3xl text-[40px] border-none cursor-pointer transition-[0.3s] hover:bg-yellow-200"
          >
            一键加入
          </button>
        </div>
      </div>
      <div class="flex-[2] flex items-center">
        <img class="w-[600px]" src="@/assets/together.png" alt="" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import select_ from '@/components/select.vue'
import { reactive } from 'vue'
const data = reactive([
  { id: 1, locate: '北京市' },
  { id: 2, locate: '天津市' },
  { id: 3, locate: '上海市' },
  { id: 4, locate: '浙江省' },
  { id: 5, locate: '福建省' },
  { id: 6, locate: '湖南省' },
  { id: 7, locate: '江苏省' },
  { id: 8, locate: '江西省' },
  { id: 9, locate: '山东省' },
])
</script>

<style scoped>
.el-select:deep(.el-input__inner) {
  @apply py-5;
}
</style>
