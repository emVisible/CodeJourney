window.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('h1')
  console.log('element', element)
  console.log('api', api)
})

// ===========================
const button = document.querySelector('button')
button.onclick =  () => {
  const inputValue = document.querySelector('input').value
  const res =  this.api.changeTitle(inputValue)
  console.log('res',res)
  // this.api.saveFile()
  // this.api.counter((value) => {
  //   const el = document.querySelector('.counter')
  //   el.innerHTML = Number(el.textContent) + value
  // })
}
