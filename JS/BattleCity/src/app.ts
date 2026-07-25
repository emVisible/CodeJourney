import { promises } from './service/image'
import config from './config'
import straw from './canvas/straw'
import wall from './canvas/wall'
import './style.scss'
import './service/image'
import water from './canvas/water'
import steel from './canvas/steel'
import tank from './canvas/tank'
import bullet from './canvas/bullet'
import boss from './canvas/boss'
import player from './canvas/player'
import audio from './service/audio'

const app = document.querySelector<HTMLDivElement>('#app')!
app.style.width = config.canvas.width + 'px'
app.style.height = config.canvas.height + 'px'

export default {
  isStart: false,
  gameState: 9,
  interval: 0,
  bootstrap() {
    app.addEventListener('click', async () => {
      await this.start()
      this.interval = setInterval(() => {
        if (tank.models.length == 0) this.gameState = 1
        if (player.models.length == 0 || boss.models.length == 0) this.gameState = 0
        if (this.gameState != 9) this.stop()
      }, 100);
    })

  },
  async start() {
    if (this.isStart == true) return
    audio.start()
    this.isStart = true
    app.style.backgroundImage = 'none'
    await Promise.all(promises)
    tank.render()

    straw.render()
    wall.render()
    water.render()
    steel.render()
    bullet.render()
    boss.render()
    player.render()
  },

  stop() {
    setTimeout(() => {
      tank.stop()
      bullet.stop()
      clearInterval(this.interval)
      this.text()
    }, 100);
  },
  text() {
    const el = document.createElement('canvas')
    el.width = config.canvas.width
    el.height = config.canvas.height

    const ctx = el.getContext('2d')!
    ctx.fillStyle = 'red'
    ctx.font = '80px CascadiaMono'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.gameState == 1 ? 'YOU WIN !' : 'YOU LOSE!', config.canvas.width / 2, config.canvas.height / 2)
    app.appendChild(el)
  }
}
