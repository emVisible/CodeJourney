<template>
  <header>
    <div class="flex px-4 py-10 relative">
      <section class="text-[26px] flex items-center pl-14 font-bold">
        Candela
      </section>
      <!-- <section class="flex-1 flex items-center"> -->
      <div
        class="flex ml-10 w-[80%] items-center"
        style="border: solid 2px black;"
      >
        <div class="relative flex-[3]">
          <Search class="absolute p-5" theme="outline" size="24" fill="#333" />
          <input
            class="w-full h-16 border-none outline-none pl-16"
            type="text"
            placeholder="搜索一些你想要的..."
          />
        </div>
        <div class="relative flex-[2]">
          <Local class="absolute p-5" theme="outline" size="24" fill="#333" />
          <input
            class="w-full h-16 border-none outline-none pl-16"
            type="text"
            placeholder="位置，城市，区域"
          />
        </div>
        <div class="relative flex flex-[3]">
          <Date class="w-full h-16 border-none outline-none`"></Date>
          <!-- <div class="w-full h-16 border-none outline-none"></div> -->
        </div>
        <div class="flex relative flex-[0.2] items-center">
          <button
            class="bg-yellow-400 w-full h-full p-5 cursor-pointer transition-[0.3s] border-none hover:bg-yellow-300"
            type="submit"
          >
            <Search class="" theme="outline" size="20" fill="#333" />
          </button>
        </div>
      </div>
      <img src="@/assets/sun.png" class="ml-auto w-32 scale-125 mr-10" alt="" />
      <!-- </section> -->
    </div>
  </header>
  <main class="flex">
    <div class="flex-[1] common-layout flex flex-col">
      <div class="flex-[2] flex flex-col">
        <yList></yList>
        <div class="w-[60%] flex gap-4 pl-10">
          <YList2>
            <template v-slot:icon>
              <el-icon><DocumentChecked /></el-icon>
            </template>
            <template v-slot:content>日期灵活</template>
          </YList2>
          <YList2>
            <template v-slot:icon>
              <el-icon><WarnTriangleFilled /></el-icon>
            </template>
            <template v-slot:content>紧急伴诊</template>
          </YList2>
          <YList2>
            <template v-slot:icon>
              <el-icon><Sugar /></el-icon>
            </template>
            <template v-slot:content>儿童伴诊</template>
          </YList2>
          <YList2>
            <template v-slot:icon>
              <el-icon><Promotion /></el-icon>
            </template>
            <template v-slot:content>异地伴诊</template>
          </YList2>
        </div>
        <Time
          class="pl-10 text-[24px] font-bold py-6"
          style="border-bottom: 2px solid gray;"
        ></Time>
      </div>
      <div class="flex flex-row h-full">
        <div class="flex-[3]">
          <Candle
            v-for="item of data"
            :key="item.id"
            :name="item.name"
            :place="item.place"
            :remark="item.remark"
            :level="item.level"
            :imgUrl="item.url"
          >
            {{ item.name }}
          </Candle>
        </div>
      </div>
    </div>
    <div class="flex-[1]">
      <!-- <GdMap class="flex-[2] sticky"></GdMap> -->
      <gdMap></gdMap>
    </div>
  </main>
  <footer>
    <BottomBar class=""></BottomBar>
  </footer>
</template>
<script setup lang="ts">
import Candle from '@/components/candle.vue'
import { reactive } from 'vue'
import { Search, Schedule, Local } from '@icon-park/vue-next'
import Date from '@/components/date.vue'
import yList from '@/components/yList.vue'
import YList2 from '@/components/yList2.vue'
import Time from '@/components/time.vue'
import BottomBar from '@/components/bottomBar.vue'
import gdMap from '@/components/gdMap.vue'
const data = reactive([
  {
    id: 1,
    name: '郭峥——最佳小烛光',
    place: '2.3km 杭州市 西湖区',
    remark:
      ' 我的客户经常是中老年人，如果您家的中老年人有伴诊需求，欢迎联系我！ ',
    level: '4.89',
    url:"/assets/a1.png"

  },
  {
    id: 2,
    name: '刘文杰',
    place: '1.3km 杭州市 西湖区',
    remark:
      ' 我日常大部分在和儿童接触，如果您家或者亲属家孩子有伴诊需求，欢迎来找我。',
    level: '4.73',
        url:"/assets/a2.png"

  },
  {
    id: 3,
    name: '周淑敏',
    place: '7.3km 杭州市 西湖区',
    remark: ' 提供中老年伴诊服务！请查看我的日程闲忙！ ',
    level: '4.87',
        url:"/assets/a3.png"

  },
  {
    id: 4,
    name: '方志海',
    place: '13.5km 杭州市 临平区',
    remark: '日常伴诊，经验丰富',
    level: '4.73',
        url:"/assets/a4.png"

  },

  {
    id: 5,
    name: '瑜雯',
    place: '16.9km 杭州市 临平区',
    remark: ' 临平区，日常伴诊。儿童伴诊经验丰富。 ',
    level: '4.93',
        url:"/assets/a5.png"

  },
])
</script>

<style scoped>
#container {
  width: 300px;
  height: 180px;
}
</style>
