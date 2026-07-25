from functools import wraps
from inspect import getgeneratorstate

'''
  预激协程装饰器
'''
def coroutine(func):
  @wraps(func)
  def inner(*args, **kwargs):
    res = func(*args, **kwargs)
    next(res)
    return res
  return inner

'''
  Client
'''
@coroutine
def averager():
  res = 0
  count = 0
  average = None
  while True:
    tmp = yield average
    res += tmp
    count += 1
    average = res / count

coro_average = averager()
state = getgeneratorstate(coro_average)
print(state) # GEN_SUSPENDED
print(coro_average.send(10))
print(coro_average.send(20))
print(coro_average.send(30))