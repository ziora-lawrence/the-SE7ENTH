import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredIds = [1, 2, 4];
const featuredProducts = products.filter(p => featuredIds.includes(p.id));

const MARQUEE_ITEMS = [
  'SE7ENTH', '✦', 'WEAR YOUR SEVENTH SENSE', '✦',
  'EST. 2024', '✦', 'PREMIUM STREETWEAR', '✦',
  'SE7ENTH', '✦', 'WEAR YOUR SEVENTH SENSE', '✦',
  'EST. 2024', '✦', 'PREMIUM STREETWEAR', '✦',
];

export default function Home() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const featuredRef = useRef(null);
  const marqueeRef = useRef(null);
  const dropRef = useRef(null);
  const philosophyRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(158, 139, 110, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger reveal and scramble effect
      gsap.from('.hero-line', {
        y: 120,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.4,
      });

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      document.querySelectorAll('.hero-line').forEach((el, index) => {
        if (!el.innerText || el.innerText.trim() === '') return;
        const originalText = el.innerText;
        const duration = 1500;
        const delay = index * 200 + 400; // stagger 0.2s + initial delay 0.4s
        
        setTimeout(() => {
          let startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
              clearInterval(interval);
              el.innerText = originalText;
            } else {
              el.innerText = originalText.split('').map(c => c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join('');
            }
          }, 50);
        }, delay);
      });

      gsap.from('.hero-sub', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.1,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.4,
        ease: 'power3.out',
      });

      gsap.from('.hero-scroll-hint', {
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: 'power2.out',
      });

      // Giant 7 parallax
      gsap.to('.bg-seven', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Marquee scroll speed
      const marqueeAnim = gsap.to(marqueeRef.current, {
        x: '-50%',
        duration: 18,
        repeat: -1,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = 1 + velocity / 50; // Speed up based on scroll velocity
          gsap.to(marqueeAnim, { timeScale: Math.min(timeScale, 15), duration: 0.1, overwrite: true });
          gsap.to(marqueeAnim, { timeScale: 1, duration: 0.8, delay: 0.1, overwrite: 'auto' });
        }
      });

      // Featured cards stagger
      gsap.from('.feat-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.feat-heading', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
        },
      });

      // Drop section
      gsap.from('.drop-content', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dropRef.current,
          start: 'top 75%',
        },
      });

      // Philosophy lines
      gsap.from('.phil-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 75%',
        },
      });

      // Philosophy number counter feel
      gsap.from('.stat-num', {
        textContent: 0,
        duration: 1.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 80%',
        },
      });

      // Section reveal with clip-path
      [featuredRef.current, dropRef.current, philosophyRef.current].forEach(section => {
        if (section) {
          gsap.fromTo(section, 
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Custom cursor tracking & Magnetic buttons
  useEffect(() => {
    const move = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Magnetic pull effect for buttons
      document.querySelectorAll('.magnetic-btn').forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 80) {
          gsap.to(btn, { x: distanceX * 0.4, y: distanceY * 0.4, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        }
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div style={{ background: '#0A0A0A', overflowX: 'hidden' }}>

      {/* Custom cursor */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 20,
        top: mousePos.y - 20,
        width: 40,
        height: 40,
        border: '1px solid rgba(158,139,110,0.6)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.15s ease, opacity 0.3s ease',
        transform: cursorVisible ? 'scale(1.8)' : 'scale(1)',
        opacity: 0.7,
        mixBlendMode: 'difference',
      }} />

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Giant ghost 7 */}
        <div className="bg-seven" style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(300px, 45vw, 600px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(158,139,110,0.08)',
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 1,
          fontFamily: "'Georgia', serif",
          pointerEvents: 'none',
        }}>7</div>

        {/* Diagonal accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: '60%',
          width: 1,
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(158,139,110,0.15), transparent)',
          transform: 'rotate(12deg)',
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'left',
          padding: '0 5vw',
          maxWidth: 1000,
          width: '100%',
        }}>
          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <p className="hero-line" style={{
              color: '#9E8B6E',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '6px',
              margin: 0,
            }}>
              Collection 001 — Lagos, Nigeria
            </p>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-line" style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 900,
              color: '#E8DCC8',
              letterSpacing: '-3px',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              WEAR
            </h1>
          </div>

          <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '2vw' }}>
            <h1 className="hero-line" style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px #9E8B6E',
              letterSpacing: '-3px',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              YOUR
            </h1>
            <div className="hero-line" style={{
              width: 'clamp(40px, 8vw, 100px)',
              height: 2,
              background: '#9E8B6E',
              flexShrink: 0,
            }} />
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-line" style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 900,
              color: '#9E8B6E',
              letterSpacing: '-3px',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              SE7ENTH
            </h1>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: 0 }}>
            <h1 className="hero-line" style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 900,
              color: '#E8DCC8',
              letterSpacing: '-3px',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              SENSE
            </h1>
          </div>

          <div className="hero-sub" style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}>
            <p style={{
              color: 'rgba(232,220,200,0.55)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              maxWidth: 340,
              lineHeight: 1.7,
              margin: 0,
            }}>
              For those who perceive what others cannot.
              Crafted with precision — designed for the awakened.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/shop"
                className="magnetic-btn"
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                style={{
                  background: '#9E8B6E',
                  color: '#0A0A0A',
                  padding: '14px 36px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  border: '2px solid #9E8B6E',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#9E8B6E';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#9E8B6E';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
              >
                Shop Now
              </Link>
              <Link
                to="/lookbook"
                className="magnetic-btn"
                style={{
                  background: 'transparent',
                  color: '#E8DCC8',
                  padding: '14px 36px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'inline-block',
                  border: '2px solid rgba(232,220,200,0.2)',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#9E8B6E'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(232,220,200,0.2)'}
              >
                Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
          pointerEvents: 'none',
        }}>
          <span style={{ color: 'rgba(158,139,110,0.6)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 50,
            background: 'linear-gradient(to bottom, rgba(158,139,110,0.6), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 200,
          background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid #1A1A1A',
        borderBottom: '1px solid #1A1A1A',
        padding: '14px 0',
        background: '#0D0D0D',
      }}>
        <div ref={marqueeRef} style={{
          display: 'flex',
          gap: 48,
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              color: item === '✦' ? '#9E8B6E' : 'rgba(232,220,200,0.35)',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontFamily: "'Georgia', serif",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED COLLECTION ─── */}
      <section ref={featuredRef} style={{ padding: '120px 0 80px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>

          <div className="feat-heading" style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 64,
            flexWrap: 'wrap',
            gap: 20,
          }}>
            <div>
              <p style={{
                color: '#9E8B6E', fontSize: '0.7rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '5px', marginBottom: 12,
              }}>
                ✦ Curated Selection
              </p>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#E8DCC8',
                textTransform: 'uppercase',
                letterSpacing: '-1px',
                lineHeight: 1,
                margin: 0,
                fontFamily: "'Georgia', serif",
              }}>
                Featured<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px #9E8B6E' }}>
                  Collection
                </span>
              </h2>
            </div>
            <Link to="/shop" style={{
              color: '#9E8B6E',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              borderBottom: '1px solid #9E8B6E',
              paddingBottom: 4,
              transition: 'opacity 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.6'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              View All →
            </Link>
          </div>

          {/* Asymmetric card grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: 20,
          }}>
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="feat-card"
                onMouseEnter={() => setActiveCard(product.id)}
                onMouseLeave={(e) => {
                  setActiveCard(null);
                  gsap.to(e.currentTarget, { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)', duration: 0.6, ease: 'power2.out' });
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -12;
                  const rotateY = ((x - centerX) / centerX) * 12;
                  gsap.to(e.currentTarget, { 
                    transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, 
                    duration: 0.4, ease: 'power2.out' 
                  });
                }}
                style={{
                  display: 'block',
                  gridRow: index === 0 ? 'span 1' : 'span 1',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#111',
                  border: activeCard === product.id ? '1px solid #9E8B6E' : '1px solid #1A1A1A',
                  transition: 'border-color 0.4s ease',
                  marginTop: index === 1 ? 40 : 0,
                }}
              >
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: index === 0 ? 520 : 420,
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s ease',
                      transform: activeCard === product.id ? 'scale(1.07)' : 'scale(1)',
                    }}
                  />
                  {/* Overlay on hover */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10,10,10,0.45)',
                    opacity: activeCard === product.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      color: '#E8DCC8',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '5px',
                      border: '1px solid rgba(232,220,200,0.4)',
                      padding: '10px 24px',
                    }}>
                      View Product
                    </span>
                  </div>
                </div>

                <div style={{ padding: '20px 20px 24px' }}>
                  <p style={{
                    color: '#9E8B6E', fontSize: '0.65rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 6,
                  }}>
                    {product.category}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{
                      fontSize: '0.95rem', fontWeight: 600,
                      color: '#E8DCC8', textTransform: 'uppercase',
                      letterSpacing: '1px', margin: 0,
                    }}>
                      {product.name}
                    </h3>
                    <p style={{ color: '#9E8B6E', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW DROP BANNER ─── */}
      <section ref={dropRef} style={{
        margin: '0',
        padding: '100px 5vw',
        background: '#0D0D0D',
        borderTop: '1px solid #1A1A1A',
        borderBottom: '1px solid #1A1A1A',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background number */}
        <div style={{
          position: 'absolute',
          left: '-3%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(158,139,110,0.06)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: "'Georgia', serif",
        }}>7</div>

        <div className="drop-content" style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
        }}>
          <div>
            <p style={{
              color: '#9E8B6E', fontSize: '0.7rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '5px', marginBottom: 16,
            }}>
              ✦ Now Available
            </p>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#E8DCC8',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              lineHeight: 0.9,
              margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              THE FIRST<br />
              <span style={{ color: '#9E8B6E' }}>DROP</span><br />
              IS LIVE
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
            <p style={{
              color: 'rgba(232,220,200,0.55)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: 340,
              margin: 0,
            }}>
              12 pieces. Limited quantities. Each one crafted with the precision of the number that defines us.
            </p>
            <Link to="/shop" style={{
              background: 'transparent',
              color: '#9E8B6E',
              border: '1px solid #9E8B6E',
              padding: '14px 40px',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#9E8B6E';
                e.currentTarget.style.color = '#0A0A0A';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9E8B6E';
              }}
            >
              Shop the Drop
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY / STATS ─── */}
      <section ref={philosophyRef} style={{ padding: '120px 5vw', background: '#0A0A0A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: 80,
          }}>
            <div>
              {['The', 'Number', 'Seven'].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <h2 className="phil-line" style={{
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    fontWeight: 900,
                    color: i === 2 ? '#9E8B6E' : '#E8DCC8',
                    textTransform: 'uppercase',
                    letterSpacing: '-2px',
                    lineHeight: 0.9,
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                  }}>
                    {word}
                  </h2>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                'Seven is the number of perfection. Completion. Spiritual awakening.',
                'It appears across every culture — seven days, seven chakras, seven wonders.',
                'At Se7enth, we design for those who perceive what others cannot. Every stitch carries intention. Every piece holds meaning.',
              ].map((text, i) => (
                <p key={i} className="phil-line" style={{
                  color: i === 2 ? 'rgba(232,220,200,0.75)' : 'rgba(232,220,200,0.45)',
                  fontSize: i === 2 ? '1rem' : '0.9rem',
                  lineHeight: 1.8,
                  margin: 0,
                  borderLeft: i === 2 ? '2px solid #9E8B6E' : 'none',
                  paddingLeft: i === 2 ? 20 : 0,
                }}>
                  {text}
                </p>
              ))}
              <Link to="/about" className="phil-line" style={{
                color: '#9E8B6E',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                borderBottom: '1px solid #9E8B6E',
                paddingBottom: 4,
                width: 'fit-content',
                transition: 'opacity 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.6'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}
              >
                Our Story →
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid #1A1A1A',
            paddingTop: 60,
            gap: 20,
          }}>
            {[
              { num: '12', label: 'Pieces in Collection 001', suffix: '' },
              { num: '7', label: 'The number that defines us', suffix: '' },
              { num: '100', label: 'Premium quality. Always.', suffix: '%' },
            ].map((stat, i) => (
              <div key={i} style={{
                borderLeft: i !== 0 ? '1px solid #1A1A1A' : 'none',
                paddingLeft: i !== 0 ? 40 : 0,
              }}>
                <p className="stat-num" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: '#9E8B6E',
                  margin: 0,
                  lineHeight: 1,
                  fontFamily: "'Georgia', serif",
                }}>
                  {stat.num}{stat.suffix}
                </p>
                <p style={{
                  color: 'rgba(232,220,200,0.4)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '12px 0 0',
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOGO SECTION ─── */}
      <section style={{
        padding: '80px 5vw',
        background: '#0D0D0D',
        borderTop: '1px solid #1A1A1A',
        textAlign: 'center',
      }}>
        <img
          src="/se7enth-logo.png"
          alt="Se7enth Clothing"
          style={{
            maxWidth: 160,
            opacity: 0.85,
            filter: 'brightness(0.9)',
            marginBottom: 28,
            mixBlendMode: 'screen',
          }}
          onError={e => e.target.style.display = 'none'}
        />
        <p style={{
          color: 'rgba(158,139,110,0.5)',
          fontSize: '0.7rem',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          margin: '0 auto',
        }}>
          Se7enth Clothing — EST. 2024
        </p>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        @media (max-width: 768px) {
          .feat-card { grid-column: span 3 !important; margin-top: 0 !important; }
          [style*="gridTemplateColumns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: repeat(3, 1fr)"].stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}