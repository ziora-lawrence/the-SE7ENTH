import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-section', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5" ref={contentRef}>
        <div className="text-center mb-5 contact-section">
          <p
            style={{
              color: '#9E8B6E',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px',
            }}
          >
            Get in Touch
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#E8DCC8',
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            Contact
          </h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="row g-5">
              {/* Contact Form */}
              <div className="col-md-7 contact-section">
                <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
                    Send a Message
                  </h3>
                  {submitted ? (
                    <div className="text-center py-4">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9E8B6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <p style={{ color: '#E8DCC8', fontSize: '1rem' }}>
                        Thank you for reaching out. We will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control"
                          rows="5"
                          placeholder="Your message"
                          required
                        />
                      </div>
                      <button type="submit" className="btn-primary w-100" style={{ padding: '14px' }}>
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-md-5 contact-section">
                <div className="d-flex flex-column gap-4">
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                      Email
                    </h4>
                    <a href="mailto:hello@se7enth.com" style={{ color: '#E8DCC8', fontSize: '0.95rem', opacity: 0.8 }}>
                      hello@se7enth.com
                    </a>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                      Phone
                    </h4>
                    <a href="tel:+2348000000000" style={{ color: '#E8DCC8', fontSize: '0.95rem', opacity: 0.8 }}>
                      +234 800 000 0000
                    </a>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                      Address
                    </h4>
                    <p style={{ color: '#E8DCC8', fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                      7 Awakening Street<br />
                      Lekki Phase 1<br />
                      Lagos, Nigeria
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                      Follow Us
                    </h4>
                    <div className="d-flex gap-3">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8DCC8', opacity: 0.7, transition: 'opacity 0.3s' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <circle cx="12" cy="12" r="5" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8DCC8', opacity: 0.7, transition: 'opacity 0.3s' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E8DCC8', opacity: 0.7, transition: 'opacity 0.3s' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
