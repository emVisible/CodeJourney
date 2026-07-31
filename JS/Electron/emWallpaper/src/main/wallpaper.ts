import { writeFileSync } from 'fs'

const HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

export async function downloadFile(url: string, filePath: string, provider?: string): Promise<string> {
  const headers = provider === 'pexels'
    ? { ...HEADERS, 'Referer': 'https://pexels.com' }
    : HEADERS
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 60000)
  try {
    const res = await fetch(url, { headers, redirect: 'follow', signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 100) throw new Error('下载文件为空')
    writeFileSync(filePath, buffer)
    return filePath
  } finally {
    clearTimeout(timer)
  }
}
