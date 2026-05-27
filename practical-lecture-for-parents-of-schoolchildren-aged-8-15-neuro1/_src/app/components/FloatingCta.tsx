'use client'

import { useEffect, useRef } from 'react'
import { hero } from '@/lib/content'
import { IconArrow } from './icons'

export default function FloatingCta() {
  const ref = useRef<HTMLDivElement>(null)
  const lastVisibleRef = useRef<boolean | null>(null)

  useEffect(() => {
    const floatCta = ref.current
    if (!floatCta) return

    const heroEl = document.getElementById('top')
    const registerEl = document.getElementById('register')
    const altEl = document.getElementById('altCta')
    const conclusionEl = document.getElementById('researchConclusion')

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches
    const hidden = () =>
      isMobile() ? 'translateY(24px)' : 'translateX(-50%) translateY(24px)'
    const shown = () => (isMobile() ? 'translateY(0)' : 'translateX(-50%) translateY(0)')

    floatCta.style.opacity = '0'
    floatCta.style.transform = hidden()
    floatCta.style.pointerEvents = 'none'

    const overlapsBottomZone = (el: HTMLElement | null, vh: number) => {
      if (!el) return false
      const r = el.getBoundingClientRect()
      const ctaZoneTop = vh * 0.75
      return r.bottom > ctaZoneTop && r.top < vh
    }

    const update = () => {
      if (!heroEl || !registerEl) return
      const heroBottom = heroEl.getBoundingClientRect().bottom
      const regTop = registerEl.getBoundingClientRect().top
      const vh = window.innerHeight
      const altOverlap = overlapsBottomZone(altEl, vh)
      const conclusionOverlap = overlapsBottomZone(conclusionEl, vh)
      const shouldShow =
        heroBottom < 80 && regTop > vh - 120 && !altOverlap && !conclusionOverlap
      if (shouldShow !== lastVisibleRef.current) {
        if (shouldShow) {
          floatCta.style.opacity = '1'
          floatCta.style.transform = shown()
          floatCta.style.pointerEvents = 'auto'
        } else {
          floatCta.style.opacity = '0'
          floatCta.style.transform = hidden()
          floatCta.style.pointerEvents = 'none'
        }
        lastVisibleRef.current = shouldShow
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    document.addEventListener('visibilitychange', update)
    const interval = setInterval(update, 200)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.removeEventListener('visibilitychange', update)
      clearInterval(interval)
    }
  }, [])

  return (
    <div id="floatCta" ref={ref} className="float-cta">
      <a href="#register" data-open-register="" className="btn btn-cta">
        Принять участие бесплатно
        <IconArrow />
      </a>
    </div>
  )
}
