import { useState, useEffect } from 'react'
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

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'obsidian')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="relative min-h-screen bg-transfera-darker text-[#f5ead7]">
      <ParticleBackground theme={theme} />
      <MouseGlow />
      <Navbar theme={theme} setTheme={setTheme} />
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
  )
}
