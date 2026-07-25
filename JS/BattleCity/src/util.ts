import boss from "./canvas/boss"
import steel from "./canvas/steel"
import wall from "./canvas/wall"
import water from "./canvas/water"
import config from "./config"

export default {
  isModelTouch(x: number, y: number, width: number = config.model.width, height: number = config.model.height,
    models = [ ...boss.models,...steel.models,...wall.models,...water.models]): IModel
   | undefined{
    return models.find(model => {
      const state =
        x + width <= model.x ||
        x >= model.width + model.x ||
        y + height <= model.y ||
        y >= model.height + model.y
      return !state
    })
  },
  isCanvasTouch(x: number, y: number, width: number = config.model.width, height: number = config.model.height,): boolean {
    return x < 0 || x + width > config.canvas.width || y < 0 || y + height > config.canvas.height
  }
}