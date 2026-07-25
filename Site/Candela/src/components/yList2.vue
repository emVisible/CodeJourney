<template>
  <div class="flex py-4">
    <el-button type="warning" plain size="medium">
      <slot class="px-2" name="icon"></slot>
      <slot name="content"></slot>
    </el-button>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped></style>
