import React from "react";

export interface DataType {
  key: React.Key;
  invoicesNumber: string;
  downloadStatus: string;
  extractStatus: string;
  pushStatus: string;
  downloadTime: string;
  attachment: string[]
}
const mockData: DataType[] = [
  {
    'key': '1',
    "invoicesNumber": "123456",
    "downloadStatus": "下载中",
    "extractStatus": "待抽取",
    "pushStatus": "待推送",
    "downloadTime": "2024-05-21 11:29:04",
    attachment: [
      "附件1",
      "附件2",
      "附件3",
    ]
  },
  {
    'key': '2',
    "invoicesNumber": "654321",
    "downloadStatus": "下载失败",
    "extractStatus": "抽取中",
    "pushStatus": "待推送",
    "downloadTime": "2024-05-22 14:45:00",
    attachment: [
      "附件1",
    ]
  },
  {
    'key': '3',
    "invoicesNumber": "789012",
    "downloadStatus": "下载失败",
    "extractStatus": "待抽取",
    "pushStatus": "待推送",
    "downloadTime": "2024-05-23 09:12:33",
    attachment: []
  },
  {
    'key': '4',
    "invoicesNumber": "345678",
    "downloadStatus": "下载中",
    "extractStatus": "待抽取",
    "pushStatus": "已推送",
    "downloadTime": "2024-05-24 15:20:45",
    attachment: []
  },
  {
    'key': '5',
    "invoicesNumber": "901234",
    "downloadStatus": "下载完成",
    "extractStatus": "待抽取",
    "pushStatus": "待推送",
    "downloadTime": "2024-05-21 07:55:12",
    attachment: []
  },
  {
    'key': '6',
    "invoicesNumber": "567890",
    "downloadStatus": "部分下载成功",
    "extractStatus": "抽取失败",
    "pushStatus": "",
    "downloadTime": "2024-05-22 10:33:27",
    attachment: [
      "附件1",
      "附件2",
    ]
  },
  {
    'key': '7',
    "invoicesNumber": "234567",
    "downloadStatus": "下载失败",
    "extractStatus": "待抽取",
    "pushStatus": "部分推送成功",
    "downloadTime": "",
    attachment: [
      "附件1",
    ]
  },
  {
    'key': '8',
    "invoicesNumber": "234567",
    "downloadStatus": "下载失败",
    "extractStatus": "待抽取",
    "pushStatus": "推送失败",
    "downloadTime": "",
    attachment: [
      "附件1",
    ]
  },
]


export default mockData
