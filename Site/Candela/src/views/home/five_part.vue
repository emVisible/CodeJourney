<template>
  <div class="relative w-full py-16 bg-[#F9D7AA]">
    <div class="w-full flex flex-col">
      <section class="flex flex-[2] flex-col px-14">
        <p class="text-[45px] flex-[5] my-10">烛光伴诊 与您相伴</p>
        <p class="text-[25px] flex-[2]">最好的你值得最好的陪伴</p>
      </section>
      <section class="flex flex-[3] mt-10 px-14">
        <QRcode
          v-slot:Icon
          v-for="item of data"
          :ref="String(item.id)"
          class="mr-10"
        >
          <Pay-code-one
            theme="outline"
            size="150px"
            fill="#333"
            class="mb-6"
            v-if="item.id == 1"
          />
          <Two-dimensional-code-two
            theme="outline"
            size="150px"
            fill="#333"
            class="mb-6"
            v-else
          />
          <div
            class="flex justify-center items-center px-10 py-3 rounded-[25px] bg-black"
          >
            <Apple-one
              v-if="item.id == 1"
              theme="outline"
              size="24"
              fill="#ffffff"
            />
            <Android v-else theme="outline" size="24" fill="#7ed321" />
            <p
              :class="item.id != 1 ? 'text-green-300' : ''"
              class="pl-4 text-2xl text-white"
            >
              {{ item.name }}
            </p>
          </div>
        </QRcode>
      </section>
      <img
      src="@/assets/phone.png"
        alt=""
        class="absolute bottom-0 right-36 w-[50%]"
      />
      <img
        src="@/assets/tr.png"
        alt=""
        class="absolute top-0 right-0 h-[50%]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QRcode from '@/components/QRcode.vue'
import { AppleOne, Android } from '@icon-park/vue-next'
import { PayCodeOne, TwoDimensionalCodeTwo } from '@icon-park/vue-next'

import { reactive } from 'vue'
const data = reactive([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Android' },
])
</script>

<style scoped></style>
