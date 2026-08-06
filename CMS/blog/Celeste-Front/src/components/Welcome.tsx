import { Row } from 'antd'
import { SyntheticEvent } from 'react'
export default () => {
  const render = () => {
    return <h2 className="text-[4rem] italic text-white">Welcome</h2>
  }

  const hide = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement
    target.classList.toggle('mask-hide')
  }

  return (
    <Row
      className="w-screen h-screen bg-[#222f3e] global-transition absolute z-10"
      onClick={(event) => {
        hide(event)
      }}>
      <div className="absolute right-28 bottom-14">{render()}</div>
    </Row>
  )
}
