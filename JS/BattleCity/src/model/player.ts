import config from "../config";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";
import play from '../canvas/player'
import _ from "lodash";
import { directionEnum } from "../enum/directionEnum";
import util from "../util";
import bullet from "../canvas/bullet";

export default class extends modelAbstract implements IModel {
  public canvas: ICanvas = play
  image(): HTMLImageElement {
    let direction = this.name + _.upperFirst(this.direction)
    return image.get(direction as keyof typeof config.images)!
  }
  bindEvent = false
  name: string = 'play'
  render(): void {
    super.draw()
    if (!this.bindEvent) {
      this.bindEvent = true
      document.addEventListener('keydown',this.changeDirection.bind(this))
      document.addEventListener('keydown',this.move.bind(this))
      document.addEventListener('keydown',(event:KeyboardEvent)=>{
        // console.log(event.code)
        if (event.code == 'Space') {
          bullet.addPlayerBullet()
        }
      })
    }
  }

  changeDirection(event: KeyboardEvent) {
    console.log(event.code)
    switch (event.code) {
      case 'ArrowUp':
        this.direction = directionEnum.top
        break;
      case 'ArrowDown':
        this.direction = directionEnum.bottom
        break;
      case 'ArrowLeft':
        this.direction = directionEnum.left
        break;
      case 'ArrowRight':
        this.direction = directionEnum.right
        break;
    }
    this.canvas.renderModels()
  }
  move(event:KeyboardEvent){
    let x = this.x
    let y = this.y

    switch (event.code) {
      case 'ArrowUp':
        y-=5;
        this.direction = directionEnum.top
        break;
      case 'ArrowDown':
        y+=5;

        this.direction = directionEnum.bottom
        break;
      case 'ArrowLeft':
        x-=5
        this.direction = directionEnum.left
        break;
      case 'ArrowRight':
        x+=5

        this.direction = directionEnum.right
        break;
    }
    if (util.isCanvasTouch(x,y) || util.isModelTouch(x,y)) return
    this.x = x
    this.y = y
    this.canvas.renderModels()
  }
}