'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageSlot } from '@/components/ImageSlot';
import { Stitch, YarnBall } from '@/components/motifs';
import { shippingFor, useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const shipping = shippingFor(subtotal, items.length);
  const total = subtotal + shipping;

  return (
    <div style={{ color: '#171717', minHeight: '100vh', overflowX: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div
        className="page-pad"
        style={{ flex: 1, maxWidth: 900, width: '100%', margin: '0 auto', padding: '24px 40px 80px', position: 'relative' }}
      >
        <YarnBall
          size={52}
          style={{ position: 'absolute', right: 34, top: 14, animation: 'floaty 5s ease-in-out infinite', pointerEvents: 'none' }}
        />
        <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#ff6f1e' }}>
          a little bundle of handmade
        </span>
        <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 36, margin: '2px 0 10px', color: '#2b1a07' }}>
          your cart
        </h1>
        <Stitch width={80} style={{ margin: '0 0 30px' }} />

        {items.length === 0 ? (
          <div style={{ padding: '40px 0 60px', textAlign: 'center', color: '#2b1a07', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <YarnBall size={90} color="#fbe07a" strokeOpacity={0.2} fourStrands style={{ animation: 'floaty 6s ease-in-out infinite' }} />
            <p className="fredoka" style={{ fontWeight: 600, fontSize: 22, margin: 0, color: '#2b1a07' }}>
              your cart is empty
            </p>
            <span className="caveat" style={{ fontWeight: 700, fontSize: 20, color: '#ff6f1e' }}>
              let&apos;s find you something soft ✿
            </span>
            <Link href="/shop" className="dark-btn dark-btn--bordered" style={{ padding: '13px 28px' }}>
              Browse the Shop
            </Link>
          </div>
        ) : (
          <div className="cart-layout" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
              {items.map((item, i) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '2px dashed rgba(23,23,23,0.14)' }}
                >
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      flex: 'none',
                      border: '1.5px solid #171717',
                      borderRadius: '46% 54% 52% 48% / 54% 46% 54% 46%',
                      overflow: 'hidden',
                      boxShadow: 'rgba(0,0,0,0.06) 0px 6px 16px 0px'
                    }}
                  >
                    <ImageSlot label={item.name} artId={item.productId} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, color: '#2b1a07' }}>{item.name}</span>
                    <span style={{ fontSize: 13, color: '#2b1a07' }}>
                      {item.color} {item.size}
                    </span>
                    <button
                      onClick={() => removeItem(i)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#ff6f1e',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: 0,
                        textAlign: 'left',
                        width: 'fit-content'
                      }}
                    >
                      remove
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #171717', borderRadius: 20 }}>
                    <button
                      onClick={() => updateQty(i, item.qty - 1)}
                      aria-label="Decrease quantity"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px 14px', fontSize: 15, fontWeight: 700 }}
                    >
                      −
                    </button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(i, item.qty + 1)}
                      aria-label="Increase quantity"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px 14px', fontSize: 15, fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 15, minWidth: 60, textAlign: 'right' }}>${item.qty * item.price}</span>
                </div>
              ))}
            </div>

            <aside
              style={{
                position: 'relative',
                width: 300,
                flex: 'none',
                background: '#f7efe9',
                borderRadius: 16,
                padding: '26px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                border: '1.5px solid #171717',
                outline: '1.5px dashed rgba(23,23,23,0.22)',
                outlineOffset: -7,
                boxShadow: 'rgba(0,0,0,0.05) 0px 14px 34px 0px'
              }}
            >
              <YarnBall
                size={46}
                color="#62c6a0"
                style={{ position: 'absolute', right: -14, top: -16, animation: 'floaty 5.5s ease-in-out infinite' }}
              />
              <div>
                <span className="caveat" style={{ fontWeight: 700, fontSize: 19, color: '#ff6f1e' }}>
                  wrapped up nicely
                </span>
                <h3 className="fredoka" style={{ fontWeight: 600, fontSize: 20, margin: 0, color: '#2b1a07' }}>
                  order summary
                </h3>
              </div>
              <Stitch width={60} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontWeight: 700,
                  borderTop: '2px dashed rgba(23,23,23,0.24)',
                  paddingTop: 14
                }}
              >
                <span>Total</span>
                <span>${total}</span>
              </div>
              {subtotal > 0 && subtotal < 50 && (
                <span className="caveat" style={{ fontWeight: 700, fontSize: 17, color: '#1f9e73' }}>
                  ✿ free shipping over $50
                </span>
              )}
              <Link href="/checkout" className="dark-btn dark-btn--bordered" style={{ textAlign: 'center', padding: '14px 0', marginTop: 8 }}>
                Proceed to Checkout
              </Link>
              <Link href="/shop" className="caveat" style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, color: '#ff6f1e' }}>
                Continue Shopping →
              </Link>
            </aside>
          </div>
        )}
      </div>

      <Footer
        links={[
          { href: '/shop', label: 'Shop All' },
          { href: '/custom-order', label: 'Custom Orders' }
        ]}
      />
    </div>
  );
}
