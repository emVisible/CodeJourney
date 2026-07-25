import config from "../config";
import audio from "../service/audio";
import { directionEnum } from './../enum/directionEnum';

export default abstract class modelAbstract {
  abstract render(): void
  abstract name: string
  public abstract canvas: ICanvas
  abstract image(): HTMLImageElement
  public width: number = config.model.width
  public height: number = config.model.height
  constructor(public x: number, public y: number) {
    this.randomDirection()
  }
  public direction: directionEnum = directionEnum.top
  protected randomDirection() {
    this.direction = Object.keys(directionEnum)[Math.floor(Math.random() * 4)] as directionEnum
  }
  protected draw() {
    this.canvas.ctx.drawImage(this.image()!, this.x, this.y, config.model.width, config.model.height)

    }
  public destroy(){
    this.canvas.removeModel(this)
    this.canvas.renderModels()
  }
  protected blast(model:IModel){
    audio.blast()
    Array(...Array(8).keys()).reduce((promise,index)=>{
      return new Promise(resolve=>{
        setTimeout(() => {
          const img = new Image()
        img.src = `./src/static/images/blasts/blast${index}.gif`
        img.onload =()=>{
          this.canvas.ctx.drawImage(img,model.x,model.y,model.width,model.height)
          resolve(promise)
        }
        }, 150);
      })
    },Promise.resolve())
  }
}