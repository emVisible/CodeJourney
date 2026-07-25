from selectors import DefaultSelector, EVENT_READ, EVENT_WRITE
from urllib.parse import urlparse
import os
import socket

is_stopped = False
selector = DefaultSelector()
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

class Future:
  def __init__(self) -> None:
    self.value = None
    self.callbacks = []
  def add_callback(self, callback):
    self.callbacks.append(callback)
  def set_value(self, value):
    self.value = value
    for cb in self.callbacks:
      cb(self)

class Task:
  def __init__(self, coro) -> None:
    self.coro = coro
    f = Future()
    self.step(f)

  def step(self, future):
    new_future = self.coro.send(future.value)
    new_future.add_callback(self.step)

def loop():
  while not is_stopped:
    event = selector.select()
    for event_key, _ in event:
      callback = event_key.data
      callback()


class Crawler:
  def __init__(self, url) -> None:
    self.data = b""
    self._url = url
    self.url = urlparse(url)
    self.sock = socket.socket()
    self.sock.setblocking(False)
    try:
      self.sock.connect((self.url.netloc, 80))
    except ConnectionError:
      pass

  def fetch(self):
    f = Future()

    def write():
      f.set_value(None)
    selector.register(self.sock.fileno(), EVENT_WRITE, write)
    yield f
    selector.unregister(self.sock.fileno())

    data = f"GET {self.url.netloc} HTTP/1.1\r\nHOST: {self.url.path} \r\nConnection: close\r\n\r\n".encode()
    self.sock.send(data)
    def read():
      f.set_value(self.sock.recv(4096))
    selector.register(self.sock.fileno(), EVENT_READ, read)
    while True:
      f = Future()
      value = yield f
      if value:
        self.data += value
      else:
        urls.remove(self._url)
        if not urls:
          is_stopped = True
        selector.unregister(self.sock.filno())
        self.sock.close()
        with open(f"{os.getcwd()}/async_IO/{self.url.path[20:]}", "wb") as file:
          file.write(self.data.split(b"\r\n\r\n")[1])
        break



def main():
  os.system('mkdir -p async_IO')
  for url in urls:
    crawler = Crawler(url)
    Task(crawler.fetch())
  loop()