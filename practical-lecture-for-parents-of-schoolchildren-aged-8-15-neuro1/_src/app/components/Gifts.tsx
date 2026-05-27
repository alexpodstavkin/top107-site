import { gifts, giftsTitle } from '@/lib/content'
import { IconDoc, IconList, IconChat } from './icons'

const iconMap = {
  doc: IconDoc,
  list: IconList,
  chat: IconChat,
}

export default function Gifts({ id, variant = 'full' }: { id: string; variant?: 'full' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <section id={id} aria-label="Подарки участникам" className="section-tinted">
        <div className="container-zc" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <div className="gifts-strip">
            <span className="gifts-strip-label">3 подарка участникам:</span>
            <ul className="gifts-strip-list">
              {gifts.map((g, i) => {
                const Icon = iconMap[g.icon as keyof typeof iconMap]
                return (
                  <li key={i} className="gifts-strip-item">
                    <span className="gifts-strip-icon" aria-hidden>
                      <Icon size={16} />
                    </span>
                    <span className="gifts-strip-text">{g.title.replace(/ /g, ' ')}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="section section-tinted">
      <div className="container-zc">
        <div className="max-w-3xl mb-8 md:mb-10">
          <h2 className="h2 mt-4">
            {giftsTitle.pre}<span className="accent">{giftsTitle.accent.replace(/ /g, ' ')}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {gifts.map((g, i) => {
            const Icon = iconMap[g.icon as keyof typeof iconMap]
            return (
              <div key={i} className={'card ' + (g.accent ? 'card-accent' : '')}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: g.accent ? 'rgba(255,255,255,0.18)' : 'rgba(155,81,224,0.10)' }}
                >
                  <Icon />
                </div>
                <div
                  className="caption mb-2"
                  style={g.accent ? { color: 'rgba(255,255,255,0.85)' } : undefined}
                >
                  {g.label}
                </div>
                <h3 className="h3">{g.title.replace(/ /g, ' ')}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
