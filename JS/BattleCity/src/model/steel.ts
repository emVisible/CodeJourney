import steel from "../canvas/steel";
import config from "../config";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";


export default class extends modelAbstract implements IModel{
  public canvas: ICanvas = steel
  image(): HTMLImageElement {
    return image.get(this.name as keyof typeof config.images)!
  }
  name: string = 'steel'
  render(): void {
    super.draw()
  }
}