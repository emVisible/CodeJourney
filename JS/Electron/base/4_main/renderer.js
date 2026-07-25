window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button')
  btn.addEventListener('click', () => {
    const widthInput = document.querySelector('[name="width"]').value
    const heightInput = document.querySelector('[name="height"]').value
    console.log('widthInput',widthInput)
    console.log('heightInput',heightInput)
    window.api.submit({
      width: Number(widthInput),
      height: Number(heightInput)
    })
    // window.api.test()
  })
})