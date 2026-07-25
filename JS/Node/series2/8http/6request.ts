fetch('http:127.0.0.1:4275?queryParam=QUERY_PARAM', {
  method: 'POST',
  body: JSON.stringify({
    param:'reqeust'
  })
})
  .then((value) => {
   console.log('value', value)
})