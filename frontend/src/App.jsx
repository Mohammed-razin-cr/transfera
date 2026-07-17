import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
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

// Pages
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import SecurityPage from './pages/SecurityPage'
import FAQPage from './pages/FAQPage'

const ThemeContext = createContext()
export function useTheme() { return useContext(ThemeContext) }

function HomePage() {
  return (
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
  )
}

export default function App() {
  return (
    <ThemeContext.Provider value={{ theme: 'luro' }}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ThemeContext.Provider>
  )
}
