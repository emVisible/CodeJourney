import requests

url_list = [
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.e42d2c4d-ad65-4c7a-b0fd-817a1c3bed01&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'bilibili'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.05409d17-5d83-4701-acc1-90430dd3b02c&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'github'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.a8b02093-8d4e-4c13-8405-9dc790041cee&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'youtube'},
  {'url':"https://ts4.cn.mm.bing.net/th?id=ODLS.657636b0-8052-4394-aa13-5dfd0f04003e&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'houdunren'},
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.73f77de4-051f-4cc5-97f1-2558363617d0&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'weixindushu'},
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.0dc18014-3388-4dd0-af06-c7b7a1d04d8f&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'chatgpt'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.f8df3b32-cd9c-44e4-805e-59a6ef600bb6&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'juejin'},
  {'url':"https://ts4.cn.mm.bing.net/th?id=ODLS.15363ffd-e83a-4d1d-acc7-bbb17e5d7d37&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'mdn'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.2bbc2b29-8db3-4387-a668-b5276afc19a9&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'antd'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.2bbc2b29-8db3-4387-a668-b5276afc19a9&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",'name':'element'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.49242dad-29a0-4ca2-9e90-bf42a845e8d8&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'material'},
  {'url':"https://ts4.cn.mm.bing.net/th?id=ODLS.5cce154d-f541-452b-a7f7-38fe772b1482&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'tailwind'},
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.c236ef7a-8329-4208-85b6-bce06ab1f618&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'colors'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.47b57528-58b8-48a8-8c19-3c76b5636d48&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'iconpark'},
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.0adef11b-095c-4c5f-a47a-5815c6307ae1&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'gsap'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.e441828f-0fad-4f73-bd6e-35cc6dd92c64&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'d3'},
  {'url':"https://ts1.cn.mm.bing.net/th?id=ODLS.e9aab341-2008-44ab-ba11-8a97cdfa4786&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'vuerouter'},
  {'url':"https://ts1.cn.mm.bing.net/th?id=ODLS.cb487706-e03b-4302-aafc-f4cc6465ec3a&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'reactrouter'},
  {'url':"https://ts4.cn.mm.bing.net/th?id=ODLS.3a22ed82-ddfe-476c-a472-e60aa399d218&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'redux'},
  {'url':"https://ts2.cn.mm.bing.net/th?id=ODLS.dca2be8b-a87d-48fe-a754-36a62ce9d458&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'pinia'},
  {'url':"https://ts1.cn.mm.bing.net/th?id=ODLS.e4b8b184-2a2a-4067-86a1-7ddabcc15d54&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'ruanyifeng'},
  {'url':"https://ts4.cn.mm.bing.net/th?id=ODLS.31844e55-99c0-4f99-9e15-ebbfee3a553c&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'radio'},
  {'url':"https://ts3.cn.mm.bing.net/th?id=ODLS.e9372439-eb89-4f82-a8a0-60aec84831ad&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'zhihu'},
  {'url':"https://ts1.cn.mm.bing.net/th?id=ODLS.0aa10839-be34-40b7-b9ad-01feb1d418ec&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 'name':'indienova'},
]

headers = {
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}
for item in url_list:
  res = requests.get(item.get('url'), headers=headers)
  with open(f"./helper/{item.get('name')}.png", "wb") as f:
    f.write(res.content)


