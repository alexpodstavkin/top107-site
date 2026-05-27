'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { utmQueryString } from '@/lib/utm'
import { asset } from '@/lib/asset'

export default function RegistrationModal() {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(380)
  const [src, setSrc] = useState<string>('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest('[data-open-register]')
      if (trigger) {
        e.preventDefault()
        // Build iframe URL with fresh UTM at click time.
        const utmQs = utmQueryString()
        // Add a cache-buster so reopen always gets a fresh GetCourse render.
        const base = asset('/register.html')
        const sep = utmQs ? '?' + utmQs + '&t=' : '?t='
        setSrc(base + sep + Date.now())
        setOpen(true)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const data = e.data
      if (data && data.type === 'widget-height' && typeof data.height === 'number') {
        setHeight(Math.max(320, Math.min(900, data.height + 4)))
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Регистрация на лекцию-практикум"
    >
      <div className="modal-card modal-card-wide modal-card-bare" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Закрыть форму">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <iframe
          ref={iframeRef}
          title="Регистрация на лекцию-практикум"
          src={src}
          className="widget-iframe"
          style={{ height }}
          loading="eager"
          /* Allow forms, scripts, popups (GetCourse may open thank-you page) */
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
