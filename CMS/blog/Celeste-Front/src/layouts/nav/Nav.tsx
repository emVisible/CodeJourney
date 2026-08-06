import Magic from '@/components/Magic'
import EmNav from '@/views/nav/emNav'
import EmSearch from '@/views/nav/emSearch'
import TodoList from '@/views/nav/emTools'
import { Flex, Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import { useState } from 'react'

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  const contentStyle = {
    height: `calc(100% - 160px)`,
  }
  return (
    <Layout>
      <Content className="magicParent flex flex-col" style={contentStyle}>
        <EmNav />
        <TodoList/>
      </Content>
      <Footer className="flex-1 p-0">
        <Flex className="justify-center items-center h-full w-full">
          <Magic />
          <EmSearch />
        </Flex>
      </Footer>
    </Layout>
  )
}
