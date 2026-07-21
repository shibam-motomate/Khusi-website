'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GrannySquare, Stitch, YarnBall } from '@/components/motifs';

export default function CustomOrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [itemType, setItemType] = useState('Custom Doll');
  const [description, setDescription] = useState('');
  const [colors, setColors] = useState('');
  const [size, setSize] = useState('');

  return (
    <div style={{ color: '#171717', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <Header />

      <div className="page-pad" style={{ position: 'relative', maxWidth: 680, margin: '0 auto', padding: '40px 40px 100px' }}>
        <YarnBall
          size={50}
          style={{ position: 'absolute', left: 22, top: 34, animation: 'floaty 6s ease-in-out infinite', pointerEvents: 'none' }}
        />
        <GrannySquare
          size={42}
          style={{ position: 'absolute', right: 24, top: 30, animation: 'floaty 5s ease-in-out infinite', pointerEvents: 'none' }}
        />
        <div style={{ textAlign: 'center', marginBottom: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span className="caveat" style={{ fontWeight: 700, fontSize: 26, color: '#ff6f1e' }}>
            something just for you
          </span>
          <h1 className="fredoka" style={{ fontWeight: 600, fontSize: 32, margin: 0, color: '#2b1a07' }}>
            let&apos;s design it together
          </h1>
          <Stitch width={90} style={{ marginTop: 4 }} />
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#2b1a07', margin: '10px 0 0' }}>
            A doll of your pet, a bouquet in your favorite colors, a character you&apos;ve been imagining. Tell me about it
            and I&apos;ll follow up with a quote within 2 days.
          </p>
        </div>

        {!submitted ? (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              background: '#f7efe9',
              border: '1.5px solid #171717',
              borderRadius: 16,
              padding: 32,
              outline: '1.5px dashed rgba(23,23,23,0.22)',
              outlineOffset: -8,
              boxShadow: 'rgba(0,0,0,0.05) 0px 14px 34px 0px'
            }}
          >
            <YarnBall
              size={52}
              color="#fbe07a"
              strokeOpacity={0.2}
              fourStrands
              style={{ position: 'absolute', right: -16, top: -18, animation: 'floaty 5.5s ease-in-out infinite', pointerEvents: 'none' }}
            />
            <div style={{ display: 'flex', gap: 14 }}>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="field" style={{ flex: 1, minWidth: 0 }} />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="field" style={{ flex: 1, minWidth: 0 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8, color: '#171717' }}>
                What would you like made?
              </label>
              <select value={itemType} onChange={e => setItemType(e.target.value)} className="field" style={{ width: '100%' }}>
                <option value="Custom Doll">Custom Doll (person or pet)</option>
                <option value="Custom Bouquet">Custom Bouquet</option>
                <option value="Character Request">Character Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8, color: '#171717' }}>
                Describe what you&apos;re imagining
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Colors, size, outfit, personality, anything that helps me picture it..."
                className="field"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <input type="text" placeholder="Preferred colors" value={colors} onChange={e => setColors(e.target.value)} className="field" style={{ flex: 1, minWidth: 0 }} />
              <input type="text" placeholder="Size preference" value={size} onChange={e => setSize(e.target.value)} className="field" style={{ flex: 1, minWidth: 0 }} />
            </div>
            <button onClick={() => setSubmitted(true)} className="dark-btn dark-btn--bordered" style={{ padding: '14px 0' }}>
              Submit Request
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <YarnBall size={90} color="#62c6a0" strokeOpacity={0.18} fourStrands style={{ animation: 'floaty 6s ease-in-out infinite' }} />
            <h2 className="fredoka" style={{ fontWeight: 600, fontSize: 26, margin: 0, color: '#2b1a07' }}>
              request sent!
            </h2>
            <span className="caveat" style={{ fontWeight: 700, fontSize: 20, color: '#ff6f1e' }}>
              can&apos;t wait to make it for you ✿
            </span>
            <p style={{ fontSize: 15, color: '#2b1a07', margin: '2px 0 18px' }}>
              Thanks{name ? `, ${name}` : ''} — I&apos;ll email you a quote within 2 days.
            </p>
            <Link href="/" className="dark-btn dark-btn--bordered" style={{ padding: '13px 28px' }}>
              Back to Home
            </Link>
          </div>
        )}
      </div>

      <Footer
        links={[
          { href: '/shop', label: 'Shop All' },
          { href: '/cart', label: 'Your Cart' }
        ]}
      />
    </div>
  );
}
