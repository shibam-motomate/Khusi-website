'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';

export function Header({ showCustom = false }: { showCustom?: boolean }) {
  const { count } = useCart();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(253,251,249,0.86)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 40px'
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="fredoka" style={{ fontWeight: 600, fontSize: 22, color: '#2b1a07' }}>
          happy loops
        </span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showCustom && (
          <Link href="/custom-order" className="pill-btn">
            Custom Order
          </Link>
        )}
        <Link href="/cart" className="pill-btn">
          Cart
          {count > 0 && (
            <span
              style={{
                background: '#ff6f1e',
                color: '#fdfbf9',
                fontSize: 11,
                fontWeight: 700,
                minWidth: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px'
              }}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
