import { hero } from '@/lib/content'
import { IconArrow } from './icons'
import { asset } from '@/lib/asset'
import EventDatePill from './EventDatePill'

export default function Hero() {
  return (
    <section id="top" className="section section-dark">
      <div className="container-zc">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <EventDatePill />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {hero.badges.map((b) => (
                <span key={b} className="pill">{b}</span>
              ))}
            </div>

            <h1 className="h1 mb-5">
              <span style={{ color: 'var(--accent-heliotrope)' }}>{hero.title.accent.replace(/ /g, ' ')}</span>
              {hero.title.rest.replace(/ /g, ' ')}
            </h1>

            <p className="lead max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {hero.lead.replace(/ /g, ' ')}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#register" data-open-register="" className="btn btn-cta">
                {hero.cta}
                <IconArrow />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex">
            <div
              className="hero-photo aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:flex-1 lg:h-full lg:min-h-[420px] rounded-2xl relative overflow-hidden mx-auto lg:mx-0 w-full"
              style={{ maxWidth: '34rem' }}
            >
              <img
                src={asset('/kids-hero.jpg')}
                alt="Ученики за уроком"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
