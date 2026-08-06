import TodoList from '@/views/nav/TodoList'
import type { Dayjs } from 'dayjs';
import { AppstoreOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

export default () => {
  const [current, setCurrent] = useState('todo')
  const items: MenuProps['items'] = [
    {
      label: 'Todo',
      key: 'todo',
      icon: <AppstoreOutlined />,
    },
  ]
  return (
    <Layout id="magicBack" className="">
      <Menu
        onClick={(e) => {
          setCurrent(e.key)
        }}
        mode="horizontal"
        items={items}
        className="flex justify-center"
        defaultSelectedKeys={['todo']}
      />
      {current == 'todo' ? <TodoList></TodoList> : <div>暂无组件</div>}
    </Layout>
  )
}
