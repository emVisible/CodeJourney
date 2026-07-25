<template>
  <div class="flex bg-slate-100 my-10">
    <!-- <HeadImage class="flex justify-center items-center flex-[1] "></HeadImage> -->
    <img
      :src="imgUrl"
      class="flex justify-center items-center flex-[1] w-[20px] h-full mt-4"
      alt=""
    />
    <div class="flex flex-[5] p-2">
      <div class="flex flex-col flex-[3]">
        <div class="text-xl text-blue-800">{{ $props.name }}</div>
        <div class="py-1">
          <star-one theme="outline" size="24" fill="#d0021b" />
          {{ ' ' + $props.level }}
        </div>
        <div class="py-1">
          <local-two theme="outline" size="24" fill="#4a90e2" />
          {{ ' ' + $props.place }}
        </div>
        <div class="py-1">
          <protect theme="outline" size="24" fill="#50e3c2" />
          {{ ' ' + $props.remark }}
        </div>
      </div>
      <div class="flex-[8] grid grid-rows-2 grid-cols-7 gap-3">
        <section
          class="bg-yellow-200 text-center flex flex-col"
          :class="[
            item.color == 0
              ? 'timeColor0'
              : item.color == 1
              ? 'timeColor1'
              : item.color == 2
              ? 'timeColor2'
              : item.color == 3
              ? 'timeColor3'
              : '',
          ]"
          v-for="item of timeTable"
          :key="item.id"
        >
          <div class="py-5 flex-1">{{ item.week }}</div>
          <div class="pt-10 pb-5">{{ item.date }}</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarOne, LocalTwo, Protect } from '@icon-park/vue-next'
import moment from 'moment'
import { computed, reactive, ref } from 'vue'
import HeadImage from './headImage.vue'
defineProps({
  name: String,
  place: String,
  remark: String,
  level: String,
  imgUrl:String
})
const baseDay = moment().locale('zh-cn').format('M月DD日')
const preWeek = moment().locale('zh-cn').format('dddd')
let baseWeek = '星期'
switch (preWeek) {
  case 'Monday':
    baseWeek += '一'
    break
  case 'Tuesday':
    baseWeek += '二'
    break
  case 'Wednesday':
    baseWeek += '三'
    break
  case 'Thursday':
    baseWeek += '四'
    break
  case 'Friday':
    baseWeek += '五'
    break
  case 'Saturday':
    baseWeek += '六'
    break
  case 'Sunday':
    baseWeek += '日'
    break
}
const day = new Date()
const day_ = day.getDay()
// for (let i = 0 ; i < 7; i++) {
//   let result;
//   const temp = day_ - i
//   if (temp == 0 ) result = '星期日'
//   else if(temp == 1 ) result = '星期一'
//   else if (temp == 2 ) result = '星期二'
//   else if (temp == 3 ) result = '星期三'
//   else if (temp == 4 ) result = '星期四'
//   else if (temp == 5 ) result = '星期五'
//   else if (temp == 6 ) result = '星期六'
// }
// const day1 = day_ - 1;

console.log(day.getDay())

// const day = ref(baseDay)
// const week = ref(baseWeek)

// const time = moment().locale('zh-cn').format('YYYY年MM月DD日 HH点mm分ss秒')
// console.log(baseWeek)
const timeTable = reactive([
  { id: 1, week: '星期一', date: '3月27日', color: 0 },
  { id: 2, week: '星期二', date: '3月28日', color: 0 },
  { id: 3, week: '星期三', date: '3月29日', color: 2 },
  { id: 4, week: '星期四', date: '3月30日', color: 1 },
  { id: 5, week: '星期五', date: '3月31日', color: 2 },
  { id: 6, week: '星期六', date: '4月1日', color: 2 },
  { id: 7, week: '星期日', date: '4月2日', color: 0 },
  { id: 8, week: '星期一', date: '4月3日', color: 1 },
  { id: 9, week: '星期二', date: '4月4日', color: 3 },
  { id: 10, week: '星期三', date: '4月5日', color: 2 },
  { id: 11, week: '星期四', date: '4月6日', color: 1 },
  { id: 12, week: '星期五', date: '4月7日', color: 3 },
  { id: 13, week: '星期六', date: '4月8日', color: 0 },
  { id: 14, week: '星期日', date: '4月9日', color: 1 },
])

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap.default,
  }
})
</script>

<style scoped>
.timeColor0 {
  background: gray;
}
.timeColor1 {
  background: #d4fbe3;
}
.timeColor2 {
  background: #feffd7;
}
.timeColor3 {
  background: #ffe7d7;
}
.el-descriptions {
  margin-top: 20px;
}
.el-descriptions__cell:deep(.el-descriptions__content) {
  margin-right: 100px;
}
</style>
