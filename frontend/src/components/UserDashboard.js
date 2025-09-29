"use client"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./css/userdashboard.css"
import {
  User,
  Building,
  MapPin,
  Calendar,
  Save,
  Briefcase,
  Rocket,
  Users,
  Globe,
  Target,
  TrendingUp,
  LogOut,
  FileText,
  HelpCircle,
  Home,
  Menu,
  X,
} from "lucide-react"
import img2 from './img/Gemini_Generated_Image_ts0co3ts0co3ts0c.png'

// ✅ Import your full contact form component
import Contact from "./Contact"
import Homepage from "./Homepage"

const UserDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeMenuItem, setActiveMenuItem] = useState('profile')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    founderName: "",
    startupName: "",
    industry: "",
    stage: "",
    location: "",
    description: "",
    website: "",
    foundedYear: "",
    isIncorporated: "",
    teamSize: "",
    competitiveAdvantage: "",
    monthlyRevenue: "",
    customerBase: "",
  })

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem('startupProfile')
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile)
          setProfileData(parsedProfile)
        } catch (error) {
          console.error('Error parsing saved profile:', error)
        }
      } else {
        setProfileData(prev => ({
          ...prev,
          founderName: user.name || user.email.split('@')[0] || "",
        }))
      }
    }
  }, [user])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger-btn')) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()

    const profileWithUser = {
      ...profileData,
      userId: user?.id,
      userEmail: user?.email,
    }

    console.log("Profile saved:", profileWithUser)
    localStorage.setItem('startupProfile', JSON.stringify(profileWithUser))
    alert("Profile saved successfully! You'll receive personalized guidance soon.")
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
      navigate('/')
    }
  }

  const handleHomeNavigation = () => {
    navigate('/')
    setIsSidebarOpen(false)
  }

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem)
    setIsSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderProfileForm = () => (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || 'Founder'}!</h2>
        <h3>Complete Your Startup Profile</h3>
        <p>Help us understand your startup better to provide personalized guidance</p>
      </div>

      <form onSubmit={handleSaveProfile} className="dashboard-form">
        <div className="form-grid">
          {/* Founder Name */}
          <div className="form-group">
            <label><User size={16} className="icon" /> Founder Name</label>
            <input
              type="text"
              name="founderName"
              value={profileData.founderName}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          </div>

          {/* Startup Name */}
          <div className="form-group">
            <label><Building size={16} className="icon" /> Startup Name</label>
            <input
              type="text"
              name="startupName"
              value={profileData.startupName}
              onChange={handleInputChange}
              placeholder="Your startup name"
            />
          </div>

          {/* Industry */}
          <div className="form-group">
            <label><Briefcase size={16} className="icon" /> Industry</label>
            <select name="industry" value={profileData.industry} onChange={handleInputChange}>
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="fintech">Fintech</option>
              <option value="ecommerce">E-commerce</option>
              <option value="education">Education</option>
              <option value="food">Food & Beverage</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Stage */}
          <div className="form-group">
            <label><Rocket size={16} className="icon" /> Current Stage</label>
            <select name="stage" value={profileData.stage} onChange={handleInputChange}>
              <option value="">Select Stage</option>
              <option value="idea">Idea Stage</option>
              <option value="validation">Validation</option>
              <option value="mvp">MVP Development</option>
              <option value="launch">Pre-Launch</option>
              <option value="growth">Growth Stage</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Location</label>
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              placeholder="City, State"
            />
          </div>

          {/* Founded Year */}
          <div className="form-group">
            <label><Calendar size={16} className="icon" /> Founded Year</label>
            <input
              type="number"
              name="foundedYear"
              value={profileData.foundedYear}
              onChange={handleInputChange}
              placeholder="2024"
              min="2000"
              max="2025"
            />
          </div>

          {/* Website */}
          <div className="form-group">
            <label><Globe size={16} className="icon" /> Website</label>
            <input
              type="url"
              name="website"
              value={profileData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Team Size */}
          <div className="form-group">
            <label><Users size={16} className="icon" /> Team Size</label>
            <select name="teamSize" value={profileData.teamSize} onChange={handleInputChange}>
              <option value="">Select Team Size</option>
              <option value="1">Just me (Solo founder)</option>
              <option value="2-5">2-5 members</option>
              <option value="6-10">6-10 members</option>
              <option value="11-25">11-25 members</option>
              <option value="25+">25+ members</option>
            </select>
          </div>

          {/* Monthly Revenue */}
          <div className="form-group">
            <label><TrendingUp size={16} className="icon" /> Monthly Revenue</label>
            <select name="monthlyRevenue" value={profileData.monthlyRevenue} onChange={handleInputChange}>
              <option value="">Select Range</option>
              <option value="pre-revenue">Pre-revenue</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-10k">$1,000 - $10,000</option>
              <option value="10k-50k">$10,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
          </div>
        </div>

        {/* Text Area */}
        <div className="form-group">
          <label><Target size={16} className="icon" /> Startup Description</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleInputChange}
            placeholder="Provide details of your startup..."
            rows={4}
          />
        </div>

        {/* Save Button */}
        <button type="submit" className="save-btn">
          <Save size={20} />
          <span>Save Profile & Get Personalized Guidance</span>
        </button>
      </form>
    </div>
  )

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'profile':
        return (
          <div className="dashboard-card">
            <div className="dashboard-header">
              <h2>Welcome, {user?.name || 'Founder'}!</h2>
              <p>This is your profile dashboard. Use the menu to update your details.</p>
            </div>
          </div>
        )

      case 'Home':
        return <Homepage/>
      case 'contact':
        // ✅ Use your Contact component here
        return <Contact />

      case 'completeProfile':
        return renderProfileForm()

      default:
        return null;
    }
  }

  return (
    <div className="dashboard-wrapper">
      {/* Mobile Hamburger Button */}
      <button 
        className="hamburger-btn" 
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

      <div className="dashboard-layout">
        {/* Left Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
         <div className="sidebar-header">
            <img 
              src={img2} 
              alt="Company Logo" 
              className="sidebar-logo"
            />
            <div className="sidebar-brand">
              <span>StartupWings</span>
            </div>
          </div>

          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeMenuItem === 'profile' ? 'active' : ''}`}
              onClick={() => handleMenuItemClick('profile')}
            >
              <User size={20} />
              <span>Profile</span>
            </button>

            <button
              className="sidebar-item"
              onClick={handleHomeNavigation}
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <button
              className={`sidebar-item ${activeMenuItem === 'contact' ? 'active' : ''}`}
              onClick={() => handleMenuItemClick('contact')}
            >
              <HelpCircle size={20} />
              <span>Contact Form</span>
            </button>

            <button
              className={`sidebar-item ${activeMenuItem === 'completeProfile' ? 'active' : ''}`}
              onClick={() => handleMenuItemClick('completeProfile')}
            >
              <FileText size={20} />
              <span>Complete Profile</span>
            </button>
          </div>

          <div className="sidebar-footer">
            <button className="sidebar-logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <section className="dashboard-section">
            <div className="dashboard-container">
              {renderContent()}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;