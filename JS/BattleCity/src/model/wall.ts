import wall from "../canvas/wall";
import config from "../config";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";


export default class extends modelAbstract implements IModel{
  name: string = 'wall'
  public canvas: ICanvas = wall

  image(): HTMLImageElement {
    return image.get(this.name as keyof typeof config.images)!

  }

  render(): void {
    super.draw()
  }

}