window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn')
  button.addEventListener('click', () => {
    window.api.getMsg(() => {
      const width = Number(document.getElementsByName('input')[0].value)
      const height = Number(document.getElementsByName('input')[1].value)
      return {width,height}
    })
  })
})
