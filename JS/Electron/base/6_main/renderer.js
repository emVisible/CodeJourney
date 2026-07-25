window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#selectFile')
  const container = document.querySelector('#file')
  btn.addEventListener('click', async () => {
    const files = await window.api.selectFile()
    for (const file of files) {
      const input = document.createElement('input')
      input.value = file
      container.appendChild(input)
    }
  })
})


window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#saveFile')
  const container = document.querySelector('[name="saveFile"]')
  btn.addEventListener('click', async () => {
    const files = await window.api.saveFile(container.value)
    console.log('files', files)
  })
})