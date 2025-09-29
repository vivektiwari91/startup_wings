import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, User } from 'lucide-react';
import './css/about.css';
import AuthModal from './AuthModal';

const About = ({ onLogin }) => {
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
              <span className="logo-text">Startup wings</span>
            </div>
            
            <div className="nav-links desktop-nav">
              <a href="/Home">Home</a>
              <a href="/features">Features</a>
              <a href="/about">About</a>
              <a href="/Services">Services</a>
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
              <a href="/features">Features</a>
              <a href="/about">About</a>
              <a href="/Services">Services</a>
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

      {/* About Us Section */}
      <section id="about" className="about-preview">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
          At Startup Bridge, we believe that every great idea deserves the right launchpad. Too many founders waste time, money, and energy on trial-and-error. That's why we built a guided platform that takes the guesswork out of building a startup.

          We help early-stage entrepreneurs validate ideas, research markets, register legally, build online presence, design marketing strategies, and connect with grants, mentors, and investors—all in one place.

          Our mission is simple: make starting up smarter, faster, and more affordable. With Startup Bridge, you don't just launch a business—you launch with confidence.

          </p>
          
          {/* Extended About Content */}
          <div className="about-extended">
            <h3 className="subsection-title">Our Story</h3>
            <p className="about-description">
            Founded by entrepreneurs who've been through the startup journey themselves, Startup Bridge was born from frustration with the scattered, confusing advice available to first-time founders.
             We've distilled years of experience, countless mistakes, and hard-won insights into a clear, actionable platform.

            </p>
            
            <h3 className="subsection-title">Why We Exist</h3>
            <p className="about-description">
             Step-by-step guidance from idea to launch

              Access to resources, mentors, and funding opportunities

              Smart tools to validate and grow your startup

              A supportive ecosystem that saves time and reduces risk

              Whether you're at the idea stage or preparing to scale, Startup Bridge is your trusted partner on the journey from vision to reality.

            </p>
            
            <h3 className="subsection-title">Our Vision</h3>
            <p className="about-description">
            To become the most trusted launchpad for early-stage entrepreneurs—empowering them to transform ideas into successful, scalable businesses through guidance, resources, and connections.

            We envision a world where every founder, regardless of background, has equal access to knowledge, mentorship, and opportunities to build startups that create impact and drive innovation.

            </p>
          </div>
            <h3 className="subsection-title">Our Mision</h3>
            <p className="about-description">
              At Startup Bridge, we empower founders to launch smarter, faster, and more affordably.
              By providing step-by-step guidance, resources, and connections, we help entrepreneurs transform ideas into successful businesses with confidence.
              </p>

          
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={onLogin}
      />
    </div>
  );
};

export default About;