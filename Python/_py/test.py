res = 0
def server():
  data = yield res
  res += data

