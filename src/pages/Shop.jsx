import { useState, useEffect, useRef } from 'react';
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
  const { addToCart } = useCart();
  const gridRef = useRef(null);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
    const priceMatch = product.price <= priceRange;
    return categoryMatch && sizeMatch && priceMatch;
  });

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-product-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#E8DCC8',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px',
            }}
          >
            Shop
          </h1>
          <p style={{ color: '#9E8B6E', fontSize: '0.9rem' }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2A2A',
                padding: '24px',
                position: 'sticky',
                top: '100px',
              }}
            >
              {/* Category Filter */}
              <div className="mb-4">
                <h5
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#9E8B6E',
                    marginBottom: '16px',
                  }}
                >
                  Category
                </h5>
                <div className="d-flex flex-column gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="btn text-start p-0"
                      style={{
                        color: selectedCategory === cat ? '#9E8B6E' : '#E8DCC8',
                        fontSize: '0.85rem',
                        fontWeight: selectedCategory === cat ? 600 : 400,
                        transition: 'color 0.3s ease',
                        background: 'none',
                        border: 'none',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-4">
                <h5
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#9E8B6E',
                    marginBottom: '16px',
                  }}
                >
                  Size
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className="size-btn"
                      style={{
                        background: selectedSizes.includes(size) ? '#9E8B6E' : 'transparent',
                        color: selectedSizes.includes(size) ? '#0A0A0A' : '#E8DCC8',
                        borderColor: selectedSizes.includes(size) ? '#9E8B6E' : '#2A2A2A',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h5
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#9E8B6E',
                    marginBottom: '16px',
                  }}
                >
                  Price Range
                </h5>
                <input
                  type="range"
                  min="10000"
                  max="60000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', marginBottom: '12px' }}
                />
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>₦10,000</span>
                  <span style={{ color: '#9E8B6E', fontSize: '0.85rem', fontWeight: 600 }}>
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
                    style={{
                      background: '#141414',
                      border: '1px solid #2A2A2A',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#9E8B6E'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
                  >
                    <Link to={`/product/${product.id}`} style={{ display: 'block', overflow: 'hidden' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '320px',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </Link>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ color: '#9E8B6E', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                        {product.category}
                      </p>
                      <Link to={`/product/${product.id}`}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E8DCC8', marginBottom: '8px', textTransform: 'uppercase' }}>
                          {product.name}
                        </h3>
                      </Link>
                      <p style={{ color: '#E8DCC8', fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>
                        ₦{product.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => addToCart(product, product.sizes[0], 1)}
                        className="btn-primary mt-auto"
                        style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}
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
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  No products match your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSizes([]);
                    setPriceRange(60000);
                  }}
                  className="btn-outline mt-3"
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
