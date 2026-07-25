import threading
from socket import socket, AF_INET, SOCK_STREAM
ADDR = ('', 1234)
BUF_SIZE = 1024

tcp_socket = socket(family=AF_INET, type=SOCK_STREAM)
tcp_socket.bind(ADDR)
tcp_socket.listen()

'''
  线程程序
'''
def handle(sock, addr):
  while True:
    data = sock.recv(BUF_SIZE).decode()
    if not data:
      sock.close()
      break
    print(f"[System] 收到数据 {data}")
    sock.send(f"[Python] {data}".encode())
  sock.close()
  print(f"[System] 线程关闭")

'''
  主进程
'''
def main():
  print(f"[System] 服务器等待请求...")
  while True:
    try:
      tcp_extension_sock, addr = tcp_socket.accept()
    except KeyboardInterrupt:
      break

    thread = threading.Thread(target=handle, args=(tcp_extension_sock, addr))
    thread.start()
    print(f"[System] 线程启动")
  print(f"[System] 系统退出")
  tcp_socket.close()

if __name__ == '__main__':
  main()


