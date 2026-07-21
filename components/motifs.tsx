import type { CSSProperties } from 'react';

/* Signature crochet motifs — yarn balls, granny squares, stitch lines,
   scalloped edges, dividers — all inline SVG lifted from the design. */

export function YarnBall({
  size = 60,
  color = '#ff8fbf',
  strokeOpacity = 0.16,
  fourStrands = false,
  style
}: {
  size?: number;
  color?: string;
  strokeOpacity?: number;
  fourStrands?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={style} aria-hidden>
      <circle cx="30" cy="30" r="24" fill={color} />
      <g stroke={`rgba(0,0,0,${strokeOpacity})`} strokeWidth="2" fill="none" strokeLinecap="round">
        <ellipse cx="30" cy="30" rx="24" ry="10" />
        <ellipse cx="30" cy="30" rx="10" ry="24" />
        <path d="M11 24 C24 17 40 20 50 33" />
        {fourStrands && <path d="M9 33 C22 27 43 30 53 41" />}
      </g>
    </svg>
  );
}

export function GrannySquare({ size = 46, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" style={style} aria-hidden>
      <rect x="2" y="2" width="30" height="30" rx="3" fill="none" stroke="#62c6a0" strokeWidth="2.5" />
      <rect x="9" y="9" width="16" height="16" rx="2" fill="none" stroke="#ff8fbf" strokeWidth="2.5" transform="rotate(45 17 17)" />
      <circle cx="17" cy="17" r="3.5" fill="#f3c34a" />
    </svg>
  );
}

export function Stitch({
  color = '#ff8fbf',
  width = 76,
  height = 4,
  style
}: {
  color?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: height / 2,
        background: `repeating-linear-gradient(90deg,${color} 0 7px,transparent 7px 12px)`,
        animation: 'stitchMarch .9s linear infinite',
        ...style
      }}
    />
  );
}

export function Scallop({ color }: { color: string }) {
  return (
    <div
      style={{
        height: 20,
        background: `radial-gradient(circle 11px at 11px 20px,${color} 95%,transparent) 0 0/22px 20px repeat-x`
      }}
    />
  );
}

export function CrossHatch({ opacity = 0.5, tint = '43,26,7' }: { opacity?: number; tint?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: `repeating-linear-gradient(45deg,rgba(${tint},0.05) 0 2px,transparent 2px 7px),repeating-linear-gradient(-45deg,rgba(${tint},0.04) 0 2px,transparent 2px 7px)`
      }}
    />
  );
}

export function FlowerDivider() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px 40px' }}>
      <svg width="100%" height="46" viewBox="0 0 1100 46" fill="none" preserveAspectRatio="none" aria-hidden>
        <path d="M0,23 C130,-4 250,50 380,23 C470,4 520,42 560,25" stroke="#ff8fbf" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" vectorEffect="non-scaling-stroke" />
        <path d="M540,23 C640,4 700,44 820,23 C960,-2 1000,48 1100,22" stroke="#ff8fbf" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" vectorEffect="non-scaling-stroke" />
        <g transform="translate(550 23)">
          <g fill="#ffb84d">
            <circle cx="0" cy="-9" r="5" /><circle cx="0" cy="9" r="5" /><circle cx="-9" cy="0" r="5" /><circle cx="9" cy="0" r="5" />
            <circle cx="-6.4" cy="-6.4" r="5" /><circle cx="6.4" cy="-6.4" r="5" /><circle cx="-6.4" cy="6.4" r="5" /><circle cx="6.4" cy="6.4" r="5" />
          </g>
          <circle cx="0" cy="0" r="4.2" fill="#ff6f1e" />
        </g>
      </svg>
    </div>
  );
}

export function HeartDivider() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '22px 40px 4px' }}>
      <svg width="100%" height="46" viewBox="0 0 1100 46" fill="none" preserveAspectRatio="none" aria-hidden>
        <path d="M0,23 C120,-4 240,50 360,23 C450,4 500,42 545,25" stroke="#f3c34a" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" vectorEffect="non-scaling-stroke" />
        <path d="M555,25 C620,42 680,4 760,23 C900,-2 980,48 1100,22" stroke="#f3c34a" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" vectorEffect="non-scaling-stroke" />
        <path d="M550,17 C546,10 536,13 550,27 C564,13 554,10 550,17 Z" fill="#ff6f1e" />
      </svg>
    </div>
  );
}

export function FooterThread() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', height: 60, position: 'relative', boxSizing: 'border-box' }}>
      <svg width="100%" height="60" viewBox="0 0 900 60" fill="none" preserveAspectRatio="none" aria-hidden>
        <path d="M110,-10 C300,50 600,-10 780,40" stroke="#ff6f1e" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function HandmadeBadge({
  label,
  bg,
  ink,
  rotate,
  style
}: {
  label: string;
  bg: string;
  ink: string;
  rotate: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className="caveat"
      style={{
        background: bg,
        border: `1.5px dashed ${ink}`,
        borderRadius: 20,
        padding: '6px 14px',
        fontWeight: 700,
        fontSize: 17,
        color: ink,
        transform: `rotate(${rotate}deg)`,
        boxShadow: 'rgba(0,0,0,0.08) 0px 4px 10px 0px',
        ...style
      }}
    >
      {label}
    </div>
  );
}
