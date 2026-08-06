import { data, meta } from '@/assets/data'
import { Avatar, Button, Card, Col, Flex, Grid, Row } from 'antd'
import { NavLink } from 'react-router-dom'

export default () => {
  return (
    <article id="magicFront" className="flex justify-center flex-1 bg-[#353B48] py-3 px-3 overflow-hidden">
      {data.map((item, index) => {
        return (
          <Flex key={index} gap="middle" className="flex-1 mx-3">
            <Card
              className="flex flex-col flex-1 overflow-hidden bg-transparent border-none"
              title={
                <div className="text-white text-lg text-center py-3 h-full relative duration-[.9s]  hover:animate-arrow cursor-pointer">
                  <div>{meta[index].title}</div>
                  {/* <div className="absolute top-0 left-0 p-10 bg-violet-400"></div> */}
                </div>
              }>
              {item.map((subItem, subIndex) => {
                return (
                  <Row className="my-3 flex flex-1 justify-center" key={subIndex}>
                    <NavLink
                      to={subItem.link}
                      className="py-14 flex justify-center items-center flex-1 p-0  bg-[#706FD3] rounded-lg transition-all hover:bg-[#9980FA] hover:scale-110">
                      <Avatar shape="square" src={<img src={subItem.imgUrl} alt="avatar" />} />
                      <p className="quota text-white font-mono transition-all">{subItem.name}</p>
                    </NavLink>
                  </Row>
                )
              })}
            </Card>
          </Flex>
        )
      })}
    </article>
  )
}
