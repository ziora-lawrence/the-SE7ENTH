import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state || {};

  useEffect(() => {
    gsap.from('.confirmation-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
    });
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container py-5">
        <div className="text-center confirmation-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(158, 139, 110, 0.1)',
              border: '2px solid #9E8B6E',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9E8B6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            className="confirmation-content"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 700,
              color: '#E8DCC8',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
            }}
          >
            Order Confirmed
          </h1>

          <p className="confirmation-content" style={{ color: '#9E8B6E', fontSize: '1rem', marginBottom: '32px' }}>
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div
            className="confirmation-content text-start"
            style={{
              background: '#141414',
              border: '1px solid #2A2A2A',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
              Order Summary
            </h3>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Reference</span>
                <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 500 }}>
                  {orderData.reference || 'SE7ENTH_' + Math.floor(Math.random() * 1000000000)}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Customer</span>
                <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 500 }}>
                  {orderData.name || 'Guest'}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Email</span>
                <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 500 }}>
                  {orderData.email || 'N/A'}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Amount Paid</span>
                <span style={{ color: '#9E8B6E', fontSize: '0.9rem', fontWeight: 700 }}>
                  ₦{(orderData.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Link to="/shop" className="btn-primary confirmation-content">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
