import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, User } from 'lucide-react';
import './css/services.css';
import AuthModal from './AuthModal';

const services = [
  {
    id: "1",
    emoji: "🏛",
    title: "Company Setup & Compliance",
    short:
      "Business registration, GST/PAN/trademark, legal templates, ongoing compliance.",
    detailed:
      "Complete business setup from incorporation to compliance. We handle all legal paperwork, registrations, and ongoing regulatory requirements so you can focus on building your business.",
    features: [
      "Business Registration & Incorporation",
      "GST Registration & Returns",
      "Trademark Registration",
      "Startup Registration",
    ],
  },
  {
    id: "2",
    emoji: "🌐",
    title: "Digital Presence & Technology",
    short:
      "No-code websites, domain & hosting, branding, MVP prototyping with no/low-code.",
    detailed:
      "Build your digital presence with modern no-code solutions. From professional websites to MVP development, we help you establish a strong online foundation.",
    features: [
      "Web Development",
      "Brand Identity & Logo Design",
      "MVP Prototyping",
      "Social Media Setup",
      "SEO Optimization",
    ],
  },
  {
    id: "3",
    emoji: "📢",
    title: "Marketing & Growth",
    short:
      "Social media starter, SEO & ads strategy, pitch decks and PR kit for founders.",
    detailed:
      "Accelerate your growth with strategic marketing solutions. From social media presence to investor-ready pitch decks, we help you tell your story effectively.",
    features: [
      "Social Media Strategy & Setup",
      "SEO & Content Strategy",
      "Google Ads & Facebook Ads",
      "Pitch Deck Creation",
      "Growth Hacking Strategies",
    ],
  },
  {
    id: "4",
    emoji: "💸",
    title: "Funding & Investor Readiness",
    short:
      "Pitch deck review, financial projections, mock investor sessions, introductions.",
    detailed:
      "Get investment-ready with comprehensive funding support. From pitch refinement to investor connections, we guide you through the entire fundraising process.",
    features: [
      "Pitch Deck Review & Enhancement",
      "Financial Model & Projections",
      "Investor Presentation Training",
      "Mock Investor Sessions",
      "Due Diligence Preparation",
      "Investor Network Introductions",
    ],
  },
  {
    id: "5",
    emoji: "🎓",
    title: "Mentorship & Ecosystem Support",
    short:
      "1:1 mentorship, startup credits/tools, founder community & accelerator guidance.",
    detailed:
      "Access expert mentorship and startup ecosystem benefits. Join our founder community and get guidance from experienced entrepreneurs and industry experts.",
    features: [
      "1:1 Mentorship Sessions",
      "Startup Credits & Tools Access",
      "Founder Community Network",
      "Accelerator Program Guidance",
      "Industry Expert Connections",
      "Ongoing Strategic Support",
    ],
  },
];

export default function Services({ onLogin }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="services-page">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <span>SB</span>
              </div>
              <span className="logo-text">Startup Wings</span>
            </div>
            
            <div className="nav-links desktop-nav">
              <a href="/">Home</a>
              <a href="/features">Features</a>
              <a href="/about">About</a>
              <a href="/Services" className="active">Services</a>
              <button className="cta-button" onClick={() => setIsAuthOpen(true)}>
                <User className="icon" />
              </button>
            </div>

            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="/features" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="/Services" className="active" onClick={() => setIsMenuOpen(false)}>Services</a>
              <button 
                className="cta-button mobile-cta"
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <User className="icon" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Services Hero Banner */}
      <div className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>
            End-to-end support for founders — from company setup to growth,
            funding, and mentorship.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleCardClick(service)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="service-emoji">{service.emoji}</div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <div className="explore-btn">
                Explore Service
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
              <div className="modal-title">
                <span className="modal-emoji">{selectedService.emoji}</span>
                <h2>{selectedService.title}</h2>
              </div>
              <p>{selectedService.detailed}</p>
            </div>

            <div className="modal-body">
              <div className="modal-features">
                <h3>What's Included</h3>
                <ul>
                  {selectedService.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <a href="/contact" className="btn-small">
                  Contact Us
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">
                <span>SB</span>
              </div>
              <span className="logo-text">Startup Bridge</span>
            </div>
            
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/features">Features</a>
              <a href="/Services">Services</a>
              <a href="/Contact">Contact</a>
            </div>
            
            <div className="social-icons">
              <div className="social-icon">in</div>
              <div className="social-icon">YT</div>
              <div className="social-icon">X</div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-tagline">Startup Bridge – Skip the Guesswork, Build Smarter.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={onLogin}
      />
    </div>
  );
}