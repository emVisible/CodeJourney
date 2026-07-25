import config from "../config"
import position from "../service/position"



export abstract class canvasAbstract {
  //元素记录
  public models: IModel[] = []
  abstract render(): void
  abstract num(): number
  abstract model(): ModelConstructor | BulletModelConstructor
  constructor(
    protected name: string,
    protected el = document.createElement('canvas'),
    public ctx = el.getContext('2d')!,
    protected app = document.querySelector('#app') as HTMLDivElement,
  ) {
    this.createCanvas()
    // this.createModels()
  }
  //创建画布
  protected createCanvas() {
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height
    this.el.setAttribute('name', this.name)
    this.app.insertAdjacentElement('beforeend', this.el)
  }
  //模型实例生成
  protected createModels() {
    position.getPositionCollection(this.num()).forEach(position => {
      const model = this.model() as unknown as any
      const instance = new model(position.x, position.y)
      this.models.push(instance)
    })
  }

  //模型渲染
  public renderModels() {
    this.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height)
    this.models.forEach(model => {
      model.render()
    })
  }
  public removeModel(model: IModel) {
    this.models = this.models.filter(m => m != model)
  }
}