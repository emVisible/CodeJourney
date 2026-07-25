<template>
  <div>
    <router-link class="yBtn" to="/" @click="handleClick">返回</router-link>
  </div>
</template>

<script setup lang="ts">

function handleClick() {
  location.href = '/'
}

</script>