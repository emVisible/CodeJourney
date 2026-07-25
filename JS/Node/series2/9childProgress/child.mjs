process.on('message', (msg) => {
  if (msg.toString().toLowerCase() == 'stop') process.send('exit')
  else {
    console.log("[Sub System] recieved: " + msg)
  }
})