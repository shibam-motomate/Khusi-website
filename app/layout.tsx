import type { Metadata } from 'next';
import { Fredoka, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta'
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat'
});

export const metadata: Metadata = {
  title: 'happy loops — handmade crochet',
  description:
    'Small-batch, made-to-order crochet — flowers, amigurumi, keychains, bags and gifts, every piece made by hand.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
