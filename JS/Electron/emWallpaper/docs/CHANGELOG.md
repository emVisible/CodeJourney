# Changelog

## v0.2.0 — 2026-07-27

### 新增

- **品牌重塑** — Grapher → Heartstone（创作者资产仓库），SVG Logo
- **国际化 i18n** — 中英文双语支持，设置页语言切换，翻译文件 `i18n/{zh,en}.json`
- **资产仓库** — 四类素材统一浏览：图片/音频/字体/插画，Segmented 类型切换
- **多源支持** — Picsum + Unsplash 图片，Pixabay 免版税音乐/音效，Google Fonts 字体，unDraw 插画
- **音频播放器** — 内嵌 HTML5 Audio，支持时长/分类/许可证信息
- **字体预览** — 字体名称 + 字母展示 + 变体数量
- **紫色主题** — 紫蓝色调 CSS 变量体系，亮/暗双轨完整覆盖
- **语言切换** — 设置页 Select 切换中文/English，localStorage 持久化
- **下载回滚** — 失败时自动清理不完整文件

### 重构

- **设计系统** — `theme/tokens.ts` + CSS 变量 + Tailwind `cv-*` 色阶，全局统一
- **组件架构** — `components/ui/` + `components/layout/` + `components/asset/` 目录分层
- **i18n 系统** — react-i18next + LanguageDetector，全页面文案翻译
- **App.tsx** — 侧边栏 CSS 变量驱动，深色/浅色自适应
- **Settings** — 语言切换 + 深色模式 + 项目管理，AnimatePresence 列表动画

### 修复

- 下载失败时清除损坏的部分文件（`fs.unlinkSync`）
- 下载前自动创建目标目录（`mkdirSync recursive`）

---

## v0.1.0 — 2026-07-27

### 新增

- **批量下载引擎** — Worker Pool 多线程下载，全局并发控制，自动重试，实时速度显示
- **壁纸浏览模块** — Wallhaven 壁纸源接入，右键下载/设为桌面壁纸，分页浏览
- **素材浏览器** — 本地文件浏览，项目分类，ffprobe 视频信息提取
- **项目管理** — 自定义下载分类文件夹，持久化存储
- **任务持久化** — localforage 存储下载记录，重启恢复
- **系统托盘** — 最小化到托盘，后台运行
- **系统通知** — 下载完成系统通知
- **无框窗口** — 自定义标题栏拖拽区域
- **快捷键** — ⌘1-4 切换页面，Esc 返回
- **拖拽下载** — 拖拽 URL 到输入框自动识别
- **页面过渡动画** — Framer Motion 页面切换和任务列表动画
- **Toast 通知** — 下载完成/失败通知
- **错误边界** — React ErrorBoundary 防止白屏崩溃
- **Python 后端** — Sanic API + Scrapy 爬虫

### 修复

- 下载引擎流式写入磁盘，消除大文件内存爆炸问题
- 旧版持久化数据兼容（projects 字段缺失兜底）
- Worker 文件路径 dev/prod 双模式自适应

### 工程

- 合并 emWallpaper 项目，统一代码仓库
- 后端目录拍平 `wallpaper/wallpaper/` → `backend/`
- 提取共享工具函数 `utils/format.ts`
- `yarn dev` 同时启动 Electron + Python 后端（concurrently）
- 分离 `components/`、`hooks/`、`utils/` 目录结构

---

## v0.0.0 — 2026 早期

- Electron + React + TypeScript 脚手架
- 基础多线程分片下载
- 保存路径配置
- Redux + Redux Persist 状态管理
