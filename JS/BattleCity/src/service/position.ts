import config from "../config"

type positionType = {
  x:number
  y:number
}[]
class position {
  collection:positionType = []
  public getPositionCollection(num: number) {
    const collection = []
    for (let i = 0; i < num; i++) {
      while (true) {
        const position = this.position()
        const exists = this.collection.some(c => c.x == position.x && c.y == position.y)
        if (!exists) {
          collection.push(position)
          this.collection.push(position)
          break;
        }
      }
      collection.push(this.position())
    }
    console.log(this.collection);

    return collection
  }

  //获取随机坐标
  public position() {
    return {
      x: Math.floor(config.canvas.width / config.model.width * Math.random()) * config.model.width,
      y: Math.floor((config.canvas.height / config.model.height - 5) * Math.random()) * config.model.height
        + config.model.height * 2
    }

  }
}
export default new position()