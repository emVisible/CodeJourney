## 浙江省地图Demo

> 地图源数据来源于阿里DataV 层级生成器

基于Vue3+echarts的Demo，实现了数据展示的核心功能。

- 支持地图下钻到区县
- 将topojson格式的数据转为，geojson，以echarts渲染
- 项目内部提供了地图映射数据

![展示](/_gallery/display.gif)

## 进行二次开发

```
安装依赖
$ pnpm install
```

```
进入开发模式
$ pnpm dev
```

```
打包
$ pnpm build
```

将src/data中的data.ts数据转变为你需要展示的数据即可。

data中的其它文件为原始的地图(base.ts area.ts)和映射文件(map.ts)，一般不需要更改。

---

**数据及API参考：**

- **echats相关API: https://echarts.apache.org/zh/option.html#geo**
- **阿里DataV: https://datav.aliyun.com/portal/school/atlas/level_generator**
