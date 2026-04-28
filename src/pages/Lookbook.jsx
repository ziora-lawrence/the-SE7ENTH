import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lookbookImages = [
  { src: 'https://placehold.co/800x1000/141414/9E8B6E?text=Look+1', title: 'Midnight Session', subtitle: 'FW24' },
  { src: 'https://placehold.co/800x600/141414/9E8B6E?text=Look+2', title: 'Urban Shadows', subtitle: 'SS24' },
  { src: 'https://placehold.co/600x800/141414/9E8B6E?text=Look+3', title: 'Golden Hour', subtitle: 'FW24' },
  { src: 'https://placehold.co/800x800/141414/9E8B6E?text=Look+4', title: 'The Awakening', subtitle: 'SS24' },
  { src: 'https://placehold.co/800x1000/141414/9E8B6E?text=Look+5', title: 'Silent Observer', subtitle: 'FW24' },
  { src: 'https://placehold.co/800x600/141414/9E8B6E?text=Look+6', title: 'Perception', subtitle: 'SS24' },
  { src: 'https://placehold.co/600x800/141414/9E8B6E?text=Look+7', title: 'Seventh Sense', subtitle: 'FW24' },
  { src: 'https://placehold.co/800x800/141414/9E8B6E?text=Look+8', title: 'Beyond', subtitle: 'SS24' },
];

export default function Lookbook() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lookbook-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
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
            Visual Journey
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
            Lookbook
          </h1>
        </div>

        <div ref={gridRef} className="row g-3">
          {lookbookImages.map((item, index) => (
            <div
              key={index}
              className={`col-md-6 col-lg-${index % 3 === 0 ? '8' : index % 3 === 1 ? '4' : '6'} lookbook-item`}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: index % 3 === 0 ? '500px' : index % 3 === 1 ? '500px' : '400px',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '30px',
                    background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <p style={{ color: '#9E8B6E', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '4px' }}>
                    {item.subtitle}
                  </p>
                  <h3 style={{ color: '#E8DCC8', fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
