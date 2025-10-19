import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Icon = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm6.25-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"/>
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 3h4.6l5 6.7L18.6 3H21l-7.2 8.4L21 21h-4.6l-5.5-7.2L5.4 21H3l7.7-9.1L3 3Z"/>
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-5.8c0-1.37-.03-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.02V23h-4V8Z"/>
    </svg>
  ),
  Send: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m2.01 3.84 19.43 8.16a1 1 0 0 1 0 1.84L2 21.99a1 1 0 0 1-1.29-1.31l2.57-6.3 8.27-1.27-8.23-1.29-2.58-6.3A1 1 0 0 1 2.01 3.84Z"/>
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=80',
        }
      })
      tl.from('.footer-stagger', {
        opacity: 0,
        y: 30,
        stagger: 0.12
      })
    },
    { scope: footerRef }
  )

  const handleIconHover = (element, entering) => {
    gsap.to(element, {
      y: entering ? -3 : 0,
      rotate: entering ? 6 : 0,
      scale: entering ? 1.05 : 1,
      ease: 'power2.out',
      duration: 0.25
    })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setStatus('error')
      gsap.fromTo('#footer-email', { x: -6 }, { x: 0, duration: 0.3, ease: 'elastic.out(1,0.5)' })
      return
    }
    setStatus('sending')

    const btn = document.getElementById('footer-submit')
    const icon = document.getElementById('footer-send-icon')

    const tl = gsap.timeline({ onComplete: () => setTimeout(() => setStatus('success'), 200) })
    tl.to(btn, { scale: 0.98, duration: 0.1 })
      .to(icon, { x: 8, y: -6, rotate: 20, duration: 0.35, ease: 'power3.out' })
      .to(icon, { x: 0, y: 0, rotate: 0, duration: 0.35, ease: 'back.out(1.7)' })
  }

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Avinya festival footer"
      className="relative mt-28 border-t border-white/10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(60,60,255,0.15),transparent_60%)]/50"
    >
      {/* Glow gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_-20px,rgba(99,102,241,0.25),transparent)]"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="footer-stagger">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Avinya <span className="text-violet-400">'25</span></span>
            </div>
            <p className="mt-4 max-w-xs text-pretty text-sm text-gray-300/90">
              The premier techno-cultural fest of IIIT Dharwad bringing together innovation and tradition.
            </p>

            <div className="mt-6 flex items-center gap-4" aria-label="Social links">
              {[
                { name: 'Instagram', href: '#', Icon: Icon.Instagram },
                { name: 'X', href: '#', Icon: Icon.X },
                { name: 'LinkedIn', href: '#', Icon: Icon.Linkedin }
              ].map(({ name, href, Icon: Svg }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                  onMouseEnter={(e) => handleIconHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleIconHover(e.currentTarget, false)}
                >
                  <Svg className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="footer-stagger" aria-label="Quick links">
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-3 text-gray-300">
              {[
                { label: 'Home', href: '#top' },
                { label: 'Events', href: '#events' },
                { label: 'Register', href: '#contact' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                  >
                    <span className="h-px w-4 bg-gray-600/60 transition-all group-hover:w-6 group-hover:bg-violet-400"></span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav className="footer-stagger" aria-label="Resources">
            <p className="text-sm font-semibold text-white">Resources</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: 'FAQs', href: '#faqs' },
                { label: 'Schedule', href: '#events' },
                { label: 'Accommodation', href: '#contact' },
                { label: 'Travel Info', href: '#contact' },
                { label: 'Sponsors', href: '#sponsors' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                  >
                    <span className="h-px w-4 bg-gray-600/60 transition-all group-hover:w-6 group-hover:bg-violet-400"></span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Subscribe */}
          <div className="footer-stagger">
            <p className="text-sm font-semibold text-white">Subscribe</p>
            <p className="mt-4 text-sm text-gray-300/90">
              Stay updated with the latest news and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2" noValidate>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                placeholder="Your email"
                className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-inset ring-white/10 transition focus:ring-violet-400/60"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'footer-email-error' : undefined}
              />
              <button
                id="footer-submit"
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:opacity-60"
                aria-live="polite"
                disabled={status === 'sending'}
              >
                <span className="sr-only">Subscribe</span>
                <Icon.Send id="footer-send-icon" className="h-4 w-4" />
              </button>
            </form>
            {status === 'error' && (
              <p id="footer-email-error" className="mt-2 text-xs text-red-400">Please enter a valid email address.</p>
            )}
            {status === 'success' && (
              <p className="mt-2 text-xs text-emerald-400">Thanks! You are on the list.</p>
            )}
          </div>
        </div>

        <div className="footer-stagger mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p className="order-2 md:order-1">&copy; {currentYear} Avinya · IIIT Dharwad. All rights reserved.</p>
            <div className="order-1 flex items-center gap-6 md:order-2">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span aria-hidden className="text-gray-600">|</span>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}