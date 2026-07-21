import type { CSSProperties } from 'react';
import { YarnBall } from './motifs';

/* Placeholder for product photography: the design ships drag-and-drop image
   slots to be filled with real crochet photos. Until those exist we render a
   warm-tinted frame with a yarn ball + caption so the demo reads finished. */
export function ImageSlot({
  label,
  ballColor = '#ff8fbf',
  style
}: {
  label: string;
  ballColor?: string;
  style?: CSSProperties;
}) {
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
