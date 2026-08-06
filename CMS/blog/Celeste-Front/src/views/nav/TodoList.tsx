import Todo from '@/components/Todo'
import { Calendar, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'

function TodoList() {

  return (
    <Layout className="">
      <Sider
        className=" overflow-y-scroll"
        width={'15%'}
        style={{ background: 'linear-gradient(to left, #feca57, #ff9f43)' }}>
        <Todo></Todo>
      </Sider>
      <Content className=" overflow-scroll">
        <Calendar />
      </Content>
    </Layout>
  )
}

export default TodoList
