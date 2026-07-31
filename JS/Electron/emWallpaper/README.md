# Heartstone

> *Take chances, make mistakes. Follow your heart.*
> — *Bicentennial Man*

A creator's local asset vault. From Bilibili video capture to free asset browsing — manage all your creative resources in one place.

[中文文档](README_zh.md)

## Features

- **Bilibili Video Capture** — Paste a link, pick quality, one-click download. yt-dlp handles audio/video merging and codec compatibility automatically.
- **Asset Library** — Picsum / Pexels / Pixabay images, Pixabay music, Mixkit sound effects, Google Fonts, original illustrations. Multi-source switching with local caching.
- **Asset Management** — Project-based folder organization, three view modes (grid/compact/detail), image thumbnails, inline audio playback, metadata tracing (source, download time, SHA256 hash).
- **Batch Download** — Multi-URL drag & drop, Worker Pool multi-threaded engine, real-time speed display, chunk retry on failure.
- **Internationalization** — Chinese / English bilingual, one-click language switch in Settings.
- **Dark Mode** — Lavender color palette, CSS variable-driven, full component coverage.
- **Keyboard Shortcuts** — ⌘1-4 to switch pages, Esc to go back.
- **Window Memory** — Saves position and size on close, restores on next launch.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Shell | Electron 28 |
| Frontend | React 18 + TypeScript 5 + Ant Design 5 + Tailwind CSS |
| Animation | Framer Motion |
| State | Redux Toolkit + Redux Persist |
| i18n | react-i18next |
| Build | electron-vite 2 + Vite 5 |
| Packaging | electron-builder |
| Bilibili Engine | yt-dlp |
| Asset Backend | Python Sanic |

## Prerequisites

- Node.js >= 18
- Yarn
- Python >= 3.9 (asset library backend)
- yt-dlp (Bilibili video download): `brew install yt-dlp`
- FFmpeg (video metadata / audio-video merging)

## Quick Start

```bash
yarn                                      # Install frontend dependencies
python3 -m venv backend/.venv             # Create Python virtual environment
source backend/.venv/bin/activate
pip install -r backend/requirements.txt  # Install Python dependencies
yarn dev                                  # Start dev (Electron + Python backend)
```

## Project Structure

```
heartstone/
├── src/
│   ├── main/
│   │   ├── index.ts          # Window management + tray
│   │   ├── ipcMain.ts        # IPC registration hub
│   │   ├── ipc/              # IPC modules
│   │   │   ├── assets.ts     # File system operations
│   │   │   ├── download.ts   # Download engine
│   │   │   ├── bilibili.ts   # Bilibili API + yt-dlp
│   │   │   └── proxy.ts      # Image proxy + URL scanner
│   │   ├── wallpaper.ts      # Right-click download + set wallpaper
│   │   ├── workerPool.ts     # Worker thread pool
│   │   └── worker.js         # Download worker
│   ├── preload/              # Preload security bridge
│   └── renderer/src/
│       ├── components/       # UI components
│       ├── hooks/            # Custom hooks
│       ├── i18n/             # Translation files (zh/en)
│       ├── theme/            # Design tokens
│       ├── view/             # Pages
│       ├── store/            # Redux state
│       ├── services/         # Persistence services
│       └── utils/            # Utilities
├── backend/                  # Python asset backend
│   ├── server.py             # Sanic API
│   └── sources/              # Data sources
├── resources/                # App icon
└── docs/                     # Documentation & principles
```

## License

MIT
