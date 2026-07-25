import config from "../config";
import { canvasAbstract } from "./canvasAbstract";
import model from '../model/player'


export default new (class extends canvasAbstract implements ICanvas {
  num(): number {
    return 0
  }
  model(): ModelConstructor {
    return model
  }
  protected createModels() {
    const cw = config.canvas.width
    const ch = config.canvas.height
    const mw = config.model.width
    const mh = config.model.height

    ;[{x:cw/2 - mw*5 ,y:ch-mh}].forEach(position => {
      const model = this.model()
      const instance = new model(position.x, position.y)
      this.models.push(instance)
    })
  }
  render(): void {
    this.createModels()
    super.renderModels()
  }

})('play')