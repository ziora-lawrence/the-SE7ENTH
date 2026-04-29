import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
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

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5" ref={contentRef}>
        <div className="text-center mb-5 about-section">
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
            Who We Are
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#E8DCC8',
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            About Se7enth
          </h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="about-section mb-5 text-center">
              <img
                src="/se7enth-logo.png"
                alt="Se7enth Clothing"
                style={{ maxWidth: '180px', marginBottom: '32px', mixBlendMode: 'screen' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  document.getElementById('about-logo-fallback').style.display = 'block';
                }}
              />
              <div id="about-logo-fallback" style={{ display: 'none', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    border: '2px solid #9E8B6E',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: '#9E8B6E' }}>7</span>
                </div>
              </div>
            </div>

            <div className="about-section mb-5">
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#E8DCC8',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '20px',
                }}
              >
                Our Story
              </h2>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '16px' }}>
                Se7enth Clothing was born from a simple belief: that what you wear should reflect more than just taste — it should reflect perception. Founded in Lagos, Nigeria, we set out to create a brand that speaks to those who see beyond the surface.
              </p>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8 }}>
                Our journey began with a single hoodie and a vision to redefine streetwear in Africa. Today, we continue to craft each piece with intention, blending premium materials with designs that carry deeper meaning.
              </p>
            </div>

            <div className="about-section mb-5">
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#E8DCC8',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '20px',
                }}
              >
                The Significance of Seven
              </h2>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '16px' }}>
                The number seven holds profound meaning across cultures and traditions. It represents completeness, spiritual perfection, and divine awakening. In nature, there are seven colors in the rainbow, seven notes in the musical scale, and seven continents on our planet.
              </p>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '16px' }}>
                We chose Se7enth because we design for the seventh sense — that intuitive knowing that goes beyond sight, sound, touch, taste, smell, and even the sixth sense of perception. The seventh sense is awareness itself. It is the ability to recognize meaning in the mundane, to find beauty in the overlooked, to understand without being told.
              </p>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8 }}>
                When you wear Se7enth, you are not just wearing clothes. You are wearing awareness. You are making a statement that you see more, feel deeper, and understand better.
              </p>
            </div>

            <div className="about-section mb-5">
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#E8DCC8',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '20px',
                }}
              >
                Our Mission
              </h2>
              <p style={{ color: '#E8DCC8', fontSize: '1rem', lineHeight: 1.8, opacity: 0.8 }}>
                To create premium streetwear that empowers individuals to express their inner perception. We are committed to quality craftsmanship, ethical production, and building a community of the awakened — those who refuse to sleepwalk through life.
              </p>
            </div>

            <div className="about-section">
              <div className="row g-4 text-center">
                <div className="col-md-4">
                  <div style={{ border: '1px solid #2A2A2A', padding: '32px 24px' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#9E8B6E', marginBottom: '8px' }}>7</h3>
                    <p style={{ color: '#E8DCC8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                      Senses Awakened
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{ border: '1px solid #2A2A2A', padding: '32px 24px' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#9E8B6E', marginBottom: '8px' }}>100%</h3>
                    <p style={{ color: '#E8DCC8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                      Premium Quality
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{ border: '1px solid #2A2A2A', padding: '32px 24px' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#9E8B6E', marginBottom: '8px' }}>∞</h3>
                    <p style={{ color: '#E8DCC8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                      Infinite Vision
                    </p>
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
