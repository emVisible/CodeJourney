<script setup lang="ts">
import { ref } from 'vue';
import changeType from './components/changeType.vue';
import RawMap from './components/rawMap.vue';
import Back from './components/back.vue';
import Map from './view/index.vue';

const type = ref("")
function handleChange(value: string) {
  type.value = value
}

</script>

<template>
  <div class="root">
    <section>
      <h2>浙江省地图Demo</h2>
      <Map :type="type" />
    </section>
    <section>
      <h2>源数据</h2>
      <RawMap />
    </section>
    <section>
      <Back />
      <changeType @state="handleChange" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
