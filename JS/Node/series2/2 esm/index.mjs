// 导出所有在main.mjs中通过export导出的内容
export * from "./main.mjs"
// 导出main.mjs中的默认导出对象作为func在index中导出
export {default as func} from "./main.mjs"
// 自定义导出
export const index = "TEMP_INDEX"
// 自定义默认导出
export default {
  index: 0
}