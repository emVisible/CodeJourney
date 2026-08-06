import EmBlog from '@/views/blog/emBlog'
import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { useEffect } from 'react'

export default () => {
  // console.log('data',data)
  return (
    <Layout className="overflow-hidden">
      <Content>
        <EmBlog />
      </Content>
      <Footer></Footer>
    </Layout>
  )
}
