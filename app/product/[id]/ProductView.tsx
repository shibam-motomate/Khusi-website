'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageSlot } from '@/components/ImageSlot';
import { ProductCard } from '@/components/ProductCard';
import { FlowerDivider, GrannySquare, HandmadeBadge, Scallop, Stitch, YarnBall } from '@/components/motifs';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { revealUp, revealX, useReveal } from '@/lib/reveal';

const GALLERY_FRAMES = ['46% 54% 60% 40% / 55% 48% 52% 45%', '18px', '58% 42% 45% 55% / 48% 55% 45% 52%'];

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart } = useCart();
  const { seen, refFor } = useReveal(['img', 'detail', 'related'], 1600);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      qty,
      image: `${product.id}-1`
    });
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ color: '#171717', overflowX: 'hidden', position: 'relative', minHeight: '100vh' }}>
      <Header showCustom />

      <div
        className="caveat page-pad"
        style={{ maxWidth: 1000, margin: '0 auto', padding: '10px 40px 0', fontSize: 14, fontWeight: 700, color: '#2b1a07' }}
      >
        <Link href="/" style={{ color: '#2b1a07' }}>
          home
        </Link>{' '}
        <span style={{ color: '#ff8fbf' }}>✿</span>{' '}
        <Link href="/shop" style={{ color: '#2b1a07' }}>
          shop all
        </Link>{' '}
        <span style={{ color: '#ff8fbf' }}>✿</span> <span style={{ color: '#ff6f1e' }}>{product.name}</span>
      </div>

      {/* ===== product hero ===== */}
      <section
        className="two-col page-pad"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          maxWidth: 1000,
          margin: '0 auto',
          padding: '16px 40px 72px'
        }}
      >
        <GrannySquare
          size={42}
          style={{ position: 'absolute', right: 30, top: 6, animation: 'floaty 6s ease-in-out infinite', pointerEvents: 'none' }}
        />

        {/* image column */}
        <div
          ref={refFor('img')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, ...revealX(!!seen.img, -40) }}
        >
          <div style={{ position: 'relative', width: '94%' }}>
            <YarnBall
              size={58}
              style={{ position: 'absolute', left: -18, top: -10, zIndex: 2, animation: 'floaty 5s ease-in-out infinite', pointerEvents: 'none' }}
            />
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                border: '2px solid #171717',
                borderRadius: '44% 56% 52% 48% / 54% 46% 54% 46%',
                overflow: 'hidden',
                boxShadow: 'rgba(0,0,0,0.08) 0px 16px 40px 0px'
              }}
            >
              <ImageSlot label={product.name} artId={product.id} />
            </div>
            <HandmadeBadge label="handmade ♥" bg="#ffd9e7" ink="#c14d84" rotate={6} style={{ position: 'absolute', top: 0, right: '2%' }} />
            <div
              className="caveat"
              style={{ position: 'absolute', bottom: -6, left: '4%', fontWeight: 700, fontSize: 22, color: '#171717', transform: 'rotate(-4deg)' }}
            >
              one of a kind ✿
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, width: '94%', justifyContent: 'center' }}>
            {GALLERY_FRAMES.map((frame, i) => (
              <div
                key={i}
                style={{
                  width: 78,
                  height: 78,
                  flex: 'none',
                  border: '1.5px solid #171717',
                  borderRadius: frame,
                  overflow: 'hidden',
                  boxShadow: 'rgba(0,0,0,0.06) 0px 6px 14px 0px'
                }}
              >
                <ImageSlot label="+ photo" />
              </div>
            ))}
          </div>
        </div>

        {/* details */}
        <div ref={refFor('detail')} style={{ display: 'flex', flexDirection: 'column', gap: 14, ...revealX(!!seen.detail, 40) }}>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 23, color: '#ff6f1e' }}>
            {product.caption}
          </span>
          <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 38, lineHeight: 1.04, margin: 0, color: '#2b1a07' }}>
            {product.name}
          </h1>
          <Stitch width={80} />
          <span style={{ fontSize: 24, fontWeight: 600, color: '#2b1a07' }}>₹{product.price}</span>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#2b1a07', margin: 0 }}>{product.description}</p>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 10px', color: '#171717' }}>
              Color
            </h3>
            <div style={{ display: 'flex', gap: 10 }}>
              {product.colors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  aria-pressed={c.name === selectedColor}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: c.hex,
                    boxShadow: c.name === selectedColor ? '0 0 0 3px #171717' : '0 0 0 1px #f7efe9'
                  }}
                />
              ))}
            </div>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 10px', color: '#171717' }}>
                Size
              </h3>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={s === selectedSize}
                    style={{
                      cursor: 'pointer',
                      padding: '9px 18px',
                      borderRadius: 20,
                      border: '1.5px solid #171717',
                      fontSize: 14,
                      fontWeight: 500,
                      background: s === selectedSize ? '#f7efe9' : 'transparent',
                      color: '#171717'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #171717', borderRadius: 20 }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '11px 16px', fontSize: 16, fontWeight: 700 }}
              >
                −
              </button>
              <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                aria-label="Increase quantity"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '11px 16px', fontSize: 16, fontWeight: 700 }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="dark-btn dark-btn--bordered"
              style={{
                flex: 1,
                padding: '14px 0',
                background: added ? '#1f9e73' : '#2b1a07',
                transition: 'background .3s ease'
              }}
            >
              {added ? 'Added to your cart ✓' : `Add to Cart — ₹${product.price}`}
            </button>
          </div>
          {added && (
            <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: '#1f9e73' }}>
              popped it in your cart ✿
            </span>
          )}

          <Link
            href={`/custom-order?ref=${product.id}`}
            className="caveat"
            style={{ fontWeight: 700, fontSize: 19, color: '#ff6f1e', marginTop: 2, width: 'fit-content' }}
          >
            psst — want a custom color or size? →
          </Link>

          <div style={{ marginTop: 12, paddingTop: 18, borderTop: '2px dashed rgba(23,23,23,0.18)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', margin: 0, color: '#171717' }}>
              Materials &amp; Care
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2b1a07', margin: 0 }}>{product.care}</p>
          </div>
        </div>
      </section>

      <FlowerDivider />

      {/* ===== you may also like ===== */}
      {related.length > 0 && (
        <div style={{ position: 'relative' }}>
          <Scallop color="#f9edea" />
          <div style={{ background: '#f9edea' }}>
            <section
              ref={refFor('related')}
              className="page-pad"
              style={{ maxWidth: 1000, margin: '0 auto', padding: '44px 40px 72px', ...revealUp(!!seen.related) }}
            >
              <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#e0699e' }}>
                more little loops
              </span>
              <h2 className="fredoka" style={{ fontWeight: 600, fontSize: 32, margin: '4px 0 12px', color: '#2b1a07' }}>
                you may also like
              </h2>
              <Stitch style={{ margin: '0 0 30px' }} />
              <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <Footer
        links={[
          { href: '/cart', label: 'Your Cart' },
          { href: '/custom-order', label: 'Custom Orders' }
        ]}
      />
    </div>
  );
}
