export default{
  el(id:string):HTMLAudioElement {
    return document.querySelector(`#${id}`)!
  },
  start(){
    this.el('aStart').play()
  },
  fire(){
    this.el('aFire').play()
  },
  blast(){
    this.el('aBlast').play()
  }
}