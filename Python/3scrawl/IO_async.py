import socket
import os
import time
from selectors import DefaultSelector, EVENT_READ, EVENT_WRITE
from urllib.parse import urlparse

urls = ['https://dn-simplecloud.shiyanlou.com/ncn1.jpg',
        'https://dn-simplecloud.shiyanlou.com/ncn110.jpg',
        'https://dn-simplecloud.shiyanlou.com/ncn109.jpg',
        'https://dn-simplecloud.shiyanlou.com/1548126810319.png',
        'https://dn-simplecloud.shiyanlou.com/1517282865454.png',
        'https://dn-simplecloud.shiyanlou.com/1543913883545.png',
        'https://dn-simplecloud.shiyanlou.com/1502778396172.png',
        'https://dn-simplecloud.shiyanlou.com/1540965522764.png',
        'https://dn-simplecloud.shiyanlou.com/1546500900109.png',
        'https://dn-simplecloud.shiyanlou.com/1547620906601.png'
]
selector = DefaultSelector()
STOP_SIG = False

'''
  数据转移
'''
class Future:
  def __init__(self) -> None:
    self.value = None
    self.step_list = []
  def add_done_callback(self, func):
    self.step_list.append(func)
  def set_value(self,val):
    self.value = val
    for func in self.step_list:
      func(self)

'''
  爬虫
'''
class Crawler:
  def __init__(self, url) -> None:
    self.data = b""
    self.url = urlparse(url)
    self._url = url

  def fetch(self):
    self.sock = socket.socket()
    self.sock.setblocking(False)
    start_time = time.time()
    global STOP_SIG
    try:
      self.sock.connect((self.url.netloc, 80))
    except BlockingIOError:
      pass

    f = Future()
    def writable():
      f.set_value(None)

    selector.register(self.sock.fileno(), EVENT_WRITE, writable)
    yield f
    selector.unregister(self.sock.fileno())
    data = f"GET {self.url.path} HTTP/1.1\r\nHost: {self.url.netloc}\r\nConnection: close\r\n\r\n"
    self.sock.send(data.encode())

    def readable():
      f.set_value(self.sock.recv(4096))
    selector.register(self.sock.fileno(), EVENT_READ, readable)
    while True:
      f = Future()
      value = yield f
      if value:
        self.data += value
      else:
        urls.remove(self._url)
        if not urls:
          STOP_SIG = True
        selector.unregister(self.sock.fileno())
        self.sock.close()
        with open(f"{os.getcwd()}/async_IO/{self.url.path}", "wb") as file:
          file.write(self.data.split(b"\r\n\r\n")[1])
        print(f"URL: {self._url[0:10]}...\n, 耗时: {time.time() - start_time}s")
        break

class Task:
  def __init__(self, coro) -> None:
    self.coro = coro
    f = Future()
    self.step(f)
  def step(self, future) -> None:
    try:
      new_future = self.coro.send(future.value)
    except StopIteration:
      return
    new_future.add_done_callback(self.step)

def loop():
  while not STOP_SIG:
    events = selector.select()
    for event_key,_ in events:
      callback = event_key.data
      callback()

def main():
  start_time = time.time()
  for url in urls:
    crawler = Crawler(url)
    Task(crawler.fetch())
  loop()
  print(f"总耗时: {time.time() - start_time}")

if __name__ == '__main__':
  main()