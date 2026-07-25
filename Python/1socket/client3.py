from socket import socket, AF_INET, SOCK_STREAM

BUF_SIZE = 1024
ADDR = ('localhost', 1234)
tcp_client = socket(family=AF_INET, type=SOCK_STREAM)
tcp_client.connect(ADDR)

while True:
  data = input("[Client] 请输入内容:")
  if not data:
    break;

  tcp_client.send(data.encode())
  data = tcp_client.recv(BUF_SIZE)
  if not data:
    break;
  print(f"[Client] 收到数据 {data.decode()}")

tcp_client.close()