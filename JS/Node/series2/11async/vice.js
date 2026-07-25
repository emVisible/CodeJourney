if (process.argv.length == 4) {
  const url = JSON.parse(process.argv[2])
  const options = JSON.parse(process.argv[3])
  fetch(url, options)
    .then(async (value) => {
      const res = {
        status: value.status,
        body: await value.json()
      }
      console.log(JSON.stringify(res)) //输出必须是单独的序列化JSON
    })
}