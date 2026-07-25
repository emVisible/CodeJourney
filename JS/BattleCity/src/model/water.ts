import water from "../canvas/water";
import config from "../config";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";


export default class extends modelAbstract implements IModel{
  name: string = 'water'
  public canvas: ICanvas = water

  image(): HTMLImageElement {
    return image.get(this.name as keyof typeof config.images)!
  }

  render(): void {
    super.draw()
  }
}