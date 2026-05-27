import { hero } from '@/lib/content'
import { IconArrow } from './icons'
import EventDatePill from './EventDatePill'

export default function FinalCta() {
  return (
    <section id="register" className="section">
      <div className="container-zc">
        <div className="card card-dark p-6 md:p-10 lg:p-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <EventDatePill />
            </div>

            <h2
              className="mb-5 font-bold"
              style={{
                color: 'var(--n-white)',
                fontSize: 'clamp(1.625rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: 'var(--accent-heliotrope)' }}>{hero.title.accent.replace(/ /g, ' ')}</span>
              {hero.title.rest.replace(/ /g, ' ')}
            </h2>

            <p className="lead mx-auto mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {hero.lead.replace(/ /g, ' ')}
            </p>

            <a
              href="#register"
              data-open-register=""
              className="btn btn-cta"
              style={{ padding: '18px 32px', fontSize: '1.0625rem' }}
            >
              {hero.cta}
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
