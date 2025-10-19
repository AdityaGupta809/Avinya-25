import React, { useMemo, useRef, useState } from 'react'
import { Instagram, Twitter, Facebook, Linkedin, Send } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const footerRef = useRef(null)
  const orbOneRef = useRef(null)
  const orbTwoRef = useRef(null)
  const glowStripeRef = useRef(null)

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const animatedItems = gsap.utils.toArray('[data-animate="fade-up"]')
        gsap.set(animatedItems, { opacity: 0, y: 24 })

        gsap.to(animatedItems, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        })

        if (orbOneRef.current && orbTwoRef.current) {
          gsap.fromTo(
            orbOneRef.current,
            { y: 0 },
            {
              y: 80,
              ease: 'none',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          )
          gsap.fromTo(
            orbTwoRef.current,
            { y: 0 },
            {
              y: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          )
        }

        if (glowStripeRef.current) {
          gsap.fromTo(
            glowStripeRef.current,
            { opacity: 0, scaleX: 0.8 },
            {
              opacity: 1,
              scaleX: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 80%',
              },
            }
          )
        }
      }, footerRef)

      return () => ctx.revert()
    },
    { scope: footerRef }
  )

  const socialLinks = [
    { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: Twitter, href: 'https://x.com', label: 'Twitter' },
    { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  function validateEmail(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return pattern.test(value)
  }

  async function handleSubscribe(event) {
    event.preventDefault()
    if (!email) {
      setErrorMessage('Please enter your email')
      return
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }
    setErrorMessage('')
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => setIsSubmitted(false), 2200)
  }

  return (
    <footer
      ref={footerRef}
      className="relative mt-24 bg-[#07070A] border-t border-white/10 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <span id="footer-heading" className="sr-only">Avinya footer</span>

      <div
        ref={orbOneRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl"
      />
      <div
        ref={orbTwoRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/25 via-sky-500/20 to-emerald-400/20 blur-3xl"
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
            <div data-animate="fade-up" className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_40px_-10px] shadow-indigo-500/40" />
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Avinya '<span className="tabular-nums">25</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                IIIT Dharwad’s techno-cultural fest celebrating innovation, arts, and community.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  >
                    <Icon size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            <nav data-animate="fade-up" aria-label="Quick links" className="space-y-6">
              <h3 className="text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Events', href: '#events' },
                  { label: 'Register', href: '#register' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    >
                      <span className="inline-block h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-3" />
                      <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav data-animate="fade-up" aria-label="Resources" className="space-y-6">
              <h3 className="text-white">Resources</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'FAQs', href: '#faqs' },
                  { label: 'Schedule', href: '#schedule' },
                  { label: 'Accommodation', href: '#accommodation' },
                  { label: 'Travel Info', href: '#travel' },
                  { label: 'Sponsors', href: '#sponsors' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    >
                      <span className="inline-block h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-3" />
                      <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-animate="fade-up" className="space-y-6">
              <h3 className="text-white">Subscribe</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Get the latest Avinya updates on registrations, headliners, and releases.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <div className="flex items-stretch gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none ring-0 transition focus:border-white/20 focus:ring-2 focus:ring-indigo-500/40"
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? 'newsletter-error' : undefined}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-indigo-500"
                  >
                    {!isSubmitting && <Send size={18} className="-translate-y-px" />}
                    {isSubmitting && (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" aria-hidden="true" />
                    )}
                    <span className="sr-only">Subscribe</span>
                  </button>
                </div>
                {errorMessage && (
                  <p id="newsletter-error" className="text-xs text-rose-400">{errorMessage}</p>
                )}
                {isSubmitted && !errorMessage && (
                  <p className="text-xs text-emerald-400">Thanks for subscribing! Check your inbox for updates.</p>
                )}
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {['Visa', 'Mastercard', 'UPI', 'PayPal'].map((label) => (
                  <span
                    key={label}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div ref={glowStripeRef} className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col items-center justify-between gap-6 text-xs text-gray-400 md:flex-row md:text-sm">
            <div data-animate="fade-up">
              <p>© {currentYear} Avinya · IIIT Dharwad. All rights reserved.</p>
            </div>
            <div data-animate="fade-up" className="flex items-center gap-6">
              <a href="#privacy" className="transition-colors hover:text-white">Privacy Policy</a>
              <span className="text-gray-700">|</span>
              <a href="#terms" className="transition-colors hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}