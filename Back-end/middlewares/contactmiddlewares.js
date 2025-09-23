// Contact form validation middleware
const validateContact = (req, res, next) => {
  const { name, email, message, service } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  if (name && name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email is required');
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }
  if (message && message.trim().length > 2000) {
    errors.push('Message cannot exceed 2000 characters');
  }

  // Service validation
  const validServices = [
    // Company Setup & Compliance
    'Business Registration & Incorporation',
    'GST Registration & Returns',
    'PAN/TAN Applications',
    'Trademark Registration',
    'Legal Document Templates',
    'Ongoing Compliance Management',
    
    // Digital Presence & Technology
    'No-Code Website Development',
    'Domain Registration & Hosting',
    'Brand Identity & Logo Design',
    'MVP Prototyping',
    'Social Media Setup',
    'SEO Optimization',
    
    // Marketing & Growth
    'Social Media Strategy & Setup',
    'SEO & Content Strategy',
    'Google Ads & Facebook Ads',
    'Pitch Deck Creation',
    'PR Kit Development',
    'Growth Hacking Strategies',
    
    // Funding & Investor Readiness
    'Pitch Deck Review & Enhancement',
    'Financial Model & Projections',
    'Investor Presentation Training',
    'Mock Investor Sessions',
    'Due Diligence Preparation',
    'Investor Network Introductions',
    
    // Mentorship & Ecosystem Support
    '1:1 Mentorship Sessions',
    'Startup Credits & Tools Access',
    'Founder Community Network',
    'Accelerator Program Guidance',
    'Industry Expert Connections',
    'Ongoing Strategic Support'
  ];

  if (!service || !validServices.includes(service)) {
    errors.push('Please select a valid service');
  }

  // Phone validation (optional field)
  if (req.body.phone && req.body.phone.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = req.body.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Please enter a valid phone number');
    }
  }

  // Referral validation (optional field)
  if (req.body.referral) {
    const validReferrals = ['social', 'friend', 'search', 'other'];
    if (!validReferrals.includes(req.body.referral)) {
      errors.push('Please select a valid referral option');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      messages: errors
    });
  }

  next();
};

module.exports = {
  validateContact
};