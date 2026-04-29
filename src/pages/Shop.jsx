import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Hoodies', 'Tees', 'Pants', 'Accessories'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(60000);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const { addToCart } = useCart();
  const gridRef = useRef(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
      const priceMatch = product.price <= priceRange;
      return categoryMatch && sizeMatch && priceMatch;
    });
  }, [selectedCategory, selectedSizes, priceRange]);

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Custom cursor tracking & Magnetic buttons
  useEffect(() => {
    const move = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sidebar stagger
      gsap.from('.sidebar-anim', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product cards stagger
      gsap.from('.shop-product-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    });
    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A', overflowX: 'hidden' }}>
      
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

      <div className="container py-5">
        <div className="text-center mb-5" style={{ overflow: 'hidden' }}>
          <img
            src="/se7enth-logo.png"
            alt="Se7enth Clothing"
            style={{
              maxWidth: '220px',
              marginBottom: '20px',
              opacity: 0.9,
              mixBlendMode: 'screen', // Helps if the logo has a black background
            }}
            onError={e => e.target.style.display = 'none'}
          />
          <p style={{ 
            color: '#9E8B6E', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '4px' 
          }}>
            ✦ {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available ✦
          </p>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div
              style={{
                background: '#111',
                border: '1px solid #1A1A1A',
                padding: '32px 24px',
                position: 'sticky',
                top: '120px',
              }}
            >
              {/* Category Filter */}
              <div className="mb-5 sidebar-anim">
                <h5
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    color: '#9E8B6E',
                    marginBottom: '20px',
                  }}
                >
                  Category
                </h5>
                <div className="d-flex flex-column gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      onMouseEnter={() => setCursorVisible(true)}
                      onMouseLeave={() => setCursorVisible(false)}
                      className="text-start p-0"
                      style={{
                        color: selectedCategory === cat ? '#E8DCC8' : 'rgba(232,220,200,0.4)',
                        fontSize: '0.8rem',
                        fontWeight: selectedCategory === cat ? 600 : 400,
                        transition: 'all 0.3s ease',
                        background: 'none',
                        border: 'none',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        paddingLeft: selectedCategory === cat ? '10px' : '0',
                        borderLeft: selectedCategory === cat ? '2px solid #9E8B6E' : 'none',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-5 sidebar-anim">
                <h5
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    color: '#9E8B6E',
                    marginBottom: '20px',
                  }}
                >
                  Size
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      onMouseEnter={() => setCursorVisible(true)}
                      onMouseLeave={() => setCursorVisible(false)}
                      style={{
                        background: selectedSizes.includes(size) ? '#9E8B6E' : 'transparent',
                        color: selectedSizes.includes(size) ? '#0A0A0A' : '#E8DCC8',
                        borderColor: selectedSizes.includes(size) ? '#9E8B6E' : '#1A1A1A',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        padding: '8px 16px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={e => {
                        if (!selectedSizes.includes(size)) {
                          e.currentTarget.style.borderColor = '#9E8B6E';
                        }
                      }}
                      onMouseOut={e => {
                        if (!selectedSizes.includes(size)) {
                          e.currentTarget.style.borderColor = '#1A1A1A';
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="sidebar-anim">
                <h5
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    color: '#9E8B6E',
                    marginBottom: '20px',
                  }}
                >
                  Max Price
                </h5>
                <input
                  type="range"
                  min="10000"
                  max="60000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  onMouseEnter={() => setCursorVisible(true)}
                  onMouseLeave={() => setCursorVisible(false)}
                  style={{ width: '100%', marginBottom: '16px', accentColor: '#9E8B6E' }}
                />
                <div className="d-flex justify-content-between">
                  <span style={{ color: 'rgba(232,220,200,0.4)', fontSize: '0.75rem', fontWeight: 600 }}>₦10K</span>
                  <span style={{ color: '#E8DCC8', fontSize: '0.75rem', fontWeight: 700 }}>
                    ₦{priceRange.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div ref={gridRef} className="row g-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-md-6 col-xl-4 shop-product-card">
                  <div
                    onMouseEnter={(e) => {
                      setActiveCard(product.id);
                      e.currentTarget.style.borderColor = '#9E8B6E';
                    }}
                    onMouseLeave={(e) => {
                      setActiveCard(null);
                      e.currentTarget.style.borderColor = '#1A1A1A';
                      gsap.to(e.currentTarget, { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)', duration: 0.6, ease: 'power2.out' });
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = ((y - centerY) / centerY) * -10;
                      const rotateY = ((x - centerX) / centerX) * 10;
                      gsap.to(e.currentTarget, { 
                        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, 
                        duration: 0.4, ease: 'power2.out' 
                      });
                    }}
                    style={{
                      background: '#111',
                      border: activeCard === product.id ? '1px solid #9E8B6E' : '1px solid #1A1A1A',
                      overflow: 'hidden',
                      transition: 'border-color 0.4s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <Link 
                      to={`/product/${product.id}`} 
                      style={{ display: 'block', overflow: 'hidden', position: 'relative' }}
                      onMouseEnter={() => setCursorVisible(true)}
                      onMouseLeave={() => setCursorVisible(false)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '340px',
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
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '4px',
                          border: '1px solid rgba(232,220,200,0.4)',
                          padding: '10px 20px',
                        }}>
                          View Product
                        </span>
                      </div>
                    </Link>
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ color: '#9E8B6E', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
                        {product.category}
                      </p>
                      <Link to={`/product/${product.id}`}
                        onMouseEnter={() => setCursorVisible(true)}
                        onMouseLeave={() => setCursorVisible(false)}
                      >
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E8DCC8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {product.name}
                        </h3>
                      </Link>
                      <p style={{ color: '#E8DCC8', fontSize: '1rem', fontWeight: 600, marginBottom: '24px' }}>
                        ₦{product.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => addToCart(product, product.sizes[0], 1)}
                        className="magnetic-btn mt-auto"
                        onMouseEnter={() => setCursorVisible(true)}
                        onMouseLeave={() => setCursorVisible(false)}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '3px',
                          background: 'transparent',
                          color: '#9E8B6E',
                          border: '1px solid #9E8B6E',
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
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <p style={{ color: 'rgba(232,220,200,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  No products match your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSizes([]);
                    setPriceRange(60000);
                  }}
                  className="magnetic-btn mt-4"
                  onMouseEnter={() => setCursorVisible(true)}
                  onMouseLeave={() => setCursorVisible(false)}
                  style={{
                    background: 'transparent',
                    color: '#E8DCC8',
                    padding: '12px 32px',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    border: '1px solid rgba(232,220,200,0.2)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#9E8B6E'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(232,220,200,0.2)'}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
