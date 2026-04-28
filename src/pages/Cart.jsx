import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '24px' }}>
            <path d="M6 6h15l-1.5 9h-12z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M6 6L5 3H2" />
          </svg>
          <h2 style={{ color: '#E8DCC8', fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Discover our collection and add something special.
          </p>
          <Link to="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5">
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E8DCC8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '40px' }}>
          Shopping Cart
        </h1>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${index}`}
                  className="d-flex gap-3 p-3"
                  style={{ background: '#141414', border: '1px solid #2A2A2A' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100px', height: '120px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E8DCC8', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {item.name}
                        </h3>
                        <p style={{ color: '#9E8B6E', fontSize: '0.8rem', margin: 0 }}>
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="btn p-0"
                        style={{ color: '#666', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#666'}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="btn"
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#0A0A0A',
                            border: '1px solid #2A2A2A',
                            color: '#E8DCC8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                          }}
                        >
                          -
                        </button>
                        <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="btn"
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#0A0A0A',
                            border: '1px solid #2A2A2A',
                            color: '#E8DCC8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                          }}
                        >
                          +
                        </button>
                      </div>
                      <p style={{ color: '#E8DCC8', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2A2A',
                padding: '24px',
                position: 'sticky',
                top: '100px',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E8DCC8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
                Order Summary
              </h3>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Subtotal</span>
                <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 600 }}>
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Shipping</span>
                <span style={{ color: '#9E8B6E', fontSize: '0.9rem', fontWeight: 600 }}>
                  Calculated at checkout
                </span>
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid #2A2A2A' }}>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#E8DCC8', fontSize: '1rem', fontWeight: 600 }}>Total</span>
                  <span style={{ color: '#9E8B6E', fontSize: '1.2rem', fontWeight: 700 }}>
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="btn-primary w-100 d-block text-center mt-4"
                style={{ padding: '14px' }}
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="btn-outline w-100 d-block text-center mt-3"
                style={{ padding: '12px', fontSize: '0.8rem' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
