import { createContext, useContext } from 'react'
import ParticleBackground from './components/ParticleBackground'
import MouseGlow from './components/MouseGlow'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import SecuritySection from './components/SecuritySection'
import TransferDashboard from './components/TransferDashboard'
import TerminalDemo from './components/TerminalDemo'
import Footer from './components/Footer'
import ReceiverInput from './components/ReceiverInput'
import SEOContent from './components/SEOContent'

const ThemeContext = createContext()
export function useTheme() { return useContext(ThemeContext) }

export default function App() {
  return (
    <ThemeContext.Provider value={{ theme: 'luro' }}>
      <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
        <ParticleBackground />
        <MouseGlow />
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <SecuritySection />
          <TransferDashboard />
          <TerminalDemo />
          <ReceiverInput />
          <SEOContent />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}
