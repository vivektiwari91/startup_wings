import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Features from './components/Features';
import About from './components/Aboutus';
import Contact from './components/Contact';
import Services from './components/Services';
import UserDashboard from './components/UserDashboard';
import './App.css';

// Create a wrapper component to handle navigation
function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // After successful login, redirect to dashboard
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('startupProfile');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Home routes - now accessible to both logged in and logged out users */}
      <Route 
        path="/" 
        element={<Homepage onLogin={handleLogin} user={user} />} 
      />
      <Route 
        path="/home" 
        element={<Homepage onLogin={handleLogin} user={user} />} 
      />

      {/* Dashboard route - only for logged in users */}
      <Route 
        path="/dashboard" 
        element={
          user ? 
            <UserDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
        } 
      />

      {/* Other nav routes - accessible to all users */}
      <Route 
        path="/features" 
        element={<Features onLogin={handleLogin} user={user} />} 
      />
      <Route 
        path="/about" 
        element={<About onLogin={handleLogin} user={user} />} 
      />
      <Route 
        path="/contact" 
        element={<Contact onLogin={handleLogin} user={user} />} 
      />
      <Route 
        path="/services" 
        element={<Services onLogin={handleLogin} user={user} />} 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;