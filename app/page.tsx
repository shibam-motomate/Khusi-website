'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageSlot } from '@/components/ImageSlot';
import {
  CrossHatch,
  FlowerDivider,
  GrannySquare,
  HandmadeBadge,
  HeartDivider,
  Scallop,
  Stitch,
  YarnBall
} from '@/components/motifs';
import { products } from '@/lib/products';
import { doodle, note, postit, reveal, revealX, stagger, useReveal } from '@/lib/reveal';

const REVEAL_NAMES = ['hero', 'stmt', 'rose', 'teddy', 'bag', 'nolist'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

const heroNoteBase: CSSProperties = {
  position: 'absolute',
  width: 150,
  background: '#fbe07a',
  border: '1.5px solid #171717',
  borderRadius: 4,
  padding: '12px 14px',
  boxShadow: 'rgba(0,0,0,0.06) 0px 2px 20px 0px',
  fontWeight: 700,
  fontSize: 19,
  color: '#171717',
  lineHeight: 1.25
};

const postitBase: CSSProperties = {
  width: 190,
  height: 180,
  background: '#fbe07a',
  border: '1.5px solid #171717',
  boxShadow: 'rgba(0,0,0,0.12) 0px 8px 22px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 16,
  fontWeight: 700,
  fontSize: 26,
  color: '#171717',
  lineHeight: 1.15
};

interface PanelTheme {
  tint: string;
  accent: string;
  ink: string;
}

function StoryPanel({
  theme,
  on,
  refCb,
  imageSide,
  kicker,
  title,
  items,
  productId,
  media
}: {
  theme: PanelTheme;
  on: boolean;
  refCb: (el: HTMLElement | null) => void;
  imageSide: 'left' | 'right';
  kicker: string;
  title: React.ReactNode;
  items: string[];
  productId: string;
  media: React.ReactNode;
}) {
  const card = (
    <div
      className="panel-card"
      style={{
        display: 'flex',
        justifyContent: imageSide === 'right' ? 'flex-start' : 'flex-end',
        order: imageSide === 'left' ? 2 : undefined,
        ...revealX(on, imageSide === 'right' ? -40 : 40)
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fdfbf9',
          border: '1.5px solid #171717',
          borderRadius: 20,
          padding: '32px 34px',
          width: 'min(430px,100%)',
          boxShadow: 'rgba(0,0,0,0.05) 0px 14px 34px 0px'
        }}
      >
        <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: theme.ink }}>
          {kicker}
        </span>
        <h3
          className="fredoka"
          style={{ fontWeight: 600, fontSize: 34, lineHeight: 1.05, margin: '2px 0 10px', color: '#2b1a07' }}
        >
          {title}
        </h3>
        <Stitch color={theme.accent} style={{ margin: '0 0 14px' }} />
        {items.map((label, i) => (
          <div
            key={label}
            className="panel-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '15px 2px',
              borderTop: '1px solid rgba(23,23,23,0.12)',
              ...stagger(on, i, 14)
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 600, color: '#2b1a07' }}>{label}</span>
            <span className="caveat" style={{ fontWeight: 700, fontSize: 20, color: theme.ink }}>
              {ROMAN[i]}
            </span>
          </div>
        ))}
        <Link href={`/product/${productId}`} className="dark-btn" style={{ marginTop: 20, padding: '10px 24px' }}>
          View &amp; Order →
        </Link>
      </div>
    </div>
  );

  const mediaCol = (
    <div
      className="panel-media"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        order: imageSide === 'left' ? 1 : undefined,
        ...revealX(on, imageSide === 'right' ? 40 : -40)
      }}
    >
      {media}
    </div>
  );

  return (
    <div ref={refCb} style={{ position: 'relative' }}>
      <Scallop color={theme.tint} />
      <div style={{ background: theme.tint }}>
        <div
          className="panel-grid"
          style={{
            minHeight: '82vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 24,
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 56px 64px'
          }}
        >
          {imageSide === 'left' ? (
            <>
              {mediaCol}
              {card}
            </>
          ) : (
            <>
              {card}
              {mediaCol}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { seen, refFor } = useReveal(REVEAL_NAMES, 2400);
  const [loaded, setLoaded] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Decorative yarn-ball cursor with easing tail — pointer-fine devices only.
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tx = -100, ty = -100, bx = -100, by = -100, ttx = -100, tty = -100;
    let active = false;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (tailRef.current) tailRef.current.style.opacity = '0.75';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    const loop = () => {
      bx += (tx - bx) * 0.22;
      by += (ty - by) * 0.22;
      ttx += (bx - ttx) * 0.16;
      tty += (by - tty) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${bx - 7}px,${by - 7}px)`;
      if (tailRef.current) {
        const dx = bx - ttx, dy = by - tty;
        const len = Math.hypot(dx, dy);
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        tailRef.current.style.width = `${Math.min(len, 46)}px`;
        tailRef.current.style.transform = `translate(${ttx}px,${tty}px) rotate(${ang}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const storyIds = ['rose-single', 'teddy-bear', 'shoulder-bag'];
  const blobs = [
    '46% 54% 60% 40% / 55% 48% 52% 45%',
    '18px',
    '58% 42% 45% 55% / 48% 55% 45% 52%',
    '18px',
    '52% 48% 40% 60% / 58% 42% 58% 42%'
  ];
  const restProducts = products.filter(p => !storyIds.includes(p.id));
  const noLabels = ['no factory', 'no machines', 'no rush', 'no bulk lots', 'no plastic filler', 'no two the same'];

  return (
    <div style={{ color: '#171717', overflowX: 'hidden', position: 'relative' }}>
      {/* ===== yarn loader ===== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#fdfbf9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
          opacity: loaded ? 0 : 1,
          visibility: loaded ? 'hidden' : 'visible',
          transition: loaded ? 'opacity .55s ease, visibility 0s .55s' : 'opacity .55s ease'
        }}
      >
        <svg width="80" height="80" viewBox="0 0 60 60" style={{ animation: 'yarnSpin 1.5s linear infinite' }} aria-hidden>
          <circle cx="30" cy="30" r="24" fill="#ff8fbf" />
          <g stroke="rgba(0,0,0,0.16)" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M11 24 C24 17 40 20 50 33" />
            <path d="M9 33 C22 27 43 30 53 41" />
            <ellipse cx="30" cy="30" rx="24" ry="10" />
            <ellipse cx="30" cy="30" rx="10" ry="24" />
          </g>
          <path
            d="M52 34 C60 40 58 52 48 54"
            stroke="#ff8fbf"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="240"
            style={{ animation: 'threadDraw 1.5s ease-in-out infinite' }}
          />
        </svg>
        <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#ff6f1e' }}>
          looping things up…
        </span>
      </div>

      {/* ===== cursor yarn tail ===== */}
      <div
        ref={tailRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: 2.5,
          width: 0,
          background: 'linear-gradient(90deg,transparent,#ff8fbf)',
          borderRadius: 3,
          transformOrigin: '0 50%',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transform: 'translate(-100px,-100px)',
          willChange: 'transform'
        }}
      >
        <svg width="15" height="15" viewBox="0 0 60 60" aria-hidden>
          <circle cx="30" cy="30" r="26" fill="#ff8fbf" />
          <g stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none">
            <ellipse cx="30" cy="30" rx="26" ry="11" />
            <ellipse cx="30" cy="30" rx="11" ry="26" />
          </g>
        </svg>
      </div>

      <Header />

      {/* ===== hero ===== */}
      <section
        ref={refFor('hero')}
        className="hero"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 24,
          alignItems: 'center',
          minHeight: '84vh',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 40px 40px'
        }}
      >
        <GrannySquare style={{ position: 'absolute', left: 18, bottom: 30, animation: 'floaty 5s ease-in-out infinite' }} />
        <div style={{ minWidth: 0, ...reveal(seen.hero, 24) }}>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 28, color: '#ff6f1e', display: 'block', marginBottom: 6 }}>
            Dear grownups,
          </span>
          <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 76, lineHeight: 1.02, margin: 0, color: '#2b1a07' }}>
            meet
            <br />
            happy loops
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: '#2b1a07', maxWidth: 440, margin: '24px 0 0' }}>
            Every piece here is crochet that{' '}
            <span className="caveat" style={{ fontWeight: 700, color: '#ff6f1e' }}>
              actually!
            </span>{' '}
            gets made by hand — no factory, no team, just yarn and a hook.
          </p>
          <a href="#story" className="pill-btn" style={{ marginTop: 28, padding: '11px 28px', fontSize: 16 }}>
            Shop the Collection
          </a>
          <span style={{ display: 'block', fontSize: 14, color: '#2b1a07', marginTop: 10 }}>
            Every order is made fresh — ships in 3–5 days.
          </span>
          <Link
            href="/custom-order"
            className="caveat"
            style={{ display: 'block', fontWeight: 700, fontSize: 18, color: '#ff6f1e', marginTop: 6 }}
          >
            psst, want something custom? →
          </Link>
        </div>
        <div style={{ position: 'relative', minWidth: 0 }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '4/5',
              border: '1.5px solid #171717',
              borderRadius: 16,
              overflow: 'hidden',
              transform: 'rotate(-2.5deg)'
            }}
          >
            <ImageSlot label="A favorite finished piece" />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '14%',
              right: '-6%',
              background: '#fdfbf9',
              border: '1.5px solid #171717',
              borderRadius: 8,
              padding: '10px 16px',
              boxShadow: 'rgba(0,0,0,0.15) 0px 4px 10px 0px',
              transform: 'rotate(4deg)'
            }}
          >
            <span style={{ fontSize: 11, color: '#171717', display: 'block' }}>Made by</span>
            <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: '#2b1a07' }}>
              the maker
            </span>
          </div>
          <HandmadeBadge
            label="100% crochet ✿"
            bg="#d5f0e4"
            ink="#1f7a58"
            rotate={-5}
            style={{ position: 'absolute', bottom: '6%', left: '-4%' }}
          />
          <div className="hero-note caveat" style={{ ...heroNoteBase, top: '4%', left: '2%', ...note(seen.hero, 0, -6) }}>
            made to order
          </div>
          <div className="hero-note caveat" style={{ ...heroNoteBase, top: '40%', right: '4%', ...note(seen.hero, 1, 8) }}>
            custom colors, always
          </div>
          <div className="hero-note caveat" style={{ ...heroNoteBase, bottom: '16%', left: '6%', ...note(seen.hero, 2, 5) }}>
            no two are ever the same
          </div>
          <div className="hero-note caveat" style={{ ...heroNoteBase, bottom: '2%', right: '8%', ...note(seen.hero, 3, -8) }}>
            wrapped with care
          </div>
        </div>
      </section>

      <FlowerDivider />

      {/* ===== statement ===== */}
      <div id="story" ref={refFor('stmt')}>
        <div
          className="stmt"
          style={{
            position: 'relative',
            minHeight: '78vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.5,
              backgroundImage:
                'repeating-linear-gradient(45deg,rgba(43,26,7,0.03) 0 2px,transparent 2px 7px),repeating-linear-gradient(-45deg,rgba(43,26,7,0.025) 0 2px,transparent 2px 7px)'
            }}
          />
          <YarnBall
            size={70}
            color="#a8d8f0"
            strokeOpacity={0.15}
            style={{ position: 'absolute', left: '7%', top: '16%', animation: 'floaty 6s ease-in-out infinite' }}
          />
          <svg
            width="240"
            height="180"
            viewBox="0 0 240 180"
            fill="none"
            style={{ position: 'absolute', left: '5%', top: '24%', pointerEvents: 'none' }}
            aria-hidden
          >
            <path
              d="M28,16 C90,60 40,110 120,120 C200,130 150,60 232,150"
              stroke="#a8d8f0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0.1 9"
            />
          </svg>
          <h2
            className="fredoka"
            style={{
              position: 'relative',
              fontWeight: 600,
              fontSize: 'clamp(38px,6vw,74px)',
              lineHeight: 1.06,
              margin: 0,
              color: '#2b1a07',
              ...reveal(seen.stmt, 30)
            }}
          >
            everyyything by hand.
            <br />
            nothing by machine.
          </h2>
          <Stitch color="#ff8fbf" width={120} height={5} style={{ marginTop: 22 }} />
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'center', marginTop: 52 }}>
            <div className="caveat" style={{ ...postitBase, ['--r' as string]: '-6deg', ...postit(seen.stmt, 0, -6) }}>
              made to order ✿
            </div>
            <div className="caveat" style={{ ...postitBase, ['--r' as string]: '5deg', ...postit(seen.stmt, 1, 5) }}>
              one of a kind
            </div>
            <div className="caveat" style={{ ...postitBase, ['--r' as string]: '-4deg', ...postit(seen.stmt, 2, -4) }}>
              real yarn, real hands
            </div>
            <div className="caveat" style={{ ...postitBase, ['--r' as string]: '7deg', ...postit(seen.stmt, 3, 7) }}>
              wrapped with care ♥
            </div>
          </div>
        </div>
      </div>

      {/* ===== story panels ===== */}
      <StoryPanel
        theme={{ tint: '#f9edea', accent: '#ff8fbf', ink: '#e0699e' }}
        on={!!seen.rose}
        refCb={refFor('rose')}
        imageSide="right"
        kicker="it's a little like"
        title={
          <>
            a bloom that
            <br />
            never wilts
          </>
        }
        items={['Shaped bloom by bloom', 'Wire stem — bends & poses', 'Never wilts, never drops', 'A single stem or a bouquet', 'Your palette, your way']}
        productId="rose-single"
        media={
          <>
            <div
              style={{
                width: '82%',
                aspectRatio: '1/1',
                border: '2px solid #171717',
                borderRadius: '47% 53% 42% 58% / 55% 45% 60% 40%',
                overflow: 'hidden',
                boxShadow: 'rgba(0,0,0,0.08) 0px 16px 40px 0px'
              }}
            >
              <ImageSlot label="Crochet rose — big, close" />
            </div>
            <HandmadeBadge label="made to order" bg="#ffd9e7" ink="#c14d84" rotate={6} style={{ position: 'absolute', top: '2%', right: '6%', boxShadow: 'none' }} />
            <div className="caveat" style={{ position: 'absolute', bottom: 0, left: '2%', fontWeight: 700, fontSize: 22, color: '#171717', transform: 'rotate(-4deg)' }}>
              never drops a petal ↑
            </div>
          </>
        }
      />

      <StoryPanel
        theme={{ tint: '#eef3e9', accent: '#4ec59d', ink: '#1f9e73' }}
        on={!!seen.teddy}
        refCb={refFor('teddy')}
        imageSide="left"
        kicker="my most-requested hug"
        title={
          <>
            the cuddle
            <br />
            teddy bear
          </>
        }
        items={['Stitched dense, holds its shape', 'Soft enough to sleep with', 'Your colors, your way', 'Small, medium or large', 'Made fresh when you order']}
        productId="teddy-bear"
        media={
          <>
            <div style={{ width: '82%', aspectRatio: '4/5', border: '1.5px solid #171717', borderRadius: 20, overflow: 'hidden' }}>
              <ImageSlot label="Cuddle teddy bear — big, close" ballColor="#62c6a0" />
            </div>
            <HandmadeBadge label="made with love ♥" bg="#d5f0e4" ink="#1f7a58" rotate={-6} style={{ position: 'absolute', top: '3%', left: '4%', boxShadow: 'none' }} />
            <div className="caveat" style={{ position: 'absolute', bottom: '4%', right: '2%', fontWeight: 700, fontSize: 22, color: '#171717', transform: 'rotate(-5deg)' }}>
              so squishy ♥
            </div>
          </>
        }
      />

      <StoryPanel
        theme={{ tint: '#e8f1f8', accent: '#62b6e6', ink: '#2b86c4' }}
        on={!!seen.bag}
        refCb={refFor('bag')}
        imageSide="right"
        kicker="the one everyone asks about"
        title={
          <>
            granny-square
            <br />
            shoulder bag
          </>
        }
        items={['Real granny squares, by hand', 'Lined so nothing slips through', 'A strap made to last', 'Your colour combination', 'No two are ever alike']}
        productId="shoulder-bag"
        media={
          <>
            <div style={{ width: '82%', aspectRatio: '4/5', border: '1.5px solid #171717', borderRadius: 20, overflow: 'hidden' }}>
              <ImageSlot label="Granny-square bag — big, close" ballColor="#62b6e6" />
            </div>
            <HandmadeBadge label="handmade" bg="#d3ecfb" ink="#2b86c4" rotate={5} style={{ position: 'absolute', top: '3%', right: '4%', boxShadow: 'none' }} />
            <div className="caveat" style={{ position: 'absolute', top: '10%', left: '2%', fontWeight: 700, fontSize: 22, color: '#171717', transform: 'rotate(-7deg)' }}>
              carries everything ↓
            </div>
          </>
        }
      />

      {/* ===== no-list (lavender) ===== */}
      <div ref={refFor('nolist')} style={{ position: 'relative' }}>
        <Scallop color="#f2eef8" />
        <div style={{ background: '#f2eef8' }}>
          <div
            style={{
              position: 'relative',
              minHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '56px 40px 70px',
              overflow: 'hidden'
            }}
          >
            <CrossHatch opacity={0.45} tint="124,92,196" />
            <div className="caveat" style={{ position: 'absolute', top: '16%', left: '11%', fontWeight: 700, fontSize: 26, color: '#2b1a07', transform: 'rotate(-6deg)', ...doodle(seen.nolist, 0.5) }}>
              made slow ✎
            </div>
            <div className="caveat" style={{ position: 'absolute', top: '15%', right: '12%', fontWeight: 700, fontSize: 26, color: '#2b1a07', transform: 'rotate(5deg)', ...doodle(seen.nolist, 0.65) }}>
              made small ✿
            </div>
            <div className="caveat" style={{ position: 'absolute', bottom: '15%', right: '15%', fontWeight: 700, fontSize: 26, color: '#7c5cc4', transform: 'rotate(4deg)', ...doodle(seen.nolist, 0.8) }}>
              made with love ♥
            </div>
            <svg width="46" height="46" viewBox="0 0 30 30" style={{ position: 'absolute', bottom: '20%', left: '14%', ...doodle(seen.nolist, 0.8) }} aria-hidden>
              <g fill="#b39ddb">
                <circle cx="15" cy="6" r="5" />
                <circle cx="15" cy="24" r="5" />
                <circle cx="6" cy="15" r="5" />
                <circle cx="24" cy="15" r="5" />
              </g>
              <circle cx="15" cy="15" r="4" fill="#7c5cc4" />
            </svg>
            <div
              style={{
                position: 'relative',
                width: 'min(420px,86vw)',
                background: '#fdfbf9',
                border: '1.5px solid #171717',
                borderRadius: 6,
                padding: '40px 44px 44px',
                boxShadow: 'rgba(0,0,0,0.1) 0px 16px 40px 0px',
                backgroundImage: 'repeating-linear-gradient(#fdfbf9 0 35px,#dccef0 35px 36px)',
                ...reveal(seen.nolist, 30)
              }}
            >
              <div style={{ position: 'absolute', left: 52, top: 0, bottom: 0, width: 1.5, background: '#c9a0d6' }} />
              <span className="fredoka" style={{ fontWeight: 600, fontSize: 26, color: '#2b1a07', display: 'block', marginBottom: 14 }}>
                what you&apos;ll never find here
              </span>
              {noLabels.map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, height: 36, ...stagger(seen.nolist, i, 8) }}>
                  <span style={{ color: '#e0503a', fontWeight: 800, fontSize: 20 }}>✕</span>
                  <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#2b1a07' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HeartDivider />

      {/* ===== little extras ===== */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 40px 80px', textAlign: 'center' }}>
        <span className="caveat" style={{ fontWeight: 700, fontSize: 26, color: '#ff6f1e', display: 'block' }}>
          sooo much care
        </span>
        <h2 className="fredoka" style={{ fontWeight: 600, fontSize: 40, margin: '6px 0 52px', color: '#2b1a07' }}>
          and there&apos;s little extras
        </h2>
        <div className="extras-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 36 }}>
          {[
            { emoji: '🎁', bg: '#ff8fbf', rot: -8, label: <>free gift wrap</> },
            { emoji: '✉', bg: '#62b6e6', rot: 7, label: <>a care card in<br />every parcel</> },
            { emoji: '✿', bg: '#62c6a0', rot: -5, label: <>custom colors,<br />always</> },
            { emoji: '🚚', bg: '#f3c34a', rot: 6, label: <>ships in<br />3–5 days</> }
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <span
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: x.bg,
                  border: '2px solid #171717',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  transform: `rotate(${x.rot}deg)`
                }}
              >
                {x.emoji}
              </span>
              <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: '#2b1a07' }}>
                {x.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== rest of the shelf ===== */}
      <section id="shop" style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '0 40px 100px' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" style={{ position: 'absolute', right: 44, top: -6, opacity: 0.9 }} aria-hidden>
          <path
            d="M12 21s-7-4.4-9.4-8.8C1.1 8.9 3 5.4 6.4 5.4 9 5.4 12 8.4 12 8.4s3-3 5.6-3c3.4 0 5.3 3.5 3.8 6.8C19 16.6 12 21 12 21z"
            fill="#ff8fbf"
          />
        </svg>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 24, color: '#ff6f1e' }}>
            and a few more little things
          </span>
          <h2 className="fredoka" style={{ fontWeight: 600, fontSize: 36, margin: '6px 0 0', color: '#2b1a07' }}>
            the rest of the shelf
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 36 }}>
          {restProducts.map((rp, i) => (
            <Link key={rp.id} href={`/product/${rp.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  border: '1.5px solid #171717',
                  overflow: 'hidden',
                  borderRadius: blobs[i % blobs.length]
                }}
              >
                <ImageSlot label={rp.name} />
              </div>
              <span className="caveat" style={{ fontWeight: 700, fontSize: 18, color: '#ff6f1e' }}>
                {rp.caption}
              </span>
              <h4 className="fredoka" style={{ fontWeight: 600, fontSize: 20, margin: 0, color: '#2b1a07' }}>
                {rp.name}
              </h4>
              <span style={{ fontSize: 16, fontWeight: 600 }}>${rp.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== custom callout ===== */}
      <section
        className="callout"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'stretch',
          maxWidth: 1000,
          margin: '0 auto 90px',
          background: '#f7efe9',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1.5px solid #171717'
        }}
      >
        <div style={{ minHeight: 340 }}>
          <ImageSlot label="Custom doll / bouquet examples" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, padding: 48 }}>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 22, color: '#ff6f1e' }}>
            something more personal?
          </span>
          <h2 className="fredoka" style={{ fontWeight: 600, fontSize: 30, margin: 0, color: '#2b1a07' }}>
            our loops.
            <br />
            your way.
          </h2>
          <Stitch color="#ff6f1e" width={70} />
          <p style={{ fontSize: 16, lineHeight: 1.5, color: '#2b1a07', margin: 0 }}>
            A doll of your pet, a bouquet in your favorite colors, a character you&apos;ve been imagining — just tell me
            about it.
          </p>
          <Link href="/custom-order" className="dark-btn" style={{ alignSelf: 'flex-start', marginTop: 6 }}>
            Start a Custom Order
          </Link>
        </div>
      </section>

      <Footer
        links={[
          { href: '/cart', label: 'Your Cart' },
          { href: '/custom-order', label: 'Custom Orders' }
        ]}
      />
    </div>
  );
}
