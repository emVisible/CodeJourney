import { List, Menu, Pagination, Skeleton } from 'antd'
import Item from 'antd/es/list/Item'
import { useEffect, useState } from 'react'

export default () => {
  type categoriesType = { data: { id: number; title: string }[] }
  type itemsType = { label: string; key: string }[]
  type articlesType = {
    data: {
      id: number
      title: string
      content: string
      categoryId: number
    }[]
    meta: {
      current_page: number
      page_row: number
      total: number
      total_page: number
    }
  }

  const [categories, setCategories] = useState([]) as any
  const [articles, setArticles] = useState<articlesType>([] as any)
  const [currentCategory, setCurrentCategory] = useState('1')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const renderCategory = async () => {
    const categoriesRow: categoriesType = await fetch('http://127.0.0.1:3000/api/category').then((r: Response) => {
      return r.json()
    })
    const tmp: itemsType = []
    categoriesRow.data.forEach((category) => {
      tmp.push({
        label: category.title,
        key: category.id + '',
      })
    })
    setCategories([...categories, ...tmp])
  }

  useEffect(() => {
    renderCategory()
  }, [])

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/article?key=${currentCategory}&page=${currentPage}&row=12`)
      .then((articles) => articles.json())
      .then((res) => {
        setArticles(res)
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      })
  }, [currentCategory, currentPage])

  useEffect(() => {
    console.log(articles)
  }, [articles])
  return (
    <div className="h-full flex flex-col">
      <Menu
        className="flex justify-center"
        defaultSelectedKeys={['1']}
        onClick={(e) => {
          // console.log('articles', articles)
          setIsLoading(true)
          setCurrentCategory(e.key)
        }}
        mode="horizontal"
        items={categories}
      />
      <List
        size="large"
        dataSource={articles.data}
        renderItem={(item) => (
          <>
            <Skeleton
              loading={isLoading}
              active={true}
              paragraph={{ rows: 1, width: '100%', style: { marginBottom: '20px' } }}
              title={{ width: '30%' }}>
              <List.Item className="cursor-pointer transition-all hover:text-indigo-700">{item.title}</List.Item>
            </Skeleton>
          </>
        )}></List>
      <Pagination
        className="mt-auto flex justify-center"
        onChange={(e) => {
          setIsLoading(true)
          setCurrentPage(e)
        }}
        defaultCurrent={1}
        total={50}
      />
    </div>
  )
}
