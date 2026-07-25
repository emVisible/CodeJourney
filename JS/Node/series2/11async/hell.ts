import { readFile } from 'fs'
const path = "./test.txt"
const callbackHell = async() => {
  readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
    console.log('Layer 1')
    readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
      console.log('Layer 2')
      readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
        console.log('Layer 3')
        readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
          console.log('Layer 4')
          readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
            console.log('Layer 5')
            readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
              console.log('Layer 6')
              readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
                console.log('Layer 7')
                readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
                  console.log('Layer 8')
                  readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer) => {
                    console.log('Layer 9')
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

const asyncMethod = async () => {
  await readFile(path, () => {
    console.log("Layer1")
  })
  await readFile(path, () => {
    console.log("Layer2")
  })
  await readFile(path, () => {
    console.log("Layer3")
  })
}
callbackHell()
asyncMethod()