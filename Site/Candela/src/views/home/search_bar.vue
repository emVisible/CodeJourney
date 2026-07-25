<template>
  <div class="flex justify-center flex-col w-full">
    <section class="relative ml-14 mt-14 flex-1">
      <div class="flex items-center">
        <img class="w-20 h-20 rounded-full" src="@/assets/logo.jpg" />

        <p class="pl-3 font-bold text-2xl">Candela</p>
        <img
          class="absolute left-[420px] top-10 rounded-full"
          src="@/assets/nav_1.png"
        />
      </div>
      <div class="fmt-3 mt-4 mb-5">
        <p class="text-[40px] font-black tracking-[10px]">找到当地的陪诊师</p>
      </div>
    </section>
    <section class="h-36 mb-20 pl-36">
      <div class="flex ml-14 mt-8 h-full w-[80%] items-center">
        <div class="relative flex-[3]">
          <Search class="absolute p-5" theme="outline" size="24" fill="#333" />
          <input
            class="w-full h-16 border-none outline-none pl-16"
            type="text"
            placeholder="搜索一些你想要的..."
          />
        </div>
        <div class="relative flex-[2]">
          <Local class="absolute p-5" theme="outline" size="24" fill="#333" />
          <input
            class="w-full h-16 border-none outline-none pl-16"
            type="text"
            placeholder="位置，城市，区域"
          />
        </div>
        <div class="relative flex flex-[3]">
          <Date class="w-full h-16 border-none outline-none`"></Date>
          <!-- <div class="w-full h-16 border-none outline-none"></div> -->
        </div>
        <div class="flex relative flex-[0.2] items-center">
          <button
            class="bg-yellow-400 w-full h-full p-5 cursor-pointer transition-[0.3s] border-none hover:bg-yellow-300"
            type="submit"
          >
            <Search class="" theme="outline" size="20" fill="#333" />
          </button>
        </div>
        <img
          class="absolute h-44 right-[5%] top-36"
          src="@/assets/picture3.png"
          alt=""
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Schedule, Local } from '@icon-park/vue-next'
import Date from '@/components/date.vue'
// import Date from '@/components/date.vue';

const input = ref('')
</script>

<style scoped></style>
