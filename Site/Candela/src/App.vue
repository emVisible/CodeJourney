<script setup lang="ts">
import Home from './views/home/home.vue'
</script>

<template>
  <suspense>
    <div class="w-screen h-screen">
      <router-view class="w-screen h-screen"></router-view>
    </div>
  </suspense>
</template>
<style scoped></style>
