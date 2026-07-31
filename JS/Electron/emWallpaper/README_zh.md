# Heartstone（心之石）

> *去冒险，去犯错。倾听你的心声。*
> — *《机器管家》*

创作者的本地资产仓库。从 B 站视频采集到免费素材浏览，一站式管理你的创作资源。

[English](README.md)

## 功能

- **B 站视频采集** — 粘贴链接，选画质，一键下载。yt-dlp 引擎自动处理音视频合并、编码兼容。
- **素材库浏览** — Picsum / Pexels / Pixabay 图片，Pixabay 音乐，Mixkit 音效，Google Fonts 字体，原创插画。多源切换，本地缓存。
- **资产管理** — 项目分类文件夹，网格/紧凑/详细三种视图，图片缩略图预览，音频内嵌播放，元数据追溯（来源、下载时间、SHA256 校验）。
- **批量下载** — 多 URL 拖拽，Worker Pool 多线程引擎，实时速度显示，断 chunk 自动重试。
- **国际化** — 中/英双语，设置页一键切换。
- **深色模式** — 薰衣草调色板，CSS 变量驱动，全组件覆盖。
- **快捷键** — ⌘1-4 切换页面，Esc 返回。
- **窗口记忆** — 关闭时保存位置和尺寸，下次启动恢复。

## 技术栈

| 层 | 技术 |
|---|------|
| 桌面框架 | Electron 28 |
| 前端 | React 18 + TypeScript 5 + Ant Design 5 + Tailwind CSS |
| 动画 | Framer Motion |
| 状态管理 | Redux Toolkit + Redux Persist |
| 国际化 | react-i18next |
| 构建 | electron-vite 2 + Vite 5 |
| 打包 | electron-builder |
| B 站引擎 | yt-dlp |
| 素材后端 | Python Sanic |

## 环境要求

- Node.js >= 18
- Yarn
- Python >= 3.9（素材库后端）
- yt-dlp（B 站视频下载）：`brew install yt-dlp`
- FFmpeg（视频信息提取 / 音视频合并）

## 快速开始

```bash
yarn                                      # 安装前端依赖
python3 -m venv backend/.venv             # 创建 Python 虚拟环境
source backend/.venv/bin/activate
pip install -r backend/requirements.txt  # 安装 Python 依赖
yarn dev                                  # 启动开发环境（Electron + Python 后端）
```

## 项目结构

```
heartstone/
├── src/
│   ├── main/
│   │   ├── index.ts          # 窗口管理 + 托盘
│   │   ├── ipcMain.ts        # IPC 注册中心
│   │   ├── ipc/              # IPC 模块
│   │   │   ├── assets.ts     # 文件系统操作
│   │   │   ├── download.ts   # 下载引擎
│   │   │   ├── bilibili.ts   # B 站 API + yt-dlp
│   │   │   └── proxy.ts      # 图片代理 + URL 扫描
│   │   ├── wallpaper.ts      # 右键下载 + 设壁纸
│   │   ├── workerPool.ts     # Worker 线程池
│   │   └── worker.js         # 下载 Worker
│   ├── preload/              # 预加载安全桥
│   └── renderer/src/
│       ├── components/       # UI 组件
│       ├── hooks/            # 自定义 Hooks
│       ├── i18n/             # 中英文翻译文件
│       ├── theme/            # 设计令牌
│       ├── view/             # 页面
│       ├── store/            # Redux 状态
│       ├── services/         # 持久化服务
│       └── utils/            # 工具函数
├── backend/                  # Python 素材后端
│   ├── server.py             # Sanic API
│   └── sources/              # 数据源
├── resources/                # 应用图标
└── docs/                     # 文档与原则
```

## 许可证

MIT
