import { createContext, useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import SecuritySection from './components/SecuritySection'
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

const pageTitles = {
  '/': 'Secure File Transfer Between Devices | Transfera',
  '/features': 'Secure File Transfer Features | Transfera',
  '/how-it-works': 'How Transfera Works | Secure Browser Transfers',
  '/security': 'Transfera Security | End-to-End Encrypted Transfers',
  '/faq': 'Transfera FAQ | Secure File Transfer Help',
}

function RouteUX() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.title = pageTitles[pathname] || 'Transfera'
  }, [pathname])

  return <a href="#main-content" className="skip-link">Skip to main content</a>
}

function HomePage() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
      <ParticleBackground />
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <HeroSection />
        <ReceiverInput />
        <FeaturesSection />
        <SecuritySection />
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
          <RouteUX />
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
