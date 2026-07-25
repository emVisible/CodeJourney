<script >

import btn from './components/btn.vue'
import bar from './components/bar.vue'
import data from '../data/data.json' assert {type: 'json'}
export default {
  components: { btn, bar },
  data() {
    return {
      data,
      // priceList: []
      status: 'default'
    }
  },
  mounted: function () {
    this.initMsg()
  }
  ,
  methods: {
    initMsg() {
      let reg = new RegExp(/\d+(?![u4e00-u9fa5])(.*\.?\d*)?(?<!:)/i)
      for (let item of data) {
        let dataKey = Object.getOwnPropertyNames(item)[0]
        let filter_key = reg.exec(dataKey)
        // this.priceList.push(parseInt(filter_key[0]))
        item.price = parseInt(filter_key[0])
      }
    },
    getAll() {
      let count = 0;
      console.log(`数据总数：%c${data.length}`, 'color:firebrick;font-size:2rem');
      setTimeout(() => {
        let reg = new RegExp(/\d+(?![u4e00-u9fa5])(.*\.?\d*)?(?<!:)/i)
        for (let item of data) {
          let dataKey = Object.getOwnPropertyNames(item)[0]
          let filter_key = reg.exec(dataKey)
          // console.log(parseInt(filter_key[0]));
          console.log(item);
          console.log('No' + count++);
        }
      }, 2000);
      // let reg = new RegExp(/[u4e00-u9fa5]+/ig)


      // data.map(item => {
      //   for (let key in item) {
      //     let value_of_key = key;
      //     let value_of_value = item[key];
      //     //实现动态渲染
      //     let filter_key = reg.exec(key)
      //     // let price = filter_key.map(item=>{
      //     //   return Number(item)
      //     // })
      //     console.log(a++);
      //     console.log(filter_key);
      //     // console.log(key);
      //     // console.log(item[key])
      //     // console.log(document.querySelector('#box'));
      //     // document.querySelector('#box').insertAdjacentHTML('beforeend',`${btn}`)
      //   }
      // })
    },
    ascending() {
      // console.log(this.priceList);
      this.status = 'asc'
      console.log('Ascending sort');
      setTimeout(() => {
        this.data.sort((a, b) => a.price - b.price)
      }, 100);
    },
    descending() {
      this.status = 'desc'
      console.log('Descending sort');
      this.data.sort((a, b) => b.price - a.price)
    },
    getMax() {
      // this.ascending()
      this.status == 'asc'
        ? alert(this.data[this.data.length - 1].price)
        : this.status == 'desc'
          ? alert(this.data[0].price) :
          alert(this.getMaxForDefault())
    },
    getMaxForDefault() {
      let max = 0;
      this.data.reduce((pre, cur = { price: 0 }) => {
        max = Math.max(max, cur.price)
      }, 0)
      return max;
    },
    getMin() {
      this.status == 'asc'
        ? alert(this.data[0].price)
        : this.status == 'desc'
          ? alert(this.data[this.data.length - 1].price) :
          alert(this.getMinForDefault())
    },
    getMinForDefault() {
      let min = 0;
      this.data.reduce((pre, cur = { price: 0 }) => {
        min = Math.min(min, cur.price)
      }, 0)
      return min;
    },
    getConcentrationArea() {
      let sum = 0
      this.data.reduce((pre = { price: 0 }, cur = { price: 0 }) => {
        sum += cur.price
      }, 0)
      const average = Math.floor(sum / this.data.length);
      const max = this.getMaxForDefault()
      const min = this.getMinForDefault()

      const sectionHigh = Math.floor((max - average) / 2)
      const sectionLow = Math.floor((average - min) / 2)

      alert('密集区间：' + `${sectionLow}` + '-' + `${sectionHigh}`)


    }
  }
}




</script>

<template>
  <section class="left">
    <btn type='success' Bcontent="Ascending" @click="ascending()"></btn>
    <btn type='success' Bcontent="Descending" @click="descending()"></btn>
    <br>
    <btn type='danger' Bcontent="Max" @click="getMax"></btn>
    <btn type='danger' Bcontent="Min" @click="getMin"></btn>
    <br>
    <btn type='special' Bcontent="Concentration area" @click="getConcentrationArea"></btn>
    <br>
    <btn type="info" @click="getAll()" Bcontent="Log"></btn>

  </section>
  <section class="right">
    <table class="container" v-for="item in data">
      <tr v-for="(projectName,projectPrice) in item">
        <td>
          {{projectName}}

        </td>
        <td>
          {{projectPrice}}
        </td>
      </tr>
    </table>
  </section>
</template>

<style scoped>

</style>
