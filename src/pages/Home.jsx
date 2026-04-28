import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredIds = [1, 2, 4];
const featuredProducts = products.filter(p => featuredIds.includes(p.id));

export default function Home() {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroBgRef = useRef(null);
  const featuredRef = useRef(null);
  const storyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Hero text entrance
      gsap.from(heroTextRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Featured section
      gsap.from('.featured-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.product-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Story section
      gsap.from('.story-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={heroBgRef}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0A0A0A 70%)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://placehold.co/1920x1080/0A0A0A/2A2A2A?text=) center/cover no-repeat',
            opacity: 0.3,
            zIndex: 1,
          }}
        />
        <div
          ref={heroTextRef}
          className="text-center"
          style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}
        >
          <p
            style={{
              color: '#9E8B6E',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              marginBottom: '20px',
            }}
          >
            Premium Streetwear
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 800,
              color: '#E8DCC8',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            Wear Your
            <br />
            Seventh Sense
          </h1>
          <p
            style={{
              color: '#9E8B6E',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '500px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            For those who perceive what others cannot. Crafted with precision, designed for the perceptive.
          </p>
          <Link to="/shop" className="btn-primary d-inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Collection */}
      <section ref={featuredRef} style={{ padding: '100px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div className="text-center mb-5 featured-title">
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
              Curated Selection
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#E8DCC8',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Featured Collection
            </h2>
          </div>
          <div className="row g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-4 product-card">
                <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
                  <div
                    style={{
                      background: '#141414',
                      border: '1px solid #2A2A2A',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#9E8B6E'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E8DCC8', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {product.name}
                      </h3>
                      <p style={{ color: '#9E8B6E', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="btn-outline d-inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section
        ref={storyRef}
        style={{
          padding: '100px 0',
          background: '#0A0A0A',
          borderTop: '1px solid #2A2A2A',
        }}
      >
        <div className="container story-content">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="text-center">
                <img
                  src="/se7enth-logo.png"
                  alt="Se7enth Logo"
                  style={{ maxWidth: '200px', marginBottom: '24px' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    document.getElementById('logo-fallback').style.display = 'block';
                  }}
                />
                <div id="logo-fallback" style={{ display: 'none', marginBottom: '24px' }}>
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
            </div>
            <div className="col-md-6">
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
                Our Philosophy
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: '#E8DCC8',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '20px',
                }}
              >
                The Number Seven
              </h2>
              <p style={{ color: '#E8DCC8', fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '16px' }}>
                Seven is the number of perfection, completion, and spiritual awakening. It appears across cultures and traditions — seven days of creation, seven chakras, seven wonders of the world.
              </p>
              <p style={{ color: '#E8DCC8', fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '16px' }}>
                At Se7enth, we believe clothing is more than fabric. It is an extension of perception, a statement of awareness, a badge for those who see beyond the surface.
              </p>
              <p style={{ color: '#E8DCC8', fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.8 }}>
                Every stitch carries intention. Every design holds meaning. We do not follow trends — we create for the awakened.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
