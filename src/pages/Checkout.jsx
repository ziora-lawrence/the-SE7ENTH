import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/shop');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaystackPayment = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.state) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key_here',
      email: formData.email,
      amount: cartTotal * 100,
      currency: 'NGN',
      ref: 'SE7ENTH_' + Math.floor(Math.random() * 1000000000),
      metadata: {
        custom_fields: [
          {
            display_name: 'Full Name',
            variable_name: 'full_name',
            value: formData.fullName,
          },
          {
            display_name: 'Phone',
            variable_name: 'phone',
            value: formData.phone,
          },
          {
            display_name: 'Address',
            variable_name: 'address',
            value: formData.address,
          },
          {
            display_name: 'State',
            variable_name: 'state',
            value: formData.state,
          },
        ],
      },
      callback: function(response) {
        setLoading(false);
        clearCart();
        navigate('/order-confirmation', {
          state: {
            reference: response.reference,
            amount: cartTotal,
            email: formData.email,
            name: formData.fullName,
          },
        });
      },
      onClose: function() {
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  if (cartItems.length === 0) return null;

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT',
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#0A0A0A' }}>
      <div className="container py-5">
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E8DCC8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '40px' }}>
          Checkout
        </h1>

        <div className="row">
          {/* Checkout Form */}
          <div className="col-lg-7">
            <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
                Delivery Information
              </h3>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 08012345678"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{ appearance: 'auto' }}
                >
                  <option value="">Select State</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5 mt-4 mt-lg-0">
            <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#9E8B6E', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
                Order Summary
              </h3>

              <div className="d-flex flex-column gap-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '60px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ color: '#E8DCC8', fontSize: '0.85rem', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>
                          {item.name}
                        </p>
                        <p style={{ color: '#666', fontSize: '0.75rem', margin: 0 }}>
                          {item.size} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3" style={{ borderTop: '1px solid #2A2A2A' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Subtotal</span>
                  <span style={{ color: '#E8DCC8', fontSize: '0.9rem', fontWeight: 600 }}>
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#E8DCC8', opacity: 0.7, fontSize: '0.9rem' }}>Shipping</span>
                  <span style={{ color: '#9E8B6E', fontSize: '0.9rem' }}>Free</span>
                </div>
                <div className="d-flex justify-content-between mt-3 pt-3" style={{ borderTop: '1px solid #2A2A2A' }}>
                  <span style={{ color: '#E8DCC8', fontSize: '1.1rem', fontWeight: 600 }}>Total</span>
                  <span style={{ color: '#9E8B6E', fontSize: '1.3rem', fontWeight: 700 }}>
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePaystackPayment}
                disabled={loading}
                className="btn-primary w-100 mt-4"
                style={{ padding: '16px' }}
              >
                {loading ? 'Processing...' : `Pay ₦${cartTotal.toLocaleString()}`}
              </button>

              <div className="text-center mt-3">
                <img
                  src="https://placehold.co/200x40/141414/9E8B6E?text=Secured+by+Paystack"
                  alt="Paystack"
                  style={{ opacity: 0.6, maxWidth: '150px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
