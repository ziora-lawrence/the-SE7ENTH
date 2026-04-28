import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A', padding: '60px 0 30px' }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '3px', color: '#E8DCC8', marginBottom: '16px' }}>
              SE7ENTH
            </h4>
            <p style={{ color: '#9E8B6E', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Wear Your Seventh Sense. Premium streetwear crafted for those who see beyond.
            </p>
          </div>
          <div className="col-md-2">
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#9E8B6E', marginBottom: '16px' }}>
              Shop
            </h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/shop" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>All Products</Link>
              <Link to="/shop" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>Hoodies</Link>
              <Link to="/shop" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>Tees</Link>
              <Link to="/shop" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>Accessories</Link>
            </div>
          </div>
          <div className="col-md-2">
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#9E8B6E', marginBottom: '16px' }}>
              Brand
            </h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/about" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>About</Link>
              <Link to="/lookbook" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>Lookbook</Link>
              <Link to="/contact" style={{ color: '#E8DCC8', fontSize: '0.85rem', opacity: 0.7 }}>Contact</Link>
            </div>
          </div>
          <div className="col-md-4">
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#9E8B6E', marginBottom: '16px' }}>
              Follow Us
            </h5>
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
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid #2A2A2A' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
              &copy; 2024 Se7enth Clothing. All rights reserved.
            </p>
            <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
              Designed with intention. Made for the perceptive.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
