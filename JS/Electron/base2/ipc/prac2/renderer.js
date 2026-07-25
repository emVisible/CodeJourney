document.addEventListener('DOMContentLoaded',()=>{
  const btn = document.querySelector('#btn')
  btn.addEventListener('click',()=>{
    window.access.func(()=>{
      btn.innerHTML = Number(btn.innerHTML) + 1
    })
  })
})