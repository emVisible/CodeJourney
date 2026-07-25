'''
  单线程, 阻塞
'''
import socket
import os
from urllib.parse import urlparse

urls = ['https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bc51bc53f634bf79b5de5c8b9810817~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b95ac8571ba403180743495ed56e492~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459c6c73887a4206a33b13ef23988809~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80701ade82d345cd8aa0b08fef008fe1~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99855ed1f79c456f9fdcd83ce5cff4f2~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c4bd38c2fe3434587025748d051362e~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80cd2a1d165b43beb6234d893ce391e2~tplv-k3u1fbpfcp-watermark.image',
        'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea18df95f26f4314a0a36d11d4a067d0~tplv-k3u1fbpfcp-watermark.image',
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095c342a796c411cad1800396746bdaf~tplv-k3u1fbpfcp-watermark.image',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3769e4d468a4f64a1e2879f94ad742b~tplv-k3u1fbpfcp-watermark.image'
]

class Crawler():
  LIMIT_SIZE = 1024
  def __init__(self, url:str) -> None:
    self.sock = socket.socket()
    self.data = b""
    self._url = url
    self.url = urlparse(url)

  def fetch(self) -> None:
    self.createDir()
    self.sendRequest()
    self.recieveData()
    self.saveFile()
    self.closeSock()

  def createDir(self) -> None:
    os.system("mkdir -p __temp")

  def sendRequest(self):
    self.sock.connect((self.url.netloc, 80))
    request = f"GET {self.url.path} HTTP/1.1\r\nHOST: {self.url.netloc}\r\nConnection: close\r\n\r\n".encode()
    self.sock.send(request)
  def closeSock(self):
    self.sock.close()

  def recieveData(self):
    while True:
      data = self.sock.recv(self.LIMIT_SIZE)
      if data:
        self.data += data
      else:
        print(f"[Request] {self.url[0:8]}... 接收成功")
        break

  def saveFile(self) ->None:
    with open(f"__temp/{self.url.path[20:]}", "wb") as f:
      f.write(self.data.split(b'\r\n\r\n')[1])
    print(f"[Save] {self.url[0:8]}... 保存成功")

def main():
  try:
    for url in urls:
      crawler = Crawler(url=url)
      crawler.fetch()
  except IOError:
    print("[System] Error")
  print("---爬取完毕---")

if __name__ == '__main__':
  main()

