import AbstructElement from "./AbstructElement"

export default class Compote extends AbstructElement {
  private list: AbstructElement[]
  constructor() {
    super()
    this.list = []
  }
  public getElement() {
    return this.list.length ? this.list[this.list.length - 1] : "No Element"
  }
  public removeElement() {
    this.list.shift()
  }
  public addElement(...e: AbstructElement[]) {
    this.list.push(...e)
  }
  public eat(subCompote?: Compote | AbstructElement) {
    // 如果是盘子
    if (subCompote instanceof Compote) {
      const { list: subList } = subCompote
      if (subList.length == 0) return
      subList.forEach(item => {
        console.log(subCompote.eat(item))
        console.log("移除: " + subCompote.removeElement())
      })
    }
    // 如果是水果
    else this.list.forEach((item) => {
      if (item instanceof Compote) {
        this.eat(item)
      } else {
        if (item) {
          console.log(item.eat())
        }
      }
    })
  }
}