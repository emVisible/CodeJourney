'''
  使用select, 实现线程下的IO多路复用
'''
import select
import time
from socket import socket, AF_INET, SOCK_STREAM
BUF_SIZE = 1024
ADDR = ('', 1234)

server = socket(AF_INET, SOCK_STREAM)
server.bind(ADDR)
server.listen()

# select.select接收的三个变量, 分别是读列表、写列表、错误列表
r_list = [server]
w_list = []
x_list = []

while True:
  try:
    rl, wl, xl = select.select(r_list, w_list, x_list)
    print(f"Sock: read {rl}")
    print(f"Sock: write {wl}")
  except KeyboardInterrupt:
    break
  # 分别对三个列表进行处理

  for sock in rl:
    if sock is server:
      temp_sock, addr = server.accept()
      temp_sock.setblocking(False)
      temp_sock.send("链接成功".encode())
    else:
      data = server.recv(BUF_SIZE)
      if data:
        print(f"[{time.ctime()}] 接收数据: {data.decode()}")
        if sock not in w_list:
          w_list.append(sock)
      else:
        r_list.remove(sock)
        sock.close()
  # 刻写可写列表
  for sock in wl:
    if sock:
      sock.send(f"[{time.ctime()}] 发送数据")
      w_list.remove(sock)
  #
  for sock in xl:
    r_list.remove(sock)
    if sock in w_list:
      w_list.remove(sock)
    sock.close()
server.close()




