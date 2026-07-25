<template>
  <div id="main"> </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import * as topojson from "topojson-client";
import { onMounted, ref, watch } from "vue";
import area from "../data/area";
import { data } from '../data/data';
import map from '../data/map';

/**
 * 动态chart实例
*/
const chartRef = ref<echarts.ECharts | null>(null);
const charType = ref("piecewise")
const props = defineProps({
  type: String
})

/**
 * 监听props, 响应变换类型
*/
watch(
  () => props.type,
  (newValue: any) => {
    charType.value = newValue;
    chartRef.value?.dispose()
    init()
  }
);

/**
 * 异步初始化, 防止在DOM挂载之前进行绑定
*/
onMounted(async () => {
  setTimeout(() => {
    init()
  }, 1000)
})

/**
 * 地图数据转换与处理: topoJson => geoJson
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
function init() {
  const ZhejiangProvince = handleData()
  // 注册根区域: 浙江省
  echarts.registerMap("浙江省", ZhejiangProvince);

  // 初始化
  chartRef.value = echarts.init(document.getElementById("main"));

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


/**
 * 渲染地图函数
 * @param mapName 地图区域名称
 * */
function renderMap(mapName: string) {
  console.log('mapName', mapName)
  chartRef.value?.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c} (分)",
    },
    visualMap: [
      {
        type: charType.value,
        show: true,
        itemWidth: 30,
        textStyle: {
          color: "#000",
        },
        dimension: 0,
        splitList: [
          { statrt: 0, end: 0, label: '无数据', color: '#74B9FF' },
          { start: 1, end: 20, label: '极低', color: '#f7d794' },
          { start: 20, end: 50, label: '较低', color: '#f3a683' },
          { start: 50, end: 60, label: '适中', color: '#ea8685' },
          { start: 60, end: 80, label: '较高', color: '#e77f67' },
          { start: 80, end: 100, label: '很高', color: '#cf6a87' },
        ],
      },
    ],
    series: [
      {
        name: `${mapName}`,
        type: "map",
        coordinateSystem: "map",
        map: `${mapName}`,
        label: {
          normal: {
            show: true,
            formatter: function (params: any) {
              return params.name + "\n" + params.value;
            },
            textStyle: {
              fontWeight: "normal",
              fontSize: 14,
              color: "#222f3e",
            },
          },
        },
        itemStyle: {
          areaColor: "#74b9ff",
          borderColor: '#ffffff',
          borderType: 'solid',
          borderWidth: 2,
          borderCap: 'butt',
          shadowColor: '#f3a683',
          shadowBlur: 4,

        },
        emphasis: {
          focus: 'self',
          label: {
            color: '#FFFFFF',
            fontSize: 16,
          },
          itemStyle: {
            areaColor: "#778beb",
            borderColor: '#ffffff',
            shadowColor: '#546de5',
          }
        },
        data: data
      },
    ],
  });
}
</script>

<style scoped lang="scss">
#main {
  width: 800px;
  height: 800px;
}
</style>