const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(v) {
        return !v || /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)]/g, ''));
      },
      message: 'Please enter a valid phone number'
    }
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: [
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
    ]
  },
  referral: {
    type: String,
    enum: ['', 'social', 'friend', 'search', 'other'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'resolved', 'closed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    trim: true,
    default: '',
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  isRead: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ service: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

// Update the updatedAt field before saving
contactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for contact age
contactSchema.virtual('contactAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // days
});

// Method to get service category
contactSchema.methods.getServiceCategory = function() {
  const serviceCategories = {
    'Business Registration & Incorporation': 'Company Setup & Compliance',
    'GST Registration & Returns': 'Company Setup & Compliance',
    'PAN/TAN Applications': 'Company Setup & Compliance',
    'Trademark Registration': 'Company Setup & Compliance',
    'Legal Document Templates': 'Company Setup & Compliance',
    'Ongoing Compliance Management': 'Company Setup & Compliance',
    
    'No-Code Website Development': 'Digital Presence & Technology',
    'Domain Registration & Hosting': 'Digital Presence & Technology',
    'Brand Identity & Logo Design': 'Digital Presence & Technology',
    'MVP Prototyping': 'Digital Presence & Technology',
    'Social Media Setup': 'Digital Presence & Technology',
    'SEO Optimization': 'Digital Presence & Technology',
    
    'Social Media Strategy & Setup': 'Marketing & Growth',
    'SEO & Content Strategy': 'Marketing & Growth',
    'Google Ads & Facebook Ads': 'Marketing & Growth',
    'Pitch Deck Creation': 'Marketing & Growth',
    'PR Kit Development': 'Marketing & Growth',
    'Growth Hacking Strategies': 'Marketing & Growth',
    
    'Pitch Deck Review & Enhancement': 'Funding & Investor Readiness',
    'Financial Model & Projections': 'Funding & Investor Readiness',
    'Investor Presentation Training': 'Funding & Investor Readiness',
    'Mock Investor Sessions': 'Funding & Investor Readiness',
    'Due Diligence Preparation': 'Funding & Investor Readiness',
    'Investor Network Introductions': 'Funding & Investor Readiness',
    
    '1:1 Mentorship Sessions': 'Mentorship & Ecosystem Support',
    'Startup Credits & Tools Access': 'Mentorship & Ecosystem Support',
    'Founder Community Network': 'Mentorship & Ecosystem Support',
    'Accelerator Program Guidance': 'Mentorship & Ecosystem Support',
    'Industry Expert Connections': 'Mentorship & Ecosystem Support',
    'Ongoing Strategic Support': 'Mentorship & Ecosystem Support'
  };
  
  return serviceCategories[this.service] || 'Unknown';
};

module.exports = mongoose.model('Contact', contactSchema);