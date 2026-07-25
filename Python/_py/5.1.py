import threading
import time
import random

class Foo(threading.Thread):
  def __init__(self, name) -> None:
    threading.Thread.__init__(self)
    self.name = name
    self.data = [12,31,24,12,4,355,1]
  # def __iter__(self):
  #   yield 1
  #   yield 2
  def __getitem__(self, index):
    return self.data[index]

  def run(self) -> None:
    time.sleep(random.randrange(1,4))
    print(f"{self.name}")


ins1 = Foo("^^^")
ins2 = Foo("&&&")
ins3 = Foo("***")

instances = [ins1, ins2, ins3]

instance_list = []

for i in instances:
  i.start()
  instance_list.append(i)

for i in instance_list:
  i.join()
print("End")
