<template>
  <div class="top flex flex-col items-center w-screen h-[500px] z-10">
    <!-- <slot class=""  name="image"></slot> -->
    <div class="mt-32 felx felx-col items-center">
      <img class="h-[200px] w-[200px]" :src="String($props.imgSrc)" alt="" />
      <p class="text-center text-2xl mt-4"><slot name="description"></slot></p>
    </div>
    <button
      class="btn transition-transform text-2xl border-[#eee6c5] border-[3px] py-2 px-4 mt-4 hover:bg-[#e9d37d] hover:scale-110"
    >
      <slot name="content"></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imgSrc: String,
})
</script>

<style lang="scss" scoped>
// @keyframes ani {
//   from {
//     transform: scale(0.5);
//   }
//   to {
//     transform: scale(1.6);
//   }
// }
p {
  transition: 0.2s;
}

.top {
  box-sizing: margin-box;
  @apply hover:bg-[#a5f3fcab]  border-[#FFFBEB] transition-[.3s];
  &:hover p {
    transform: scale(1.2);
  }
}
.btn {
  transition: 0.3s;
}
</style>
