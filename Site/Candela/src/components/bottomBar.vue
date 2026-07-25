<template>
  <div class="w-full bg-[#333333] pt-[10px] flex flex-col">
    <div class="flex-[9] flex justify-around text-white pb-32">
      <ul>
        <li>Candela</li>
        <router-link to="/">首页</router-link>
        <router-link to="/map">陪诊查询页</router-link>
      </ul>
      <ul>
        <li>
          联系我们
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li>
          服务
        </li>
      </ul>
      <ul>
        <li>
          支持
        </li>
      </ul>
      <ul>
        <li>
          陪诊类型
        </li>
      </ul>
    </div>
    <div class="flex-[1] bg-[#000000] flex items-center py-3">
      <div class="flex-1 pl-10 text-white">
        @2023 Candela.Inc
      </div>
      <div class="text-white pr-12 text-sm">
        创新 创意 创业 #梦的五次方团队
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col;
  li {
    @apply text-sm mt-2 cursor-pointer hover:text-slate-200;
  }
  a {
    @apply text-sm mt-2 text-white cursor-pointer hover:text-slate-200;
  }
}
ul > li:first-child {
  @apply text-lg;
}
</style>
