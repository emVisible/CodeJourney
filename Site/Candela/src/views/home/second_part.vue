<template>
  <div class="flex flex-col w-screen py-16">
    <section class="flex mt-16">
      <div class="flex-[1.3] ml-14">
        <p class="text-[60px]">Candela里最棒的陪诊师！</p>
        <a href="" class="text-2xl text-blue-500">查看更多优质陪诊师</a>
      </div>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <img class="ml-4 mr-4 h-[80%]" src="/assets/picture2.png" alt="" />
          <div class="">Candela 认证</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a1.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          日常问诊
        </template>
        <template v-slot:area>
          杭州 西湖区
        </template>
        <template v-slot:level>
          4.79（“照亮”89人）
        </template>
        <template v-slot:content>
          我的客户经常是中老年人，如果您家的中老年人有伴诊需求，欢迎联系我！
        </template>
      </Card>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <img class="ml-4 mr-4 h-[80%]" src="/assets/picture2.png" alt="" />
          <div class="">Candela 认证</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a2.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          儿童就诊
        </template>
        <template v-slot:area>
          广州 天河区
        </template>
        <template v-slot:level>
          4.93（“照亮”127人）
        </template>
        <template v-slot:content>
          我日常大部分在和儿童接触，如果您家或者亲属家孩子有伴诊需求，欢迎来找我！
        </template>
      </Card>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <img class="ml-4 mr-4 h-[80%]" src="/assets/picture2.png" alt="" />
          <div class="">Candela 认证</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a3.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          异地就诊，紧急伴诊，日常伴诊
        </template>
        <template v-slot:area>
          北京市
        </template>
        <template v-slot:level>
          4.84（“照亮”422人）
        </template>
        <template v-slot:content>
          北京医疗资源丰富，如果您是异地就诊人群，我在Candela上帮助了很多异地就诊患者。欢迎查看我的日程闲忙。
        </template>
      </Card>
    </section>
    <section class="flex mt-32">
      <div class="flex-[1.3] ml-14">
        <p class="text-[60px]">在您附近的陪诊师</p>
        <a href="" class="text-2xl text-blue-500">查看更多附近的陪诊师</a>
      </div>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <Good-two
            class="ml-4 mr-4 h-[80%]"
            theme="outline"
            size="24"
            fill="#333"
          />
          <div class="">Candela 推荐</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a4.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          日常伴诊
        </template>
        <template v-slot:area>
          杭州市 临平区
        </template>
        <template v-slot:level>
          4.68（“照亮”32人）
        </template>
        <template v-slot:content>
          临平区，日常伴诊
        </template>
      </Card>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <Good-two
            class="ml-4 mr-4 h-[80%]"
            theme="outline"
            size="24"
            fill="#333"
          />
          <div class="">Candela 推荐</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a5.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          日常伴诊，儿童伴诊
        </template>
        <template v-slot:area>
          杭州市 临平区
        </template>
        <template v-slot:level>
          4.77（“照亮”25人）
        </template>
        <template v-slot:content>
          临平区，日常伴诊。有儿童伴诊经验！
        </template>
      </Card>
      <Card class="flex-[1]">
        <template v-slot:recomend>
          <Good-two
            class="ml-4 mr-4 h-[80%]"
            theme="outline"
            size="24"
            fill="#333"
          />
          <div class="">Candela 推荐</div>
        </template>
        <template v-slot:icon>
          <img
            class="w-24 h-24 ml-8 -translate-y-12"
            src="/assets/a6.png"
            alt=""
          />
        </template>
        <template v-slot:job>
          中老年伴诊
        </template>
        <template v-slot:area>
          杭州市 萧山区
        </template>
        <template v-slot:level>
          4.87（“照亮”45人）
        </template>
        <template v-slot:content>
          提供中老年伴诊服务！请查看我的日程闲忙！
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/card.vue'
import { GoodTwo } from '@icon-park/vue-next'

const icon = `<img class="ml-4 mr-4 h-[80%]" src="/assets/picture2.png" alt="" />`
</script>

<style scoped></style>
