
window.addEventListener('DOMContentLoaded',()=>{
console.log(document.querySelector('h1'))
})

console.log(window.variable_name)

document.querySelector('#test').addEventListener('click',()=>{
  window.sendToMain.send()

})

window.api.communicate()

