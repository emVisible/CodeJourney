document.querySelector("#y_btn").addEventListener('click',()=>{
  const input = document.querySelector('#y_input')
  input.innerHTML = window.api.upload()
})