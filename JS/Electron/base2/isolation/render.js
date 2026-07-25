window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', () => {
    const width = Number(document.querySelector('[name="width"]').value)
    const height = Number(document.querySelector('[name="height"]').value)
    window.api.changeWindowPosition({ width, height })
  })
})
