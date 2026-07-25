import path from 'path'
import fs from 'fs'

/**
 * ~.join
 * ~.resolve
 * ~.dirname
 * ~.basename / ~.extname
 * ~.normalize
 * ~.parse
 * ~.sep
*/

/**
 * 获取指定目录下的所有文件的绝对路径(同步阻塞)
*/
function getAllFileAbsPath(dir:string, filesArray?:Array<string>){
  const dirs = fs.readdirSync(dir, {withFileTypes: true})
  filesArray = filesArray || []
  dirs.forEach((dirOrFile)=>{
    if (dirOrFile.isDirectory()) {
      getAllFileAbsPath(path.resolve(dir, dirOrFile.name), filesArray) //递归查找
    }
    else if (dirOrFile.isFile()) {
      filesArray!.push(path.resolve(dir, dirOrFile.name))
    }
  })
  return filesArray
}

const filesAbsPath = getAllFileAbsPath("./")
console.log('filesAbsPath',filesAbsPath)