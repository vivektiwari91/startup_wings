import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import './css/about.css';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
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
              <button className="cta-button">Get Started</button>
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
              <button className="cta-button mobile-cta">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* About Us Section */}
      <section id="about" className="about-preview">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
            At Startup Bridge, we believe every founder deserves clarity, not chaos. Our mission is to help entrepreneurs turn ideas into investor-ready, market-ready startups — faster, smarter, and with fewer mistakes.
          </p>
          
          {/* Extended About Content */}
          <div className="about-extended">
            <h3 className="subsection-title">Our Story</h3>
            <p className="about-description">
              Founded by entrepreneurs who've been through the startup journey themselves, Startup Bridge was born from frustration with the scattered, confusing advice available to first-time founders. We've distilled years of experience, countless mistakes, and hard-won insights into a clear, actionable platform.
            </p>
            
            <h3 className="subsection-title">Why We Exist</h3>
            <p className="about-description">
              Too many great ideas die in the "valley of confusion" between concept and launch. We bridge that gap with structured guidance, proven frameworks, and a community of like-minded founders who support each other's success.
            </p>
            
            <h3 className="subsection-title">Our Promise</h3>
            <p className="about-description">
              No fluff, no generic advice, no overwhelming information dumps. Just clear, step-by-step guidance that gets you from where you are to where you want to be. Your success is our success.
            </p>
          </div>
          
          <button className="link-button">
            Connect with our founding team
            <ChevronRight className="chevron-icon" size={16} />
          </button>
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
    </div>
  );
};

export default About;