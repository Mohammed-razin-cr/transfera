import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Security', href: '/security' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let frameId = null
    const updateScrollState = () => {
      const nextScrolled = window.scrollY > 24
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
      frameId = null
    }
    const handleScroll = () => {
      if (frameId === null) frameId = requestAnimationFrame(updateScrollState)
    }
    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="section-container">
        <div className="section-inner flex h-14 items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Transfera home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114] transition-colors duration-150 group-hover:border-[#3F3F46]">
              <img
                src="/static/logo.png"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[#F4F4F5]">
              Transfera
            </span>
          </Link>

          {/* Center Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/live"
              className="btn-primary !min-h-[36px] !px-4 !py-1.5 text-[13px]"
            >
              <span>Start transfer</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="icon-button h-9 w-9 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile"
            className="relative z-50 border-t border-[#27272A] bg-[#09090B] px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#17171B] text-[#F4F4F5]'
                        : 'text-[#A1A1AA] hover:bg-[#111114] hover:text-[#F4F4F5]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#F00064]" aria-hidden="true" />}
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 border-t border-[#27272A] pt-4">
              <a href="/live" className="btn-primary w-full">
                <span>Start transfer</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
