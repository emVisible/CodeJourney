<template>
  <div id="container" class="" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from '@vue/reactivity'
import { onMounted } from 'vue'
let map:any = shallowRef(null)
const initMap = () => {
  AMapLoader.load({
    key: '19f2e3faa9a04b71d5d35e49b899286b', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0',                         // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''],                         // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        resizeEnable: true,

        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 15, //初始化地图级别
        center: [120.042835, 30.238618], //初始化地图中心点位置
      })
      AMap.plugin('AMap.ToolBar', function () {
        var toolbar = new AMap.ToolBar()
        map.addControl(toolbar)
      })
      const icon2 = new AMap.Icon({
        size: new AMap.Size(50, 50), // 图标尺寸
        image: '/assets/myLocate.png', // Icon的图像
        imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(50, 50), // 根据所设置的大小拉伸或压缩图片
      })
      const exampleInstance = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.042835, 30.238618),
        icon: icon2,
        offset: new AMap.Pixel(-25, -25),
        title: '我的位置',
      })
      const textSelf = new AMap.Text({
        text: '我的位置',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.042835, 30.237978],
      })

      var text = new AMap.Text({
        text: '最佳陪诊师',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.043167, 30.23986],
      })
      const ins1 = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.043167, 30.24006),
      })

      var text2 = new AMap.Text({
        text: '待选陪诊师1',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.0401167, 30.23896],
      })
      const ins2 = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.0401167, 30.23926),
      })

      var text3 = new AMap.Text({
        text: '待选陪诊师2',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.048312, 30.243852],
      })
      const ins3 = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.048312, 30.244152),
      })

      var text4 = new AMap.Text({
        text: '待选陪诊师3',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.035534, 30.236021],
      })
      const ins4 = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.035534, 30.236171),
      })

      var text5 = new AMap.Text({
        text: '待选陪诊师4',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style: {
          color: 'blue',
        },
        position: [120.035234, 30.234841],
      })
      const ins5 = new AMap.Marker({
        map: map,
        draggable: true,
        position: new AMap.LngLat(120.035234, 30.234971),
      })

      textSelf.setMap(map)
      text.setMap(map)
      text2.setMap(map)
      text3.setMap(map)
      text4.setMap(map)
      text5.setMap(map)

      map.setFitView()
      var line = new AMap.Polyline({
        strokeColor: '#80d8ff',
        isOutline: true,
        outlineColor: 'white',
      })
      line.setMap(map)
      var text = new AMap.Text({
        text: '',
        style: {
          'background-color': '#29b6f6',
          'border-color': '#e1f5fe',
          'font-size': '12px',
        },
      })
      text.setMap(map)
      function computeDis() {
        var p1 = exampleInstance.getPosition()
        var p2 = ins1.getPosition()
        var textPos = p1.divideBy(2).add(p2.divideBy(2))
        var distance = Math.round(p1.distance(p2))
        var path = [p1, p2]
        line.setPath(path)
        text.setText('距离最佳陪诊师' + distance + '米')
        text.setPosition(textPos)
      }
      computeDis()
      exampleInstance.on('dragging', computeDis)
      ins1.on('dragging', computeDis)
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})
</script>

<style scoped></style>
