import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DownloadOutlined, FolderOpenOutlined, SettingOutlined, MinusOutlined, BorderOutlined, CloseOutlined, BlockOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { updatePath } from './store/config'
import { setUrlsText, setAutoScan } from './store/session'
import type { RootState } from './store'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useKeyboardShortcuts } from './hooks/useKeyboard'
import { Spinner } from './components/ui/Card'
import Logo from './components/ui/Logo'
import DownloadStatusBar from './components/DownloadStatusBar'

const Download = lazy(() => import('./view/Download'))
const AssetBrowser = lazy(() => import('./view/AssetBrowser'))
const Config = lazy(() => import('./view/Config'))

const pageVariants = { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } }
const pageTransition = { duration: 0.15, ease: 'easeInOut' as const }

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="h-full">{children}</motion.div>
  )
}

function WindowControls() {
  const { t } = useTranslation()
  const [maxed, setMaxed] = useState(false)
  useEffect(() => { window.api.isMaximized().then(setMaxed) }, [])

  const btn = 'w-9 h-8 flex items-center justify-center text-xs bg-transparent border-0 cursor-pointer nodrag transition-colors'
  return (
    <div className="flex items-center h-full">
      <button className={btn} style={{ color: 'var(--color-muted)' }} onClick={() => window.api.minimize()} title={t('window.minimize')}>
        <MinusOutlined />
      </button>
      <button className={btn} style={{ color: 'var(--color-muted)' }} onClick={() => { window.api.maximize(); setMaxed(!maxed) }} title={t('window.maximize')}>
        {maxed ? <BlockOutlined /> : <BorderOutlined />}
      </button>
      <button className={btn} style={{ color: 'var(--color-muted)' }} onClick={() => window.api.closeWindow()}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-danger)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        title={t('window.close')}>
        <CloseOutlined />
      </button>
    </div>
  )
}

function App(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const savePath = useSelector((s: RootState) => s.config.savePath)
  const clipboardDetect = useSelector((s: RootState) => s.config.clipboardDetect)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!savePath) setShowOnboarding(true)
  }, [savePath])

  const handleSelectFolder = async () => {
    const dir = await window.api.checkSavePath()
    if (dir) { dispatch(updatePath(dir)); setShowOnboarding(false) }
  }

  useEffect(() => {
    const unsubParse = window.api.onClipboardParse((data) => {
      dispatch(setUrlsText(data.url))
      dispatch(setAutoScan(true))
      navigate('/')
    })
    window.api.startClipboardMonitor()

    const unsubProgress = window.api.onDownloadProgress((data) => {
      if (data.phase === 'complete') playBeep()
    })

    return () => { unsubParse(); unsubProgress(); window.api.stopClipboardMonitor() }
  }, [dispatch, navigate])

  useEffect(() => {
    if (clipboardDetect) window.api.setClipboardConfig(clipboardDetect)
  }, [clipboardDetect])

  useKeyboardShortcuts({ 'mod+1': () => navigate('/'), 'mod+2': () => navigate('/assets'), 'mod+,': () => navigate('/config'), escape: () => navigate(-1) })

  const navItems = [
    { to: '/', icon: DownloadOutlined, label: t('nav.download'), shortcut: '1' },
    { to: '/assets', icon: FolderOpenOutlined, label: t('nav.assets'), shortcut: '2' },
    { to: '/config', icon: SettingOutlined, label: t('nav.settings'), shortcut: ',' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <ErrorBoundary>
      <Modal open={showOnboarding} closable={false} footer={null} centered width={420}>
        <div className="text-center py-4 space-y-4">
          <Logo size={48} />
          <h2 className="text-lg font-semibold">{t('settings.firstRunTitle')}</h2>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{t('settings.firstRunDesc')}</p>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => setShowOnboarding(false)}
              className="px-4 py-2 rounded-cv-sm text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>{t('settings.skip')}</button>
            <button onClick={handleSelectFolder}
              className="px-4 py-2 rounded-cv-sm text-sm font-medium border-0 cursor-pointer"
              style={{ background: 'var(--color-primary)', color: 'white' }}>{t('settings.selectFolder')}</button>
          </div>
        </div>
      </Modal>
      <div className="h-screen flex" style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
        <aside className="w-[220px] shrink-0 flex flex-col select-none drag" style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 nodrag" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Link to="/" className="flex items-center gap-2.5 no-underline" style={{ color: 'var(--color-fg)' }}>
              <Logo size={26} />
              <span className="font-semibold text-[15px] tracking-tight">{t('app.name')}</span>
            </Link>
          </div>
          <nav className="flex-1 py-3 px-3 space-y-0.5 nodrag">
            {navItems.map(({ to, icon: Icon, label, shortcut }) => (
              <motion.div key={to} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
                <Link to={to} className={`flex items-center justify-between px-3 py-2 rounded-cv text-[14px] no-underline transition-colors duration-150 group ${isActive(to) ? 'font-medium' : 'opacity-75 hover:opacity-100'}`}
                  style={{ background: isActive(to) ? 'var(--color-primary-light)' : 'transparent', color: isActive(to) ? 'var(--color-primary)' : 'var(--color-fg)' }}>
                  <span className="flex items-center gap-2.5"><Icon />{label}</span>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded-cv-sm" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'monospace' }}>⌘{shortcut}</kbd>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="px-5 py-3 space-y-2 nodrag" style={{ borderTop: '1px solid var(--color-border)' }}>
            <button onClick={() => window.api.quit()} className="text-left text-[11px] hover:underline cursor-pointer bg-transparent border-0 p-0"
              style={{ color: 'var(--color-danger)' }}>
              {t('app.quit')}
            </button>
            <div className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
              {t('settings.version')}
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden" style={{ background: 'var(--color-bg)' }}>
          <div className="h-9 flex justify-end items-center drag" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <WindowControls />
          </div>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner size={28} /></div>}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageWrapper><Download /></PageWrapper>} />
                  <Route path="/assets" element={<PageWrapper><AssetBrowser /></PageWrapper>} />
                  <Route path="/config" element={<PageWrapper><Config /></PageWrapper>} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </div>
          <DownloadStatusBar />
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = ctx.currentTime

    const playTone = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.25, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
      osc.start(start)
      osc.stop(start + dur)
    }

    playTone(1047, now, 0.15)
    playTone(1319, now + 0.08, 0.2)

    setTimeout(() => ctx.close(), 400)
  } catch {}
}
