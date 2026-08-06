import { Injectable } from '@nestjs/common'
import { CreateFmDto } from './dto/create-fm.dto'
import { UpdateFmDto } from './dto/update-fm.dto'
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class FmService {
  create(createFmDto: CreateFmDto) {
    return 'This action adds a new fm'
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const audioList = []
      const basePath = path.resolve(__dirname)
      console.log('base path is' + basePath)
      console.log(basePath)
      const rootpath = basePath.slice(0, -12) + '\\audios'
      fs.readdir(rootpath, (err, files) => {
        if (err) {
          console.log(rootpath)
          console.error('读取错误')
          reject()
          return
        }
        files.forEach((file) => {
          const filename = path.basename(file)
          audioList.push(filename)
          // console.log(filename)
        })
        resolve(audioList)
      })
      console.log(basePath)
      console.log(rootpath)
      console.log(audioList)
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} fm`
  }

  update(id: number, updateFmDto: UpdateFmDto) {
    return `This action updates a #${id} fm`
  }

  remove(id: number) {
    return `This action removes a #${id} fm`
  }
  getAllFiles(directoryPath: string) {
    const files = []

    // 读取目录中的文件和子目录
    fs.readdirSync(directoryPath).forEach((file) => {
      const filePath = path.join(directoryPath, file)

      // 判断是否是文件
      if (fs.statSync(filePath).isFile()) {
        files.push(filePath)
      } else {
        // 递归遍历子目录
        const subDirectoryFiles = this.getAllFiles(filePath)
        files.push(...subDirectoryFiles)
      }
    })

    return files
  }
}
