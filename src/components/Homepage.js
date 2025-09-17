import React, { useState, useEffect, useRef } from 'react';
import { Star, Menu, X, ArrowRight, Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import img1 from './img/start-up-business-goals-strategy.jpg';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [problemSolutionVisible, setProblemSolutionVisible] = useState(false);
  
  const problemSolutionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for problem-solution section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setProblemSolutionVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (problemSolutionRef.current) {
      observer.observe(problemSolutionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <span>SB</span>
              </div>
              <span className="logo-text">Startup Bridge</span>
            </div>
            
            <div className="nav-links desktop-nav">
              <a href="/">Home</a>
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
              <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="/features" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="/Services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="/ContactUs" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
              <button className="cta-button mobile-cta">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Skip the <span className="gradient-text">Guesswork.</span>
                <br />
                Build Your Startup <span className="gradient-text">Smarter.</span>
              </h1>
              <p className="hero-subtitle">
                The guided platform that helps founders validate ideas, research markets, and launch with confidence.
              </p>
              <button className="hero-cta">
                Start Validating Your Idea
                <ArrowRight className="arrow-icon" size={20} />
              </button>
            </div>
            
            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="hero-image-card">
                  <img 
                    src={img1}
                    alt="Professional startup team collaboration"
                    className="hero-image"
                  />
                  
                  {/* Floating Metric Cards */}
                  <div className="floating-element element-1">
                    <div className="metric-card">
                      <TrendingUp className="metric-icon" size={24} />
                      <div className="metric-info">
                        <span className="metric-number">95%</span>
                        <span className="metric-label">Success Rate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="floating-element element-2">
                    <div className="metric-card">
                      <Users className="metric-icon" size={24} />
                      <div className="metric-info">
                        <span className="metric-number">500+</span>
                        <span className="metric-label">Startups Launched</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section 
        ref={problemSolutionRef}
        className="problem-solution"
      >
        <div className="container">
          <div className="problem-solution-grid">
            <div className={`problem-card ${problemSolutionVisible ? 'scroll-animate-in' : ''}`}>
              <h3 className="card-title problem-title">
                <Target className="card-icon" size={28} />
                Founder Pain Points
              </h3>
              <div className="pain-points">
                <div className="pain-point">
                  <div className="bullet"></div>
                  <span>"Is my idea viable?"</span>
                </div>
                <div className="pain-point">
                  <div className="bullet"></div>
                  <span>"Where do I start?"</span>
                </div>
                <div className="pain-point">
                  <div className="bullet"></div>
                  <span>"How do I avoid costly mistakes?"</span>
                </div>
              </div>
            </div>

            <div className={`solution-card ${problemSolutionVisible ? 'scroll-animate-in' : ''}`}>
              <h3 className="card-title solution-title">
                <Lightbulb className="card-icon" size={28} />
                Our Solution
              </h3>
              <p className="solution-text">
                At Startup Bridge, we simplify the messy early-stage journey. From idea validation to launch roadmap — we give you <span className="highlight">tools, templates, mentors, and step-by-step guidance.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">3 Simple Steps to Success</p>
          </div>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number step-1">1</div>
              <h3 className="step-title">Validate Your Idea</h3>
              <p className="step-description">Use our checklist & toolkit to prove your idea solves a real problem.</p>
            </div>

            <div className="step">
              <div className="step-number step-2">2</div>
              <h3 className="step-title">Research & Plan</h3>
              <p className="step-description">Map your market, study competitors, and find your edge.</p>
            </div>

            <div className="step">
              <div className="step-number step-3">3</div>
              <h3 className="step-title">Launch with Confidence</h3>
              <p className="step-description">Follow our roadmap, connect to mentors, and access grants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2 className="section-title">Built for Early-Stage Founders Across India</h2>
          
          <div className="testimonials">
            <div className="testimonial">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star filled" size={20} />
                ))}
              </div>
              <p className="testimonial-text">"Startup Bridge saved me months of confusion. The validation toolkit is incredible!"</p>
              <div className="testimonial-author">- Priya S., Mumbai</div>
            </div>

            <div className="testimonial">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star filled" size={20} />
                ))}
              </div>
              <p className="testimonial-text">"Finally, a clear roadmap from idea to launch. Game changer for first-time founders."</p>
              <div className="testimonial-author">- Raj K., Bangalore</div>
            </div>

            <div className="testimonial">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star filled" size={20} />
                ))}
              </div>
              <p className="testimonial-text">"The mentor access and community support are worth their weight in gold."</p>
              <div className="testimonial-author">- Anita M., Delhi</div>
            </div>
          </div>
        </div>
      </section>

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
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
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

export default Homepage;