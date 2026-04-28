import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className="fixed-top"
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
        transition: 'all 0.4s ease',
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center">
          <img
            src="/se7enth-logo.png"
            alt="Se7enth Clothing"
            style={{ height: scrolled ? '36px' : '44px', transition: 'all 0.4s ease' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span
            style={{
              display: 'none',
              fontSize: scrolled ? '1.4rem' : '1.6rem',
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#E8DCC8',
              transition: 'all 0.4s ease',
            }}
          >
            SE7ENTH
          </span>
        </Link>

        <div className="d-none d-md-flex align-items-center gap-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? '#9E8B6E' : '#E8DCC8',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'color 0.3s ease',
                borderBottom: location.pathname === link.path ? '2px solid #9E8B6E' : '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="position-relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8DCC8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            {cartCount > 0 && (
              <span
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{
                  top: '-8px',
                  right: '-8px',
                  width: '20px',
                  height: '20px',
                  background: '#9E8B6E',
                  color: '#0A0A0A',
                  borderRadius: '50%',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="d-md-none btn p-0"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#E8DCC8' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8DCC8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="d-md-none"
          style={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid #2A2A2A',
            padding: '20px 0',
          }}
        >
          <div className="container d-flex flex-column gap-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? '#9E8B6E' : '#E8DCC8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  padding: '8px 0',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
