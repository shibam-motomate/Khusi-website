import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageSlot } from '@/components/ImageSlot';
import { GrannySquare, HandmadeBadge, Stitch, YarnBall } from '@/components/motifs';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'the whole collection — happy loops',
  description: 'Every handmade crochet piece in the shop — flowers, amigurumi, bags, keychains and gifts.'
};

const BLOBS = [
  '46% 54% 60% 40% / 55% 48% 52% 45%',
  '18px',
  '58% 42% 45% 55% / 48% 55% 45% 52%',
  '20px',
  '52% 48% 40% 60% / 58% 42% 58% 42%',
  '18px',
  '44% 56% 52% 48% / 54% 46% 54% 46%',
  '20px'
];

const THEMES = [
  { accent: '#ff8fbf', bg: '#ffd9e7', ink: '#c14d84', badge: 'handmade ♥', ball: '#ff8fbf' },
  { accent: '#4ec59d', bg: '#d5f0e4', ink: '#1f7a58', badge: 'made to order', ball: '#62c6a0' },
  { accent: '#62b6e6', bg: '#d3ecfb', ink: '#2b86c4', badge: 'one of a kind', ball: '#62b6e6' },
  { accent: '#b39ddb', bg: '#efe7fa', ink: '#7c5cc4', badge: 'custom colors ✿', ball: '#b39ddb' }
];

const ROTS = [-6, 5, 4, -5];

export default function CatalogPage() {
  return (
    <div style={{ color: '#171717', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <Header showCustom />

      <div
        className="page-pad"
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          padding: '24px 40px 0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6
        }}
      >
        <GrannySquare style={{ position: 'absolute', left: 36, top: 18, animation: 'floaty 6s ease-in-out infinite', pointerEvents: 'none' }} />
        <YarnBall
          size={52}
          style={{ position: 'absolute', right: 34, top: 10, animation: 'floaty 5s ease-in-out infinite', pointerEvents: 'none' }}
        />
        <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#ff6f1e' }}>
          just a few things, made slowly
        </span>
        <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 36, margin: 0, color: '#2b1a07' }}>
          the whole collection
        </h1>
        <Stitch width={90} style={{ marginTop: 6 }} />
      </div>

      <div
        className="page-pad"
        style={{ maxWidth: 900, margin: '0 auto', padding: '56px 40px 100px', display: 'flex', flexDirection: 'column', gap: 72 }}
      >
        {products.map((p, i) => {
          const even = i % 2 === 0;
          const t = THEMES[i % THEMES.length];
          return (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="catalog-row"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', color: '#171717' }}
            >
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', order: even ? 1 : 2 }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    border: '2px solid #171717',
                    borderRadius: BLOBS[i % BLOBS.length],
                    overflow: 'hidden',
                    boxShadow: 'rgba(0,0,0,0.07) 0px 14px 34px 0px'
                  }}
                >
                  <ImageSlot label={p.name} artId={p.id} ballColor={t.ball} />
                </div>
                <HandmadeBadge
                  label={t.badge}
                  bg={t.bg}
                  ink={t.ink}
                  rotate={ROTS[i % ROTS.length]}
                  style={{ position: 'absolute', top: '-2%', ...(even ? { left: '-2%' } : { right: '-2%' }) }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, order: even ? 2 : 1 }}>
                <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: '#ff6f1e' }}>
                  {p.caption}
                </span>
                <h3 className="fredoka" style={{ fontWeight: 600, fontSize: 30, margin: 0, color: '#2b1a07' }}>
                  {p.name}
                </h3>
                <Stitch color={t.accent} width={70} />
                <span style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>₹{p.price}</span>
                <span className="pill-btn" style={{ marginTop: 10, alignSelf: 'flex-start', padding: '9px 22px', fontSize: 14 }}>
                  View &amp; Order →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Footer
        links={[
          { href: '/cart', label: 'Your Cart' },
          { href: '/custom-order', label: 'Custom Orders' }
        ]}
      />
    </div>
  );
}
