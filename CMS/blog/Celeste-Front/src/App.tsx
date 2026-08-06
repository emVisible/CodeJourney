import { Flex, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './layouts/blog/Blog'
import Nav from './layouts/nav/Nav'
import Ratio from './layouts/ratio/Ratio'
import RouteBtn from './components/RouteBtn'
import { Agreement, Delivery, Fm, Navigation } from '@icon-park/react'
import Welcome from './components/Welcome'
function App() {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      <Layout className="w-screen h-screen flex">
        <Sider
          className="flex-1 flex-col justify-center items-center"
          style={{
            background: '#3d3d3d',
          }}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          <RouteBtn location="/" avatar={<Navigation theme="filled" size="32" fill="#f3a683" />}></RouteBtn>
          <RouteBtn location="/fm" avatar={<Fm theme="filled" size="32" fill="#f3a683" />}></RouteBtn>
          <RouteBtn location="/blog" avatar={<Agreement theme="filled" size="32" fill="#f3a683" />}></RouteBtn>
        </Sider>
        <Routes>
          <Route path="" Component={Nav}></Route>
          <Route path="blog" Component={Blog}></Route>
          <Route path="ratio" Component={Ratio}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
