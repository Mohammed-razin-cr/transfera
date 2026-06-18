import ParticleBackground from './components/ParticleBackground'
import MouseGlow from './components/MouseGlow'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

import SecuritySection from './components/SecuritySection'
import TransferDashboard from './components/TransferDashboard'
import TerminalDemo from './components/TerminalDemo'
import Footer from './components/Footer'
import ReceiverInput from './components/ReceiverInput'

export default function App() {
  return (
    <div className="relative min-h-screen bg-transfera-darker text-[#f5ead7]">
      <ParticleBackground />
      <MouseGlow />
      <Navbar />
      <main>
        <HeroSection />

        <SecuritySection />
        <TransferDashboard />
        <TerminalDemo />
        <ReceiverInput />
      </main>
      <Footer />
    </div>
  )
}
