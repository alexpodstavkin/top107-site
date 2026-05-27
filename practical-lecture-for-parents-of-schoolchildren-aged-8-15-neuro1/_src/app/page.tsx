import Hero from './components/Hero'
import Gifts from './components/Gifts'
import WhySummer from './components/WhySummer'
import Prices from './components/Prices'
import Program from './components/Program'
import Research from './components/Research'
import BeforeAfter from './components/BeforeAfter'
import Speaker from './components/Speaker'
import Trust from './components/Trust'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import FloatingCta from './components/FloatingCta'
import RegistrationModal from './components/RegistrationModal'
import UtmCapture from './components/UtmCapture'

export default function Page() {
  return (
    <main id="main">
      <UtmCapture />
      <Hero />
      <Gifts id="gifts-top" variant="compact" />
      <WhySummer />
      <Prices />
      <Program />
      <Research />
      <BeforeAfter />
      <Speaker />
      <Gifts id="gifts" />
      <Trust />
      <FinalCta />
      <Footer />
      <FloatingCta />
      <RegistrationModal />
    </main>
  )
}
