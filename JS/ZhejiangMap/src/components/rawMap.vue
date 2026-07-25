<template>
  <div id="vice">
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import * as topojson from "topojson-client";
import { onMounted, ref } from "vue";
import area from "../data/area";
import map from '../data/map';
// 原始地图数据

/**
 * 动态chart实例
*/
const chartRef = ref<echarts.ECharts | null>(null);
/**
 * 异步初始化, 防止在DOM挂载之前进行绑定
*/
onMounted(async () => {
    await init()
})

/**
 * 地图数据转换与处理: 将topoJson格式转为geoJson格式
*/
function handleData() {
  // 导入的地图数据
  const mapArea = area
  const mapTable = map;

  // 通过topojson包将阿里datav的topojson格式的层级数据转化为echart支持的geoJson格式
  const ZhejiangProvince = topojson.feature(
    mapArea.payload,
    mapArea.payload.objects.collection
  ) as any;

  // 外层遍历映射表, 内层处理数据; 通过topojson包提取出子区域的特征, 添加到父区域特征中
  mapTable.forEach((i, index) => {
    if (index > 0) {
      try {
        let result = topojson.feature(
          mapArea.children[i.treeID]?.payload,
          mapArea.children[i.treeID]?.payload.objects.collection
        ) as any;
        ZhejiangProvince.features = [...ZhejiangProvince.features, ...result.features];
      } catch (e) { }
    }
  });

  return ZhejiangProvince
}
/**
 * 初始化
*/
async function init() {
  const ZhejiangProvince = handleData()
  // 注册根区域: 浙江省
  echarts.registerMap("浙江省", ZhejiangProvince);

  // 初始化
  chartRef.value = echarts.init(document.getElementById("vice"));

  // 绑定点击后显示子区域相关事件
  chartRef.value.on("click", function (params: any) {
    console.log('params', params)
    handleClick(params)
  });

  // 地图渲染
  renderMap("浙江省");
}

/**
 * 处理子区域数据
 * @param regionName 父区域的区域名称
*/
function getSubRegionMapData(regionName: string) {
  let treeId: string;
  let res
  // 遍历地图映射表, 获取treeID, 用于在area地图数据中定位子区域
  map.forEach(item => {
    if (item.name == regionName) {
      treeId = item.treeID
    }
  })

  // 遍历子区域, 提取所需的子区域数据
  Object.values(area.children).forEach((item: any) => {
    if (item.treeID == treeId) {
      res = item
    }
  })
  return res
}

/**
 * 处理点击事件
 * @params init中传来的数据
*/
function handleClick(params: any,) {
  // 获取当前区域名称
  const regionName = params.name;
  // 获取子区域地图数据
  const subRegionMapData: any = getSubRegionMapData(regionName);

  // 对子区域地图数据进行转换
  const country = topojson.feature(
    subRegionMapData.payload,
    subRegionMapData.payload.objects.collection) as any
  Object.values(subRegionMapData.children).forEach((item: any) => {
    let result = topojson.feature(
      item.payload,
      item.payload.objects.collection
    ) as any;
    country.features = [...country.features, ...result.features];
  })
  console.log('country', country)
  // 注册子区域
  echarts.registerMap(regionName, country);
  // 渲染
  renderMap(regionName);
}


// 渲染地图函数
function renderMap(mapName: string) {
  console.log('mapName', mapName)
  chartRef.value?.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c} (分)",
    },
    geo: {
      map: mapName,
    },
  });
}
</script>

<style scoped lang="scss">
#vice {
  width: 800px;
  height: 800px;

  button {
    width: 200px;
    height: 30px;
  }
}
</style>