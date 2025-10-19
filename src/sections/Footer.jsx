import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { 
  Send, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  ArrowUp,
  Heart
} from 'lucide-react';

// ScrollTrigger will be imported dynamically if needed

export default function Footer() {
  const footerRef = useRef(null);
  const backgroundRef = useRef(null);
  const particlesRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // const footer = footerRef.current;
    const background = backgroundRef.current;
    const particles = particlesRef.current;

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particles.appendChild(particle);

        gsap.to(particle, {
          y: -50,
          x: Math.random() * 100 - 50,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      }
    };

    createParticles();

    // Animated background gradient
    gsap.to(background, {
      backgroundPosition: "200% center",
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Scroll to top visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      gsap.to('.subscribe-success', {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power3.inOut"
    });
  };

  const socialLinks = [
    { Icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { Icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { Icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { Icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#', icon: Users },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Register', href: '#register', icon: Trophy },
    { name: 'About', href: '#about', icon: Sparkles },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const eventStats = [
    { label: 'Events', value: '50+', icon: Calendar },
    { label: 'Participants', value: '5000+', icon: Users },
    { label: 'Prizes', value: '₹10L+', icon: Trophy },
    { label: 'Days', value: '3', icon: Sparkles },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-black border-t border-gray-800/50">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 opacity-50"
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: "0% center"
        }}
      />
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {eventStats.map(({ label, value, icon: IconComponent }) => (
            <motion.div
              key={label}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative mb-4">
                <IconComponent className="w-8 h-8 mx-auto text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 font-mono">{value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div data-animate className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6 italic font-serif tracking-wider">
                Avinya '25
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Where innovation meets tradition. Join us for the most spectacular techno-cultural fest that celebrates the fusion of technology and culture.
              </p>
              <div className="flex gap-4 mb-8">
                {socialLinks.map(({ Icon: IconComponent, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`text-gray-400 ${color} transition-all duration-300 p-2 rounded-full border border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-purple-500/25`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={18} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with love by IIIT Dharwad</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div data-animate>
            <h3 className="text-white font-semibold mb-8 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map(({ name, href, icon: IconComponent }) => (
                <motion.li key={name} whileHover={{ x: 5 }}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm group flex items-center gap-3"
                  >
                    <IconComponent className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                    <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                      {name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-animate>
            <h3 className="text-white font-semibold mb-8 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm leading-relaxed">
                  <div className="text-white font-medium mb-1">IIIT Dharwad Campus</div>
                  <div>WALMI Campus, PB Road</div>
                  <div>Dharwad - 580009, Karnataka</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="mailto:contact@avinya.iiitdwd.ac.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                  contact@avinya.iiitdwd.ac.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div data-animate>
            <h3 className="text-white font-semibold mb-8 text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" />
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get the latest updates about events, registrations, and announcements directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
              {submitted && (
                <motion.div 
                  className="subscribe-success text-green-400 text-xs font-medium flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Thanks for subscribing! We'll keep you updated.
                </motion.div>
              )}
            </form>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="text-gray-500 text-xs mb-3">Trusted by students nationwide</div>
              <div className="flex gap-2 flex-wrap">
                {['🔒 Secure', '📧 No Spam', '🎯 Relevant'].map((badge) => (
                  <span key={badge} className="px-2 py-1 rounded bg-gray-900/50 border border-gray-800 text-gray-400 text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider with Animation */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">
          <motion.div 
            data-animate
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span>© {currentYear} Avinya - IIIT Dharwad.</span>
            <span className="text-purple-400">All rights reserved.</span>
          </motion.div>
          <div data-animate className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Terms of Service
            </a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </footer>
  );
}