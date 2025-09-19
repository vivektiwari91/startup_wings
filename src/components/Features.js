import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Target, TrendingUp, Shield, Zap, Menu, X } from 'lucide-react';
import './css/features.css'
import AuthModal from './AuthModal';

const Features = () => {
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

  return (
    <div className="features-page">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon"><img 
              src="/path/to/your/logo.png" 
              alt="Company Logo" 
              className="navbar-logo"/></div>
              <span className="logo-text">Startup Bridge</span>
            </div>
            
            <div className="nav-links desktop-nav">
              <a href="/Home">Home</a>
              <a href="/features">Features</a>
              <a href="/about">About</a>
              <a href="/Services">Services</a>
              <a href="/Contact">Contact</a>
              <button className="cta-button" onClick={() => setIsAuthOpen(true)}>
                Get Started
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
              <a href="/features">Features</a>
              <a href="/about">About</a>
              <a href="/Services">Services</a>
              <a href="/Contact">Contact</a>
              <button 
                className="cta-button mobile-cta"
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What You Get</h2>
            <p className="section-subtitle">Everything you need to build smarter</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <CheckCircle className="feature-icon" size={32} />
              <h3 className="feature-title">Idea Validation Checklist</h3>
              <p className="feature-description">Test your concept the smart way.</p>
            </div>

            <div className="feature-card">
              <Target className="feature-icon" size={32} />
              <h3 className="feature-title">Market Research Toolkit</h3>
              <p className="feature-description">Templates to size your market & study competitors.</p>
            </div>

            <div className="feature-card">
              <TrendingUp className="feature-icon" size={32} />
              <h3 className="feature-title">Step-by-Step Roadmap</h3>
              <p className="feature-description">Never ask "what's next?" again.</p>
            </div>

            <div className="feature-card">
              <Users className="feature-icon" size={32} />
              <h3 className="feature-title">Mentor & Grant Access</h3>
              <p className="feature-description">Real people, real opportunities.</p>
            </div>

            <div className="feature-card">
              <Shield className="feature-icon" size={32} />
              <h3 className="feature-title">Community Support</h3>
              <p className="feature-description">Learn, share, and grow with fellow founders.</p>
            </div>

            <div className="feature-card">
              <Zap className="feature-icon" size={32} />
              <h3 className="feature-title">Fast-Track Success</h3>
              <p className="feature-description">Skip months of trial and error.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">🌉</div>
              <span className="logo-text">Startup Bridge</span>
            </div>
            
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/features">Features</a>
              <a href="#blog">Blog</a>
              <a href="/contact">Contact</a>
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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Features;