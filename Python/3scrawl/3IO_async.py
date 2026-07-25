'''
  异步IO
  事件循环 + 回调
'''
from selectors import DefaultSelector, EVENT_READ, EVENT_WRITE
import os
import socket
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

class Stop():
  def __init__(self) -> None:
    self.is_stop = False
  def stop(self)->None:
    self.is_stop = True

signal = Stop()
selector = DefaultSelector()

class Crawler():
  LIMIT_SIZE = 1024
  def __init__(self, url) -> None:
    self.sock = socket.socket()
    self.sock.setblocking(False)

    self.data = b""
    self._url = url
    self.url = urlparse(self._url)
  def fetch(self):

    try:
      self.sock.connect((self.url.netloc, 80))
    except BlockingIOError:
      pass

    # 注册到异步事件中
    selector.register(self.sock.fileno(), EVENT_WRITE, self.write)
  def write(self, key):
    selector.unregister(key.fd)

    request = f"GET {self.url.path} HTTP/1.1\r\nHOST: {self.url.netloc}\r\nConnection: close\r\n\r\n".encode()
    self.sock.send(request)

    selector.register(self.sock.fileno(), EVENT_READ, self.read)

  def read(self, key):
    data = self.sock.recv(102400)
    if data:
      self.data += data
    else:
      selector.unregister(key.fd)
      self.saveFile()
      self.closeSock()
      urls.remove(self._url)
      # 如果所有的url都处理完毕, 设置停止信号为True
      if not urls:
        signal.stop()

  def saveFile(self) ->None:
    with open(f"__temp/{self.url.path[20:]}", "wb") as f:
      f.write(self.data.split(b'\r\n\r\n')[1])
    print(f"[Save] {self.url[0:8]}... 保存成功")
  def closeSock(self):
    self.sock.close()

# 事件循环
def eventLoop():
  while not signal.is_stop:
    events = selector.select()
    for event_key,_ in events:
      callback = event_key.data
      callback(event_key)
def createDir() -> None:
  os.system("mkdir -p __temp")

def main():
  # 注册-Regist
  createDir()
  for url in urls:
    crawler = Crawler(url)
    crawler.fetch()

  # 处理-Handle
  eventLoop()
  print("[System] 事件循环处理完毕")

if __name__ == '__main__':
  main()
