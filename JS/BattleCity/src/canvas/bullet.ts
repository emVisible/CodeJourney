import { canvasAbstract } from "./canvasAbstract";
import model from '../model/bullet'
import tank from "./tank";
import bullet from '../model/bullet'
import player from "./player";
import audio from "../service/audio";
export default new (class extends canvasAbstract implements ICanvas {
  intervalId = 0
  num(): number {
    return 0
  }
  model(): BulletModelConstructor {
    return model
  }

  render(): void {
    this.intervalId = setInterval(() => {
      this.createBullet()
      this.renderModels()
    }, 50);
  }
  createBullet() {
    tank.models.forEach(tank => {
      const status = this.models.some(m => m.tank == tank)
      if (!status) {
        this.models.push(new bullet(tank))
      }
    })
  }
  stop(): void {
      clearInterval(this.intervalId)
  }
  addPlayerBullet() {
    this.models.push(new bullet(player.models[0]))
    audio.fire()
  }
})('bullet')

