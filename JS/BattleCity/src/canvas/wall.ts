import config from "../config";
import { canvasAbstract } from "./canvasAbstract";
import model from '../model/wall'

export default new (class wall extends canvasAbstract implements ICanvas {
  num(): number {
    return config.wall.num
  }
  model(): ModelConstructor {
    return model
  }

  render(): void {
    super.createModels()
    this.createBossWall()

    super.renderModels()
  }

  createBossWall() {
    const cw = config.canvas.width
    const ch = config.canvas.height
    const mw = config.model.width
    const mh = config.model.height

    const configX: number = cw / 2 - 3 * mw
    const configY: number = ch - 3 * mh
    const pos = []
    for (let i = 1; i <= 3; i++) {
      pos.push({
        x: configX + (mw * i),
        y: configY
      })
    }
    for (let i = 1; i <= 3; i++) {
      pos.push({
        x: configX,
        y: configY + (mh * (i - 1))
      })
    }
    for (let i = 1; i <= 3; i++) {
      pos.push({
        x: configX+ (mw * 4),
        y: configY + (mh * (i - 1))
      })
    }
    console.log(pos);

    pos.forEach(position => {
      const model = this.model()
      const instance = new model(position.x, position.y)
      this.models.push(instance)
    })

  }

})('wall')