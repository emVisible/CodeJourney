<template>
  <div class="w-[19vw] h-[300px] flex justify-center">
    <div
      class="flex flex-col justify-center items-center flex-[1] bg-yellow-100"
    >
      <div class="bg-white w-[200px] h-[200px] rounded-full flex justify-center items-center mb-6">
        <slot  name="img"></slot>
      </div>
      <slot name="content" ></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  
</style>
