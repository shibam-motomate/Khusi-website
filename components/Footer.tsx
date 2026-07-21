import Link from 'next/link';
import { CrossHatch, FooterThread, Stitch, YarnBall } from './motifs';

export interface FooterLink {
  href: string;
  label: string;
}

const DEFAULT_LINKS: FooterLink[] = [
  { href: '/cart', label: 'Your Cart' },
  { href: '/custom-order', label: 'Custom Orders' }
];

export function Footer({ links = DEFAULT_LINKS }: { links?: FooterLink[] }) {
  return (
    <>
      <FooterThread />
      <div
        style={{
          height: 22,
          background:
            'radial-gradient(circle 12px at 12px 22px,#ff6f1e 95%,transparent) 0 0/24px 22px repeat-x',
          marginTop: -1
        }}
      />
      <footer
        style={{
          position: 'relative',
          background: '#ff6f1e',
          padding: '46px 40px 36px',
          color: '#2b1a07',
          overflow: 'hidden'
        }}
      >
        <CrossHatch />
        <YarnBall
          size={66}
          color="#fbe07a"
          strokeOpacity={0.2}
          fourStrands
          style={{
            position: 'absolute',
            left: 'calc(50% - 150px)',
            top: -30,
            animation: 'floaty 5s ease-in-out infinite'
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 13,
            textAlign: 'center'
          }}
        >
          <span className="caveat" style={{ fontWeight: 700, fontSize: 23, color: '#fff4e6' }}>
            made with love, always ♥
          </span>
          <span className="fredoka" style={{ fontWeight: 600, fontSize: 28, color: '#2b1a07' }}>
            thanks for stopping by
          </span>
          <Stitch color="#2b1a07" width={80} />
          <p style={{ fontSize: 15, lineHeight: 1.55, margin: '2px 0 8px', maxWidth: 420, color: '#2b1a07' }}>
            every piece here is made by hand, in small batches — questions, custom ideas, just say hi.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="pill-btn"
                style={{ padding: '9px 20px', fontSize: 14, boxShadow: 'rgba(0,0,0,0.2) 0px 1px 2px 0px' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 20, color: '#2b1a07', marginTop: 10 }}>
            @happylooops
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            maxWidth: 900,
            margin: '30px auto 0',
            paddingTop: 16,
            borderTop: '2px dashed rgba(43,26,7,0.3)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: '#2b1a07' }}>
            © {new Date().getFullYear()} happy loops · all rights reserved
          </span>
          <span style={{ color: '#2b1a07', opacity: 0.55 }}>✿</span>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 18, color: '#fff4e6' }}>
            made by shibam ♥
          </span>
        </div>
      </footer>
    </>
  );
}
