/// <reference types="vite/client" />
interface ModelConstructor {
  new(x: number, y: number): IModel
}

interface BulletModelConstructor {
  new(tank: IModel): IModel
}

interface IModel {
  tank?: IModel
  x: number
  y: number
  width: number
  height: number
  direction: string
  name: string
  render(): void
  destroy(): void
  image(): HTMLImageElement
}
interface ICanvas {
  model(): ModelConstructor | BulletModelConstructor
  num(): number
  render(): void
  ctx: CanvasRenderingContext2D
  removeModel(model: IModel): void
  renderModels(): void
  stop?(): void
}