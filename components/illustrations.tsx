import type { ReactNode } from 'react';

/* Flat demo illustrations for each product, drawn in the brand palette.
   These stand in for product photography — swap for real photos later. */

const OUTLINE = 'rgba(43,26,7,0.35)';

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {children}
    </svg>
  );
}

function RoseArt() {
  return (
    <Svg>
      <path d="M100 116 C98 142 103 162 100 184" stroke="#7da163" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 148 C88 138 76 138 66 148 C76 158 90 158 100 148 Z" fill="#9cb88a" />
      <path d="M100 166 C112 156 124 156 134 166 C124 176 110 176 100 166 Z" fill="#9cb88a" />
      {[0, 51, 102, 154, 205, 257, 308].map(a => {
        const r = (a * Math.PI) / 180;
        return <circle key={a} cx={100 + 27 * Math.cos(r)} cy={78 + 27 * Math.sin(r)} r="15" fill="#d96248" />;
      })}
      <circle cx="100" cy="78" r="30" fill="#e8735a" />
      <path
        d="M100 78 m-2 -2 a4 4 0 1 1 6 5 a9 9 0 1 1 -13 -9 a15 15 0 1 1 20 16 a21 21 0 1 1 -28 -22"
        stroke="#b34a33"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
    </Svg>
  );
}

function TeddyArt() {
  return (
    <Svg>
      <circle cx="72" cy="46" r="13" fill="#e0a940" />
      <circle cx="128" cy="46" r="13" fill="#e0a940" />
      <circle cx="72" cy="46" r="6" fill="#f7ecd9" />
      <circle cx="128" cy="46" r="6" fill="#f7ecd9" />
      <circle cx="100" cy="74" r="32" fill="#e0a940" />
      <path d="M74 66 a32 32 0 0 1 18 -21" stroke="#c98f2e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1 5" />
      <ellipse cx="100" cy="86" rx="15" ry="11" fill="#f7ecd9" />
      <path d="M95 82 h10 l-5 6 Z" fill="#2b1a07" />
      <path d="M100 88 v4 M96 95 q4 3 8 0" stroke="#2b1a07" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="70" r="3" fill="#2b1a07" />
      <circle cx="112" cy="70" r="3" fill="#2b1a07" />
      <ellipse cx="100" cy="140" rx="32" ry="30" fill="#e0a940" />
      <ellipse cx="100" cy="146" rx="17" ry="15" fill="#f7ecd9" />
      <path d="M70 138 a32 30 0 0 1 8 -20" stroke="#c98f2e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1 5" />
      <ellipse cx="64" cy="126" rx="10" ry="15" fill="#e0a940" transform="rotate(20 64 126)" />
      <ellipse cx="136" cy="126" rx="10" ry="15" fill="#e0a940" transform="rotate(-20 136 126)" />
      <circle cx="80" cy="168" r="11" fill="#e0a940" />
      <circle cx="120" cy="168" r="11" fill="#e0a940" />
      <circle cx="80" cy="170" r="5" fill="#f7ecd9" />
      <circle cx="120" cy="170" r="5" fill="#f7ecd9" />
    </Svg>
  );
}

function KeychainArt() {
  return (
    <Svg>
      <circle cx="100" cy="36" r="15" stroke="#9aa0a8" strokeWidth="5" fill="none" />
      <rect x="93" y="52" width="14" height="16" rx="4" fill="#9aa0a8" />
      <path d="M100 68 v14" stroke="#8a5a3b" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="86" cy="92" rx="9" ry="20" fill="#8ec5e8" transform="rotate(-12 86 92)" />
      <ellipse cx="114" cy="92" rx="9" ry="20" fill="#8ec5e8" transform="rotate(12 114 92)" />
      <ellipse cx="86" cy="94" rx="4" ry="12" fill="#f7ecd9" transform="rotate(-12 86 94)" />
      <ellipse cx="114" cy="94" rx="4" ry="12" fill="#f7ecd9" transform="rotate(12 114 94)" />
      <circle cx="100" cy="126" r="30" fill="#8ec5e8" />
      <path d="M74 118 a30 30 0 0 1 16 -19" stroke="#5f9dc4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1 5" />
      <circle cx="90" cy="122" r="3" fill="#2b1a07" />
      <circle cx="110" cy="122" r="3" fill="#2b1a07" />
      <ellipse cx="100" cy="134" rx="9" ry="7" fill="#f7ecd9" />
      <path d="M100 131 v4 M97 139 q3 2.5 6 0" stroke="#2b1a07" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="168" rx="20" ry="12" fill="#8ec5e8" />
      <ellipse cx="100" cy="170" rx="10" ry="6" fill="#f7ecd9" />
    </Svg>
  );
}

function grannySquare(x: number, y: number, size: number, fill: string, key?: string) {
  const c = x + size / 2;
  const m = y + size / 2;
  return (
    <g key={key}>
      <rect x={x} y={y} width={size} height={size} rx="6" fill={fill} />
      <rect
        x={c - size * 0.27}
        y={m - size * 0.27}
        width={size * 0.54}
        height={size * 0.54}
        rx="3"
        fill="none"
        stroke="#f7ecd9"
        strokeWidth="3"
        transform={`rotate(45 ${c} ${m})`}
      />
      <circle cx={c} cy={m} r={size * 0.1} fill="#f7ecd9" />
    </g>
  );
}

function BagArt() {
  return (
    <Svg>
      <path d="M66 74 C66 30 134 30 134 74" stroke="#8a5a3b" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="52" y="72" width="96" height="92" rx="12" fill="#f7ecd9" />
      {grannySquare(58, 78, 40, '#e8735a', 'a')}
      {grannySquare(102, 78, 40, '#f3d17a', 'b')}
      {grannySquare(58, 122, 40, '#8ec5e8', 'c')}
      {grannySquare(102, 122, 40, '#9cb88a', 'd')}
      <path d="M56 168 h88" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 6" />
    </Svg>
  );
}

function ScrunchieArt() {
  return (
    <Svg>
      <circle cx="76" cy="72" r="26" stroke="#f0b7ac" strokeWidth="17" fill="none" />
      <circle cx="76" cy="72" r="26" stroke="#d98a8a" strokeWidth="3" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="126" cy="100" r="26" stroke="#9cb88a" strokeWidth="17" fill="none" />
      <circle cx="126" cy="100" r="26" stroke="#7da163" strokeWidth="3" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="82" cy="138" r="26" stroke="#f3d17a" strokeWidth="17" fill="none" />
      <circle cx="82" cy="138" r="26" stroke="#e0a940" strokeWidth="3" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
    </Svg>
  );
}

function CushionArt() {
  return (
    <Svg>
      <rect x="48" y="52" width="104" height="104" rx="16" fill="#d98a8a" />
      {grannySquare(58, 62, 40, '#e0a940', 'a')}
      {grannySquare(102, 62, 40, '#f7ecd9', 'b')}
      {grannySquare(58, 106, 40, '#f7ecd9', 'c')}
      {grannySquare(102, 106, 40, '#e0a940', 'd')}
      <circle cx="48" cy="52" r="6" fill="#f3d17a" />
      <circle cx="152" cy="52" r="6" fill="#f3d17a" />
      <circle cx="48" cy="156" r="6" fill="#f3d17a" />
      <circle cx="152" cy="156" r="6" fill="#f3d17a" />
    </Svg>
  );
}

function GiftArt() {
  return (
    <Svg>
      <rect x="58" y="102" width="84" height="62" rx="8" fill="#e8735a" />
      <rect x="52" y="88" width="96" height="20" rx="8" fill="#d96248" />
      <rect x="92" y="88" width="16" height="76" fill="#f3d17a" />
      <path d="M100 86 C84 66 68 76 84 88 Z" fill="#f3d17a" />
      <path d="M100 86 C116 66 132 76 116 88 Z" fill="#f3d17a" />
      <circle cx="100" cy="86" r="6" fill="#e0a940" />
      {[0, 60, 120, 180, 240, 300].map(a => {
        const r = (a * Math.PI) / 180;
        return <circle key={a} cx={152 + 10 * Math.cos(r)} cy={62 + 10 * Math.sin(r)} r="6" fill="#f0b7ac" />;
      })}
      <circle cx="152" cy="62" r="5" fill="#e0a940" />
      <circle cx="46" cy="66" r="3.5" fill="#8ec5e8" />
      <circle cx="60" cy="48" r="3" fill="#9cb88a" />
      <path d="M40 128 l4 4 m0 -4 l-4 4" stroke="#e0a940" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function DollsArt() {
  return (
    <Svg>
      <path d="M96 62 c-3 -6 -12 -6 -12 1 c0 5 8 9 12 12 c4 -3 12 -7 12 -12 c0 -7 -9 -7 -12 -1 Z" fill="#e0699e" transform="translate(4 -18)" />
      <circle cx="72" cy="92" r="18" fill="#f2d0b8" />
      <path d="M54 88 a18 18 0 0 1 36 0 a26 20 0 0 0 -36 0 Z" fill="#8a5a3b" />
      <circle cx="66" cy="96" r="2.5" fill="#2b1a07" />
      <circle cx="78" cy="96" r="2.5" fill="#2b1a07" />
      <path d="M69 103 q3 2.5 6 0" stroke="#2b1a07" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <rect x="56" y="110" width="32" height="38" rx="12" fill="#8ec5e8" />
      <path d="M58 122 h28" stroke="#5f9dc4" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
      <rect x="62" y="148" width="8" height="16" rx="4" fill="#f2d0b8" />
      <rect x="74" y="148" width="8" height="16" rx="4" fill="#f2d0b8" />
      <circle cx="128" cy="92" r="18" fill="#f2d0b8" />
      <path d="M110 88 a18 18 0 0 1 36 0 a26 20 0 0 0 -36 0 Z" fill="#4a2e17" />
      <circle cx="107" cy="80" r="7" fill="#4a2e17" />
      <circle cx="149" cy="80" r="7" fill="#4a2e17" />
      <circle cx="122" cy="96" r="2.5" fill="#2b1a07" />
      <circle cx="134" cy="96" r="2.5" fill="#2b1a07" />
      <path d="M125 103 q3 2.5 6 0" stroke="#2b1a07" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M112 110 h32 l8 38 h-48 Z" fill="#f0b7ac" />
      <path d="M112 122 h32" stroke="#d98a8a" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
      <rect x="118" y="148" width="8" height="16" rx="4" fill="#f2d0b8" />
      <rect x="130" y="148" width="8" height="16" rx="4" fill="#f2d0b8" />
    </Svg>
  );
}

function HeroArt() {
  return (
    <Svg>
      <circle cx="86" cy="112" r="46" fill="#ff8fbf" />
      <g stroke="rgba(0,0,0,0.15)" strokeWidth="3" fill="none" strokeLinecap="round">
        <ellipse cx="86" cy="112" rx="46" ry="19" />
        <ellipse cx="86" cy="112" rx="19" ry="46" />
        <path d="M50 100 C70 88 102 92 122 116" />
        <path d="M46 118 C68 108 106 112 126 130" />
      </g>
      <path d="M130 118 C158 128 170 148 166 172" stroke="#ff8fbf" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="0.5 8" />
      <path d="M148 34 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 l16 -6 Z" fill="#f3d17a" />
      <path d="M132 56 C120 42 138 28 148 40" stroke="#c98f2e" strokeWidth="0" fill="none" />
      <path d="M154 84 c-2.5 -5 -10 -5 -10 1 c0 4 6.5 7.5 10 10 c3.5 -2.5 10 -6 10 -10 c0 -6 -7.5 -6 -10 -1 Z" fill="#e0699e" />
      <circle cx="42" cy="52" r="4" fill="#8ec5e8" />
      <circle cx="60" cy="38" r="3" fill="#9cb88a" />
    </Svg>
  );
}

function CustomArt() {
  return (
    <Svg>
      {[
        { cx: 66, cy: 78, r: 26, fill: '#e8735a' },
        { cx: 128, cy: 64, r: 22, fill: '#8ec5e8' },
        { cx: 94, cy: 132, r: 24, fill: '#f3d17a' }
      ].map((b, i) => (
        <g key={i}>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} />
          <g stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <ellipse cx={b.cx} cy={b.cy} rx={b.r} ry={b.r * 0.42} />
            <ellipse cx={b.cx} cy={b.cy} rx={b.r * 0.42} ry={b.r} />
          </g>
        </g>
      ))}
      <path d="M138 100 L166 156" stroke="#8a5a3b" strokeWidth="7" strokeLinecap="round" />
      <path d="M138 100 C130 88 142 80 150 90" stroke="#8a5a3b" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M120 158 C130 168 146 170 158 164" stroke="#f3d17a" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="0.5 7" />
      <path d="M52 128 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#e0699e" />
      <circle cx="160" cy="44" r="4" fill="#9cb88a" />
    </Svg>
  );
}

export interface Artwork {
  bg: string;
  node: ReactNode;
}

export const ART: Record<string, Artwork> = {
  'rose-single': { bg: '#f9edea', node: <RoseArt /> },
  'teddy-bear': { bg: '#eef3e9', node: <TeddyArt /> },
  'mini-animal-keychain': { bg: '#e8f1f8', node: <KeychainArt /> },
  'shoulder-bag': { bg: '#fdf3e3', node: <BagArt /> },
  'scrunchie-set': { bg: '#f9edea', node: <ScrunchieArt /> },
  'cushion-cover': { bg: '#eef3e9', node: <CushionArt /> },
  'birthday-gift-set': { bg: '#e8f1f8', node: <GiftArt /> },
  'couple-dolls': { bg: '#f2eef8', node: <DollsArt /> },
  hero: { bg: '#f9edea', node: <HeroArt /> },
  custom: { bg: '#eef3e9', node: <CustomArt /> }
};
