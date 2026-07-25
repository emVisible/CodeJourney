import data from '../data/data.json' assert {type:'json'}

data.map(item=>{
  for (let key in item){
    console.log(key);
    console.log(item[key])
  }
})