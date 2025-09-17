import React, { useState } from "react";
import "./css/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    referral: "",
    service: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Thanks ${formData.name}, we'll get back to you soon!`);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      referral: "",
      service: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <header className="contact-header">
          <h1>
            Get in <span className="highlight-text">Touch</span>
          </h1>
          <p>
            Have questions? We'd love to hear from you. Drop us a message and
            we'll get back to you soon.
          </p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 1234567890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="form-group mb-20">
            <label>Select Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>

              <optgroup label="Company Setup & Compliance">
                <option value="Business Registration & Incorporation">
                  Business Registration & Incorporation
                </option>
                <option value="GST Registration & Returns">
                  GST Registration & Returns
                </option>
                <option value="PAN/TAN Applications">PAN/TAN Applications</option>
                <option value="Trademark Registration">Trademark Registration</option>
                <option value="Legal Document Templates">Legal Document Templates</option>
                <option value="Ongoing Compliance Management">
                  Ongoing Compliance Management
                </option>
              </optgroup>

              <optgroup label="Digital Presence & Technology">
                <option value="No-Code Website Development">
                  No-Code Website Development
                </option>
                <option value="Domain Registration & Hosting">
                  Domain Registration & Hosting
                </option>
                <option value="Brand Identity & Logo Design">
                  Brand Identity & Logo Design
                </option>
                <option value="MVP Prototyping">MVP Prototyping</option>
                <option value="Social Media Setup">Social Media Setup</option>
                <option value="SEO Optimization">SEO Optimization</option>
              </optgroup>

              <optgroup label="Marketing & Growth">
                <option value="Social Media Strategy & Setup">
                  Social Media Strategy & Setup
                </option>
                <option value="SEO & Content Strategy">SEO & Content Strategy</option>
                <option value="Google Ads & Facebook Ads">
                  Google Ads & Facebook Ads
                </option>
                <option value="Pitch Deck Creation">Pitch Deck Creation</option>
                <option value="PR Kit Development">PR Kit Development</option>
                <option value="Growth Hacking Strategies">
                  Growth Hacking Strategies
                </option>
              </optgroup>

              <optgroup label="Funding & Investor Readiness">
                <option value="Pitch Deck Review & Enhancement">
                  Pitch Deck Review & Enhancement
                </option>
                <option value="Financial Model & Projections">
                  Financial Model & Projections
                </option>
                <option value="Investor Presentation Training">
                  Investor Presentation Training
                </option>
                <option value="Mock Investor Sessions">Mock Investor Sessions</option>
                <option value="Due Diligence Preparation">
                  Due Diligence Preparation
                </option>
                <option value="Investor Network Introductions">
                  Investor Network Introductions
                </option>
              </optgroup>

              <optgroup label="Mentorship & Ecosystem Support">
                <option value="1:1 Mentorship Sessions">
                  1:1 Mentorship Sessions
                </option>
                <option value="Startup Credits & Tools Access">
                  Startup Credits & Tools Access
                </option>
                <option value="Founder Community Network">
                  Founder Community Network
                </option>
                <option value="Accelerator Program Guidance">
                  Accelerator Program Guidance
                </option>
                <option value="Industry Expert Connections">
                  Industry Expert Connections
                </option>
                <option value="Ongoing Strategic Support">
                  Ongoing Strategic Support
                </option>
              </optgroup>
            </select>
          </div>

          <div className="form-group mb-20">
            <label>How did you hear about us?</label>
            <select
              name="referral"
              value={formData.referral}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend / Colleague</option>
              <option value="search">Search Engine</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              placeholder="Tell us more about your project or question..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
