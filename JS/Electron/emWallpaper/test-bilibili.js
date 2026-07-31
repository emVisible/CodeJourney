/**
 * CraftVault B站功能自动化测试脚本
 * 用法: node test-bilibili.js
 * 输出: test-results.md
 */
const { execFile } = require('child_process')
const fs = require('fs')
const path = require('path')

const TEST_BVID = 'BV1GJ411x7h7'
const BILI_API = 'https://api.bilibili.com/x/web-interface/view'
const BILI_PLAYURL = 'https://api.bilibili.com/x/player/playurl'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const results = []
const log = (msg) => { console.log(msg); results.push(msg) }
const pass = (test) => log(`✅ ${test}`)
const fail = (test, detail) => log(`❌ ${test}${detail ? ': ' + detail : ''}`)
const hr = () => log('---')

async function fetchJSON(url, headers = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 15000)
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers }, signal: ctrl.signal })
    clearTimeout(t)
    return await res.json()
  } finally { clearTimeout(t) }
}

async function testVideoInfo() {
  log('\n## 1. 视频信息 API')
  try {
    const data = await fetchJSON(`${BILI_API}?bvid=${TEST_BVID}`, { Referer: 'https://www.bilibili.com' })
    if (data.code !== 0) return fail('视频信息', `code=${data.code} msg=${data.message}`)
    pass(`视频标题: ${data.data.title}`)
    pass(`UP主: ${data.data.owner?.name}`)
    pass(`时长: ${data.data.duration}秒`)
    pass(`分P数: ${data.data.pages?.length || 1}`)
    return data.data
  } catch (e) { fail('视频信息', e.message); return null }
}

async function testPlayUrl(bvid, cid) {
  log('\n## 2. 播放地址 API')
  try {
    const url = `${BILI_PLAYURL}?bvid=${bvid}&cid=${cid}&qn=116&fnval=4048&fourk=1`
    const data = await fetchJSON(url, { Referer: 'https://www.bilibili.com' })
    if (data.code !== 0) return fail('播放地址', `code=${data.code} msg=${data.message}`)
    const dash = data.data?.dash
    const support = data.data?.support_formats || []
    if (dash) {
      pass(`DASH 视频流: ${dash.video?.length || 0} 个`)
      pass(`DASH 音频流: ${dash.audio?.length || 0} 个`)
      dash.video?.slice(0, 3).forEach(v => log(`  - ${v.width}x${v.height} ${v.codecs?.split('.')[0]} id=${v.id}`))
      dash.audio?.slice(0, 2).forEach(a => log(`  - ${a.codecs?.split('.')[0]} ${Math.round((a.bandwidth||0)/1000)}kbps id=${a.id}`))
    } else {
      pass(`支持格式: ${support.length} 个`)
    }
    return data.data
  } catch (e) { fail('播放地址', e.message); return null }
}

async function testDownloadUrl(videoUrl) {
  log('\n## 3. 下载链接可达性')
  if (!videoUrl) return fail('下载链接', '无可用URL')
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 10000)
    const res = await fetch(videoUrl, {
      method: 'HEAD',
      headers: { 'User-Agent': UA, Referer: 'https://www.bilibili.com' },
      signal: ctrl.signal
    })
    clearTimeout(t)
    if (res.ok) {
      const cl = res.headers.get('content-length')
      pass(`HEAD 响应: HTTP ${res.status}, Content-Length: ${cl || 'unknown'}`)
      return parseInt(cl || '0')
    }
    fail('下载链接', `HTTP ${res.status}`)
    return 0
  } catch (e) {
    if (e.name === 'AbortError') fail('下载链接', '超时 10s')
    else fail('下载链接', e.message)
    return 0
  }
}

async function testYTDLP() {
  log('\n## 4. yt-dlp 可用性')
  try {
    await new Promise((resolve, reject) => {
      execFile('yt-dlp', ['--version'], { timeout: 10000 }, (err, stdout) => {
        if (err) reject(err); else resolve(stdout.trim())
      })
    })
    pass('yt-dlp 已安装')
    return true
  } catch (e) {
    fail('yt-dlp', e.message.includes('ENOENT') ? '未安装 (brew install yt-dlp)' : e.message)
    return false
  }
}

async function testFFmpeg() {
  log('\n## 5. FFmpeg 可用性')
  try {
    await new Promise((resolve, reject) => {
      execFile('ffmpeg', ['-version'], { timeout: 10000 }, (err, stdout) => {
        if (err) reject(err)
        else {
          const v = stdout.split('\n')[0]
          resolve(v)
        }
      })
    })
    pass('FFmpeg 已安装')
    return true
  } catch (e) {
    fail('FFmpeg', e.message.includes('ENOENT') ? '未安装' : e.message)
    return false
  }
}

async function testAppHealth() {
  log('\n## 6. CraftVault 后端健康检查')
  try {
    const data = await fetchJSON('http://127.0.0.1:8000/api/health')
    pass(`后端状态: ${data.status}`)
    return true
  } catch (e) {
    fail('后端', '未启动 (yarn dev)')
    return false
  }
}

async function testAppSources() {
  log('\n## 7. 素材源检查')
  try {
    const data = await fetchJSON('http://127.0.0.1:8000/api/sources')
    for (const g of data) {
      for (const s of g.sources) {
        if (s.available) pass(`${g.type}/${s.id}: ${s.name}`)
        else log(`⚠️ ${g.type}/${s.id}: ${s.name} (不可用)`)
      }
    }
    return true
  } catch (e) { fail('素材源', e.message); return false }
}

function testPathPermissions() {
  log('\n## 8. 存储路径权限')
  const userData = process.env.HOME + '/Library/Application Support/craftvault/store'
  try {
    if (!fs.existsSync(userData)) fs.mkdirSync(userData, { recursive: true })
    const tf = path.join(userData, '.test-write')
    fs.writeFileSync(tf, 'test')
    fs.unlinkSync(tf)
    pass(`存储路径可写: ${userData}`)
    return true
  } catch (e) {
    fail('存储路径', e.message)
    return false
  }
}

async function main() {
  log('# CraftVault B站功能测试报告')
  log(`> 测试视频: BV1ATMDzNEQr\n> 时间: ${new Date().toISOString()}\n`)

  await testYTDLP()
  await testFFmpeg()
  await testAppHealth()
  await testAppSources()
  testPathPermissions()

  const info = await testVideoInfo()
  if (info) {
    const cid = info.pages?.[0]?.cid || info.cid
    const playData = await testPlayUrl(info.bvid, cid)
    const dash = playData?.dash
    let videoUrl = ''
    if (dash?.video?.length > 0) videoUrl = dash.video[0].baseUrl || dash.video[0].base_url
    await testDownloadUrl(videoUrl)
  }

  log('\n## 9. 问题汇总')

  const failCount = results.filter(l => l.startsWith('❌')).length
  const passCount = results.filter(l => l.startsWith('✅')).length

  if (failCount === 0) log('🎉 所有测试通过！')
  else log(`⚠️ ${failCount} 项失败, ${passCount} 项通过`)

  if (failCount > 0) {
    log('\n### 建议修复:')
    results.filter(l => l.startsWith('❌')).forEach(l => {
      if (l.includes('未安装')) log(`  - 安装缺失工具: ${l.split('未安装')[0].split(' ').pop()}`)
      else if (l.includes('超时')) log(`  - 网络超时, 可能需要代理/VPN`)
      else if (l.includes('HTTP')) log(`  - API 返回非200, 检查Cookie/Referer`)
    })
  }

  fs.writeFileSync(path.join(__dirname, 'test-results.md'), results.join('\n'))
  log('\n📄 结果已写入 test-results.md')
}

main().catch(e => { log(`\n💥 测试崩溃: ${e.message}`); fs.writeFileSync(path.join(__dirname, 'test-results.md'), results.join('\n')) })
