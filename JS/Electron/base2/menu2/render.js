window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn')
  button.addEventListener('click', () => {
    const width = Number(document.getElementsByTagName('input')[0].value)
    const height = Number(document.getElementsByTagName('input')[1].value)
    window.api.getMsg({ width, height })
  })
})
