import Link from 'next/link';
import type { Product } from '@/lib/products';
import { ImageSlot } from './ImageSlot';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#171717', width: '100%' }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#f7efe9',
          border: '1.5px solid #171717'
        }}
      >
        <div style={{ width: '100%', aspectRatio: '1/1' }}>
          <ImageSlot label={product.name} artId={product.id} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '0 2px' }}>
        <span className="caveat" style={{ fontWeight: 700, fontSize: 16, color: '#ff6f1e' }}>
          {product.caption}
        </span>
        <span className="fredoka" style={{ fontWeight: 600, fontSize: 17, color: '#2b1a07' }}>
          {product.name}
        </span>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#171717' }}>${product.price}</span>
      </div>
    </Link>
  );
}
