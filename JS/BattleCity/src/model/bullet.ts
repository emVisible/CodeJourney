import { directionEnum } from './../enum/directionEnum';
import config from "../config";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";
import bullet from '../canvas/bullet';
import util from '../util';
import tank from '../canvas/tank';
import player from '../canvas/player';
import wall from '../canvas/wall';
import steel from '../canvas/steel';
import boss from '../canvas/boss';


export default class extends modelAbstract implements IModel {
  name: string = 'bullet'
  public canvas: ICanvas = bullet
  constructor(
    public tank: IModel
  ) {
    super(tank.x + config.model.width / 2, tank.y + config.model.height / 2)
    this.direction = tank.direction as unknown as directionEnum
  }

  image(): HTMLImageElement {
    return image.get(this.name as keyof typeof config.images)!
  }

  render(): void {
    let x = this.x
    let y = this.y
    let step = this.name == 'play' ? 10 :5
    switch (this.direction) {
      case directionEnum.top:
        y -= step;
        break
      case directionEnum.right:
        x += step;
        break
      case directionEnum.bottom:
        y += step;
        break
      case directionEnum.left:
        x -= step;
        break
    }
    const touchModel = util.isModelTouch(x, y, config.bulletSize.x, config.bulletSize.y,[...boss.models,...steel.models,...tank.models,...player.models,...wall.models])
    if (util.isCanvasTouch(x, y, config.bulletSize.x, config.bulletSize.y)) {
      this.destroy()

    } else if (touchModel && touchModel.name != this.tank.name) {
      this.destroy()
      if (touchModel.name != 'steel') {
        touchModel.destroy()
      }
      this.blast(touchModel)
    }

    else {
      this.x = x
      this.y = y
      this.draw()
    }

  }
  protected draw() {
    this.canvas.ctx.drawImage(this.image(), this.x, this.y, config.bulletSize.x, config.bulletSize.y)
  }
}