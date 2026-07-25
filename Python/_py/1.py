def coro_test():
  print("[System] 程序开始")
  value = yield
  print(f"[System] 协程运行, 收到值:{value}")

ins = coro_test()
next(ins)

data = input("请输入要发送的值")
if data:
  try:
    ins.send(data)
  except:
    pass
else:
  print("发送失败")
  pass

def test(a):
  print(f"收到 a:{a}")
  b = yield a
  print(f"收到 b:{b}")
  c = yield a + b
  print(f"收到 c:{c}")


