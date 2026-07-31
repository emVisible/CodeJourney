import { useTranslation } from 'react-i18next'
import { RootState } from '@renderer/store'
import { updatePath, toggleTheme, updateClipboardDetect, setLanguage } from '@renderer/store/config'
import { Button, Input, Select, Switch } from 'antd'
import { FolderOpenOutlined, BulbOutlined, GlobalOutlined, CopyOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

export default function Config() {
  const { t, i18n } = useTranslation()
  const savePath = useSelector((s: RootState) => s.config.savePath)
  const theme = useSelector((s: RootState) => s.config.theme)
  const clipboardDetect = useSelector((s: RootState) => s.config.clipboardDetect) || { enabled: true, bilibili: true, youtube: true }
  const dispatch = useDispatch()

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-base font-semibold mb-6">{t('settings.title')}</h2>
        <div className="space-y-4">
          <div className="cv-card p-4">
            <label className="block text-sm font-medium mb-1.5">{t('settings.savePath')}</label>
            <div className="flex gap-2">
              <Input value={savePath} placeholder={t('settings.savePath')} readOnly className="flex-1" />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button icon={<FolderOpenOutlined />} onClick={async () => {
                  const path = await window.api.checkSavePath()
                  if (path) dispatch(updatePath(path))
                }}>{t('settings.selectFolder')}</Button>
              </motion.div>
            </div>
          </div>

          <div className="cv-card p-4">
            <label className="block text-sm font-medium mb-3">{t('settings.appearance')}</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><BulbOutlined style={{ color: 'var(--color-muted)' }} /><span className="text-sm">{t('settings.darkMode')}</span></div>
                <Switch checked={theme === 'dark'} onChange={() => dispatch(toggleTheme())} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><GlobalOutlined style={{ color: 'var(--color-muted)' }} /><span className="text-sm">{t('settings.language')}</span></div>
                <Select size="small" value={i18n.language} onChange={(v) => { i18n.changeLanguage(v); dispatch(setLanguage(v)) }} className="w-24"
                  options={[{ value: 'zh', label: '中文' }, { value: 'en', label: 'English' }]} />
              </div>
            </div>
          </div>

          <div className="cv-card p-4">
            <label className="block text-sm font-medium mb-3">{t('settings.clipboardDetect')}</label>
            <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>{t('settings.clipboardDetectHint')}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><CopyOutlined style={{ color: 'var(--color-muted)' }} /><span className="text-sm">{t('settings.clipboardDetectEnable')}</span></div>
                <Switch checked={clipboardDetect.enabled} onChange={(v) => dispatch(updateClipboardDetect({ enabled: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: clipboardDetect.enabled ? 'var(--color-fg)' : 'var(--color-muted)', marginLeft: 24 }}>B站 (bilibili)</span>
                <Switch size="small" disabled={!clipboardDetect.enabled} checked={clipboardDetect.bilibili} onChange={(v) => dispatch(updateClipboardDetect({ bilibili: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: clipboardDetect.enabled ? 'var(--color-fg)' : 'var(--color-muted)', marginLeft: 24 }}>YouTube</span>
                <Switch size="small" disabled={!clipboardDetect.enabled} checked={clipboardDetect.youtube} onChange={(v) => dispatch(updateClipboardDetect({ youtube: v }))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
