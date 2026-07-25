
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button')
  btn.addEventListener('click', () => {
    window.api.toMain()
    window.api.toRender((value) => {
      console.log("向预加载脚本发送完毕")
    })
  })
})