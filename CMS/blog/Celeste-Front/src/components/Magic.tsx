import { GlobalOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { Magic } from '@icon-park/react'
import { useEffect } from 'react'

export default () => {
  const handleMagic = ()=>{
    handleMagicFront()
    handleMagicBack()
  }
  const handleMagicFront = () => {
    let elFront = document.querySelector('#magicFront')
    if (elFront!.classList.contains('front')) {
      elFront?.classList.remove('front')
      elFront?.classList.add('back')
    } else {
      elFront?.classList.remove('back')
      elFront?.classList.add('front')
    }
  }
  const handleMagicBack = () => {
    let elBack = document.querySelector('#magicBack')
    if (elBack!.classList.contains('back')) {
      elBack?.classList.remove('back')
      elBack?.classList.add('front')
    } else {
      elBack?.classList.remove('front')
      elBack?.classList.add('back')
    }
  }
  return (
    <button
      className="opacity-30 p-5 transition-opacity hover:opacity-100"
      onClick={() => {
        handleMagic()
      }}>
      <Magic theme="outline" size="24" fill="#333" />
    </button>
  )
}
