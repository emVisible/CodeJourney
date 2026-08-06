import store, { RootDispatch, RootState } from '@/store'
import { appendTask, deleteTask, Task } from '@/store/todo/task'
import { PreviewClose, PreviewOpen } from '@icon-park/react'
import { Avatar, Badge, Button, Card, Input, List } from 'antd'
import { RefObject, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function TodoTheme(props: { taskTheme: string; dispatch: RootDispatch }) {
  const { taskTheme, dispatch } = props

  // focus组件状态
  const [focus, setFocus] = useState(localStorage.getItem('theme') || false)
  const [isFocusSet, setIsFocusSet] = useState(localStorage.getItem('theme') || false)

  // 添加focus theme的input
  const inputRef: RefObject<HTMLInputElement> = useRef(null)
  const [iptValue, setIptValue] = useState('')

  // 添加task的title和description
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleMain = () => {
    setFocus(!focus)
  }
  return (
    <>
      <Card
        className="w-full"
        title={
          <section className="flex">
            <div>Focus</div>
            <div id="focusTxt" className="ml-auto cursor-pointer" onClick={handleMain}>
              {focus && isFocusSet ? (
                <PreviewOpen theme="filled" size="24" fill="#706FD3" />
              ) : (
                <PreviewClose theme="filled" size="24" fill="#706FD3" />
              )}
            </div>
          </section>
        }>
        {isFocusSet && localStorage.getItem('theme') ? (
          <section>
            <div
              className="cursor-pointer text-center text-base py-3 transition-all hover:text-violet-400"
              onClick={(e) => {
                if (localStorage.getItem('theme')) {
                  localStorage.removeItem('theme')
                  setIsFocusSet(!isFocusSet)
                }
              }}>
              🔶{localStorage.getItem('theme')}
            </div>
          </section>
        ) : (
          <></>
        )}
        {!(focus && isFocusSet) ? (
          <input
            ref={inputRef}
            type="text"
            className="w-full outline-none border-b-2 border-b-blue-500 text-center "
            placeholder="Just one thing"
            onChange={(e) => {
              setIptValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && iptValue.length != 0) {
                localStorage.setItem('theme', iptValue)
                setIsFocusSet(true)
                setFocus(true)
              }
            }}
          />
        ) : (
          <></>
        )}
        <Badge className="w-full mt-3">
          {!(focus && isFocusSet) ? (
            <p className="opacity-35 cursor-default text-center">Hard choice, Easy life</p>
          ) : (
            <></>
          )}
        </Badge>
        {focus && isFocusSet ? (
          <section className="flex flex-col items-center">
            <Button
              className="w-full mb-3"
              onClick={(e) => {
                dispatch(
                  appendTask({
                    id: crypto.randomUUID(),
                    title: title || '(No Title)',
                    description: description || '',
                    isDone: false,
                  }),
                )
              }}>
              +
            </Button>
            <Input
              prefix="🔸"
              className="mb-3 rounded-none border-t-0 border-x-0 border-blue-400 border-b-2 border-solid shadow-none opacity-60 focus:opacity-100"
              placeholder="title..."
              onBlur={(e) => {
                setTitle(e.target.value)
              }}></Input>
            <Input
              prefix="🔹"
              className="rounded-none border-t-0 border-x-0 border-blue-400 border-b-2 border-solid shadow-none opacity-60 focus:opacity-100"
              alt="描述"
              placeholder="detail..."
              onBlur={(e) => {
                setDescription(e.target.value)
              }}></Input>
          </section>
        ) : (
          <></>
        )}
      </Card>
    </>
  )
}
function TodoDetail(props: { taskTheme: string; details: Task[]; dispatch: RootDispatch }) {
  //props
  const { details, taskTheme, dispatch } = props

  if (details.length === 0)
    store.dispatch((r) => {
      console.log('r', r)
    })
  return (
    <List
      itemLayout="horizontal"
      className="text-white"
      dataSource={details}
      renderItem={(item, index) => (
        <List.Item className="transition-all cursor-pointer hover:scale-105">
          <List.Item.Meta
            avatar={
              <Avatar
                shape="square"
                icon={'💠'}
                className="hover:scale-110 bg-white cursor-pointer transition-all"
                onClick={(e) => {
                  dispatch(deleteTask(item.id))
                }}
              />
            }
            title={
              <>
                <p className="font-bold cursor-pointer">{item.title}</p>
              </>
            }
            description={item.description || ''}
          />
        </List.Item>
      )}
    />
  )
}

export default function Todo() {
  // 模拟数据
  // const [list, setList] = useState<Task[]>()
  const taskList = useSelector((state: RootState) => state.task!.taskList)
  const taskTheme = useSelector((state: RootState) => state.task!.focusTask)
  const dispatch = useDispatch() as RootDispatch

  return (
    <section className="px-3 py-3 w-full h-full overflow-y-scroll ">
      <TodoTheme taskTheme={taskTheme} dispatch={dispatch} />
      <TodoDetail taskTheme={taskTheme} details={taskList} dispatch={dispatch} />
    </section>
  )
}
