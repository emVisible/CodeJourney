import { DeleteThree } from '@icon-park/react'
import { Button, Dropdown, MenuProps, Space } from 'antd'
export default () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p>Bing</p>,
      onClick() {
        console.log('Bing')
      },
    },
    {
      key: '2',
      label: <p>谷歌</p>,
      onClick() {
        console.log('google')
      },
    },
    {
      key: '3',
      label: <p>百度</p>,
      onClick() {
        console.log('Baidu')
      },
    },
  ]

  const onSearch = (event: any) => {
    if (event.key === 'Enter') {
      const inputValue = event.target.value
      location.href = 'https://www.bing.com/search?q=' + inputValue
    }
  }

  const handleChange = (event: any) => {
    const delIcon = document.getElementById('del')
    if (event.target.value.length === 0) {
      delIcon!.style.display = 'none'
    } else {
      delIcon!.style.display = 'block'
    }
  }

  const clearAll = () => {
    const ipt = document.getElementById('search') as any
    ipt!.value = ''
    const delIcon = document.getElementById('del')
    delIcon!.style.display = 'none'
  }
  return (
    <div className="w-[80%] flex justify-center items-center bg-white rounded-lg shadow-2xl">
      <input
        id="search"
        type="text"
        className="flex-1 outline-none h-full p-3 bg-white text-lg font-semibold items-center text-center rounded-lg"
        onKeyDown={onSearch}
        onChange={handleChange}
      />

      <div className="cursor-pointer px-3" onClick={clearAll}>
        <DeleteThree id="del" className="hidden" theme="outline" size="24" fill="#333" />
      </div>
      <Dropdown menu={{ items }} placement="bottomLeft" className="bg-[#ffbe76] mx-3">
        <Button></Button>
      </Dropdown>
    </div>
  )
}
