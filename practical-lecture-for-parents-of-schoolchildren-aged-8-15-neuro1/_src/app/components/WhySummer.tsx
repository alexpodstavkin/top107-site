import { summerReasons } from '@/lib/content'
import { IconClock, IconRocket, IconTarget, IconShieldGuard } from './icons'

const iconMap = {
  clock: IconClock,
  rocket: IconRocket,
  target: IconTarget,
  shield: IconShieldGuard,
}

export default function WhySummer() {
  return (
    <section className="section section-tinted">
      <div className="container-zc">
        <div className="max-w-3xl mb-8 md:mb-10">
          <h2 className="h2">
            {summerReasons.title.pre.replace(/ /g, ' ')}
            <span className="accent">{summerReasons.title.accent.replace(/ /g, ' ')}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {summerReasons.items.map((r, i) => {
            const Icon = iconMap[r.icon as keyof typeof iconMap]
            return (
              <div key={i} className="reason-card">
                <div className="reason-icon" aria-hidden>
                  <Icon />
                </div>
                <h3 className="reason-title">{r.title.replace(/ /g, ' ')}</h3>
                <p className="reason-text">{r.text.replace(/ /g, ' ')}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
