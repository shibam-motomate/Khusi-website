'use client';

import Link from 'next/link';
import { useState } from 'react';
import { shippingFor, useCart } from '@/lib/cart';

export default function CheckoutPage() {
  const { items, clearCart, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const shipping = shippingFor(subtotal, items.length);
  const total = subtotal + shipping;

  const placeOrder = () => {
    setOrderId(`HL-${Math.floor(10000 + Math.random() * 90000)}`);
    setPlaced(true);
    clearCart();
  };

  return (
    <div style={{ color: '#171717', minHeight: '100vh' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          borderBottom: '1px solid #f7efe9'
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#171717' }}>
          <span className="fredoka" style={{ fontWeight: 600, fontSize: 18, color: '#2b1a07' }}>
            happy loops
          </span>
        </Link>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#2b1a07' }}>secure checkout</span>
      </header>

      <div className="page-pad" style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 40px 100px' }}>
        {placed ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span
              style={{
                display: 'inline-block',
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#f7efe9',
                border: '1.5px solid #171717',
                marginBottom: 20
              }}
            />
            <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 30, margin: '0 0 12px', color: '#2b1a07' }}>
              thank you{name ? `, ${name}` : ''}!
            </h1>
            <p style={{ fontSize: 16, color: '#2b1a07', margin: '0 0 6px' }}>
              Your order <strong>{orderId}</strong> is confirmed.
            </p>
            <p style={{ fontSize: 14, color: '#2b1a07', margin: '0 0 28px' }}>I&apos;ll email you when it ships.</p>
            <Link href="/" className="pill-btn" style={{ padding: '13px 26px' }}>
              Back to Home
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p className="fredoka" style={{ fontWeight: 600, fontSize: 22, margin: '0 0 16px', color: '#2b1a07' }}>
              your cart is empty
            </p>
            <Link href="/shop" className="pill-btn" style={{ padding: '13px 26px' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 30, margin: '0 0 32px', color: '#2b1a07' }}>
              checkout
            </h1>
            <div className="checkout-layout" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 14px', color: '#171717' }}>
                    contact
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="field" />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="field" />
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 14px', color: '#171717' }}>
                    shipping address
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="text" placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)} className="field" />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="field" style={{ flex: 1 }} />
                      <input type="text" placeholder="ZIP" value={zip} onChange={e => setZip(e.target.value)} className="field" style={{ width: 120 }} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 6px', color: '#171717' }}>
                    payment
                  </h3>
                  <p style={{ fontSize: 12, color: '#2b1a07', margin: '0 0 12px' }}>Prototype checkout — no charge will be made.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="text" placeholder="Card number" className="field" />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input type="text" placeholder="MM / YY" className="field" style={{ flex: 1 }} />
                      <input type="text" placeholder="CVC" className="field" style={{ width: 120 }} />
                    </div>
                  </div>
                </div>
              </div>

              <aside
                style={{
                  width: 320,
                  flex: 'none',
                  background: '#f7efe9',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  border: '1.5px solid #171717'
                }}
              >
                <h3 className="fredoka" style={{ fontWeight: 600, fontSize: 20, margin: 0, color: '#2b1a07' }}>
                  order summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 220, overflow: 'auto' }}>
                  {items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span>
                        {item.qty}× {item.name}
                      </span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid #171717', paddingTop: 14 }}>
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, borderTop: '1px solid #171717', paddingTop: 14 }}>
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button onClick={placeOrder} className="pill-btn" style={{ justifyContent: 'center', padding: '13px 0', marginTop: 8 }}>
                  Place Order
                </button>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
