import type { CSSProperties } from 'react';
import { YarnBall } from './motifs';
import { ART } from './illustrations';

/* Product imagery slot. If demo artwork is registered for `artId`, render the
   flat illustration; otherwise fall back to a warm-tinted placeholder with a
   yarn ball + caption. Swap the artwork for real crochet photography later. */
export function ImageSlot({
  label,
  artId,
  ballColor = '#ff8fbf',
  style
}: {
  label: string;
  artId?: string;
  ballColor?: string;
  style?: CSSProperties;
}) {
  const art = artId ? ART[artId] : undefined;

  if (art) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: art.bg,
          backgroundImage:
            'repeating-linear-gradient(45deg,rgba(43,26,7,0.025) 0 2px,transparent 2px 9px),repeating-linear-gradient(-45deg,rgba(43,26,7,0.02) 0 2px,transparent 2px 9px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...style
        }}
      >
        <div style={{ width: '86%', height: '86%' }}>{art.node}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f7efe9',
        backgroundImage:
          'repeating-linear-gradient(45deg,rgba(43,26,7,0.03) 0 2px,transparent 2px 9px),repeating-linear-gradient(-45deg,rgba(43,26,7,0.025) 0 2px,transparent 2px 9px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        overflow: 'hidden',
        ...style
      }}
    >
      <YarnBall size={34} color={ballColor} strokeOpacity={0.14} />
      <span
        className="caveat"
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: '#a8917d',
          textAlign: 'center',
          padding: '0 12px',
          lineHeight: 1.2
        }}
      >
        {label}
      </span>
    </div>
  );
}
