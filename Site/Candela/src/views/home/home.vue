<script setup lang="ts">
import Search_bar from '@/views/home/search_bar.vue'
import Five_part from '@/views/home/five_part.vue'
import Four_part from '@/views/home/four_part.vue'
import Second_part from '@/views/home/second_part.vue'
// import Test from './views/test.vue';
import Third_part from '@/views/home/third_part.vue'
import date from '@/components/date.vue'
import Six_part from './six_part.vue'
import BottomBar from '@/components/bottomBar.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <Search_bar class="bg-amber-100"></Search_bar>
    <Second_part class="bg-slate-50"></Second_part>
    <!-- <Third_part class="bg-white"></Third_part> -->
    <Four_part class="bg-amber-50"></Four_part>
    <Five_part class=""></Five_part>
    <Location></Location>
    <Six_part></Six_part>
    <BottomBar></BottomBar>
  </div>
</template>
<style scoped></style>
