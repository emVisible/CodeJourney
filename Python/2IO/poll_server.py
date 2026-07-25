import socket
import select

# 初始化Socket
ADDR = ("", 1234)
BUF_SIZE = 1024
sock_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock_server.bind(ADDR)
sock_server.setblocking(False)
sock_server.listen()

# 通过poll方法链接
poll = select.poll()
connections = {}
poll.register(sock_server.fileno(), select.POLLIN)

'''
  每轮循环处理能力有限:
  要么处理读, 将读->写
  要么处理写, 将写->输出
'''
while True:
  try :
    events = poll.poll()
  except KeyboardInterrupt:
    break
  for fd, flag in events:
    print(f"套接字:{fd}, 位掩码:{flag}")
    # 主套接字, 负责链接请求
    if fd == sock_server.fileno():
      tmp_sock, addr = sock_server.accept()
      tmp_sock.setblocking(False)
      # 注册临时套接字, 监视可读事件
      poll.register(tmp_sock.fileno(), select.POLLIN)
      connections[tmp_sock.fileno] = tmp_sock
    # 套接字为可读就绪状态, 接收信息
    elif flag and select.POLLIN:
      tmp_sock = connections[fd]
      try:
        data = sock_server.recv(BUF_SIZE)
      except ConnectionResetError:
        pass
      if data:
        print(f"收到socket{fd}信息: {data.decode()}")
        poll.modify(fd, select.POLLOUT)

    if flag and select.POLLOUT:
      tmp_sock:socket = connections[fd]
      tmp_sock.send('[收到信息]'.encode())
      poll.modify(fd, select.POLLIN)
    elif flag and select.POLLUP:
      print("[socket 关闭]")
      poll.unregister(fd)
      connections[fd].close()
      del connections[fd]
  print(f"--------connections: {list(connections.keys())}")
  print("循环结束")

poll.unregister(sock_server.fileno())
sock_server.close()
print("End")





