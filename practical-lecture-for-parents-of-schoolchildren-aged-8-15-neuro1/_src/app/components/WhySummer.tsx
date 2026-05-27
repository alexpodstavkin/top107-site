import { summerReasons } from '@/lib/content'
import { IconClock, IconRocket, IconTarget, IconArrow } from './icons'

const iconMap = {
  clock: IconClock,
  rocket: IconRocket,
  target: IconTarget,
}

export default function WhySummer() {
  return (
    <section className="section section-tinted">
      <div className="container-zc">
        <div className="max-w-3xl mb-8 md:mb-10">
          <h2 className="h2">
            <span className="accent">{summerReasons.title.accent.replace(/ /g, ' ')}</span>
            {summerReasons.title.rest.replace(/ /g, ' ')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {summerReasons.items.map((r, i) => {
            const Icon = iconMap[r.icon as keyof typeof iconMap]
            return (
              <div key={i} className="reason-card">
                <div className="reason-card-head">
                  <div className="reason-icon" aria-hidden>
                    <Icon />
                  </div>
                  <div className="reason-stat">
                    <span className="reason-stat-value">{r.stat.replace(/ /g, ' ')}</span>
                    <span className="reason-stat-label">{r.statLabel.replace(/ /g, ' ')}</span>
                  </div>
                </div>
                <p className="reason-text">{r.text.replace(/ /g, ' ')}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 md:mt-8 reason-cta">
          <div className="reason-cta-inner">
            <p className="reason-cta-text">
              {summerReasons.ctaLines.map((line, i) => (
                <span key={i} className="reason-cta-line">{line.replace(/ /g, ' ')}</span>
              ))}
            </p>
            <a href="#register" data-open-register="" className="btn btn-cta reason-cta-btn">
              {summerReasons.ctaLabel}
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
