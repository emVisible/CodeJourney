<template>
  <div class="card flex flex-col bg-white translate-y-8 p-3">
    <section class="flex flex-[1]">
      <div class="">
        <slot name="icon"></slot>
        <!-- <img
          class="w-24 h-24 ml-8 -translate-y-12"
          src="@/assets/picture.png"
          alt=""
        /> -->
      </div>
      <div class="mt-6">
        <div class="flex items-center bg-cyan-200 w-[200px] h-8 rounded-2xl">
          <slot name="recomend"></slot>
          
        </div>
      </div>
    </section>
    <section class="flex flex-[2] flex-col ml-8">
      <h1 class="text-xl">Candela陪诊师</h1>
      <h2><slot name="job"></slot></h2>
      <h3 class="text-xs text-gray-400"><slot name="area"></slot></h3>
      <div>
        <div>
          <Star-one theme="outline" size="20" fill="#fad352" />
          <slot name="level"></slot>
        </div>
      </div>
      <p><slot name="content"></slot></p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { StarOne } from '@icon-park/vue-next'
</script>

<style lang="scss" scoped>
.card {
  transition: 0.3s;
  cursor: pointer;
  &:hover.card {
    transform: translateY(-30px);
  }
}
</style>
