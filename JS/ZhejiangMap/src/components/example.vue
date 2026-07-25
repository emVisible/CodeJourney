<template>
    <div id="map"> </div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts';
import { onMounted } from 'vue';
import mapData  from '../data/base';
import { data } from '../data/data';
onMounted(async () => {
  setTimeout(() => {
    init()
  }, 1000)
})

function handleClick(chart:echarts.EChartsType){
  chart.off("click");
  chart.on("click", (params:any)=>{
    const data = params.data
    console.log('data',data)
  })
}

function init() {
  const chart = echarts.init(document.getElementById("map"))
  chart.showLoading()
  chart.hideLoading()
  echarts.registerMap("ZJ", mapData)
  console.log('mapData', mapData)
  chart.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c} (分)",
    }, //6、 这个是根据data中的value值来相应的显示不同的颜色（在这里是根据人口密度来显示不同的颜色；）
    visualMap: [
      {
        show: true,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: "#fff", // 值域文字颜色
        }, // color: ['#B52621', '#5934EC', '#DD970B', '#E6C249', '#29A4D7']
      }
    ],
    series: [
      {
        name: "浙江省地图",
        type: "map",
        mapType:"ZJ",
        label: {
          normal: {
            show: true,
            formatter: function (params: any) {
              return params.name + "\n" + params.value;
            },
            textStyle: {
              fontWeight: "normal",
              fontSize: 12,
              color: "#fff",
            },
          },
        }, // 下面这个可以设置鼠标悬停上面的效果
        emphasis: {
          //对应的鼠标悬浮效果
          // show: true,
          label: {
            color: '#FFFFFF'
          },
          itemStyle: {
            shadowColor: '#CCC'
          },
        },
        itemStyle: {
          //设置边框为白色
          normal: {
            borderWidth: 0.5, //边际线大小
            borderColor: "#fff", //边界线颜色
          },
        },
        data
      },
    ],
  }
  )
  handleClick(chart)
}


</script>

<style scoped lang="scss">
#map {
  width: 800px;
  height: 800px;
}
</style>