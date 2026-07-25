from socket import socket, AF_INET, SOCK_STREAM
from time import ctime
ADDR = ("", 1234)
BUF_SIZE = 1024
server = socket(AF_INET, SOCK_STREAM)
server.bind(ADDR)
# 非阻塞
server.setblocking(False)
server.listen()

while True:
  try :
    try:
      sock, addr = server.accept()
    except BlockingIOError:
      continue
  except KeyboardInterrupt:
    break

  while True:
    try:
      data = sock.recv(BUF_SIZE)
    except IOError:
      continue
    if not data:
      break
    print(f"数据: {data.decode()}")
    sock.send(f"{ctime()}".encode())
  print("--链接中止--")
  server.close()