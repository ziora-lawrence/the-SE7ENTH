import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const detailsRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-detail-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.related-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: relatedRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h2 style={{ color: '#E8DCC8', marginBottom: '20px' }}>Product Not Found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5 product-detail-content">
        <div className="row g-5">
          {/* Product Image */}
          <div className="col-md-6">
            <div style={{ background: '#141414', border: '1px solid #2A2A2A', overflow: 'hidden' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6" ref={detailsRef}>
            <p style={{ color: '#9E8B6E', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E8DCC8', textTransform: 'uppercase', marginBottom: '16px' }}>
              {product.name}
            </h1>
            <p style={{ color: '#E8DCC8', fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
              ₦{product.price.toLocaleString()}
            </p>
            <p style={{ color: '#E8DCC8', fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.7, marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-4">
              <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#9E8B6E', marginBottom: '12px', display: 'block' }}>
                Select Size
              </label>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="size-btn"
                    style={{
                      background: selectedSize === size ? '#9E8B6E' : 'transparent',
                      color: selectedSize === size ? '#0A0A0A' : '#E8DCC8',
                      borderColor: selectedSize === size ? '#9E8B6E' : '#2A2A2A',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#9E8B6E', marginBottom: '12px', display: 'block' }}>
                Quantity
              </label>
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#141414',
                    border: '1px solid #2A2A2A',
                    color: '#E8DCC8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  -
                </button>
                <span style={{ color: '#E8DCC8', fontSize: '1rem', fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#141414',
                    border: '1px solid #2A2A2A',
                    color: '#E8DCC8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary w-100"
              style={{ padding: '16px', fontSize: '0.9rem' }}
            >
              Add to Cart — ₦{(product.price * quantity).toLocaleString()}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div ref={relatedRef} className="mt-5 pt-5" style={{ borderTop: '1px solid #2A2A2A' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E8DCC8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>
              You May Also Like
            </h2>
            <div className="row g-4">
              {relatedProducts.map(p => (
                <div key={p.id} className="col-md-4 related-card">
                  <Link to={`/product/${p.id}`} style={{ display: 'block' }}>
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
                          src={p.image}
                          alt={p.name}
                          style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E8DCC8', marginBottom: '8px', textTransform: 'uppercase' }}>
                          {p.name}
                        </h3>
                        <p style={{ color: '#9E8B6E', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                          ₦{p.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
