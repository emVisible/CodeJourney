import config from "../config";
import { canvasAbstract } from "./canvasAbstract";
import model from '../model/boss'

export default new (class extends canvasAbstract implements ICanvas {
  num(): number {
    return 0
  }
  model(): ModelConstructor {
    return model
  }

  render(): void {
    this.createModels()
    this.renderModels()
  }
  protected createModels() {
    [{x:config.canvas.width/2 - config.model.width ,y:config.canvas.height - config.model.height}].forEach(position => {
      const model = this.model()
      const instance = new model(position.x, position.y)
      this.models.push(instance)
    })
  }
})('boss')