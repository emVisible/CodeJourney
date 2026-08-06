import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'

function RouteBtn(e: any) {
  const { avatar, location } = e
  const navigate = useNavigate()
  const handleClick = () => {
    // console.log('location', location)
    navigate(location)
  }
  return (
    <Avatar
      onClick={handleClick}
      className="rounded-full flex justify-center items-center mb-6 cursor-pointer transition-all hover:scale-150"
      size="large"
      src={avatar}></Avatar>
  )
}

export default RouteBtn
