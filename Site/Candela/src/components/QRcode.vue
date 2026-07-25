<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col px-2 py-1 justify-center">
      <slot name="Icon" class="flex"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ isApple: Boolean })
// console.log(this.$el);

</script>

<style scoped></style>
