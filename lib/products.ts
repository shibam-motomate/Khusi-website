export interface Category {
  slug: string;
  label: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: ColorSwatch[];
  sizes?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  caption: string;
  description: string;
  care: string;
}

export const categories: Category[] = [
  { slug: 'flowers', label: 'Flowers' },
  { slug: 'amigurumi', label: 'Amigurumi' },
  { slug: 'keychains', label: 'Keychains' },
  { slug: 'bags', label: 'Bags' },
  { slug: 'accessories', label: 'Accessories' },
  { slug: 'home-decor', label: 'Home Décor' },
  { slug: 'gifts', label: 'Gifts' }
];

const C = {
  coral: { name: 'Coral', hex: '#e8735a' },
  blush: { name: 'Blush', hex: '#f0b7ac' },
  butter: { name: 'Butter', hex: '#f3d17a' },
  sage: { name: 'Sage', hex: '#9cb88a' },
  sky: { name: 'Sky', hex: '#8ec5e8' },
  cream: { name: 'Cream', hex: '#f7ecd9' },
  dustyrose: { name: 'Dusty Rose', hex: '#d98a8a' },
  lavender: { name: 'Lavender', hex: '#b9a6d9' },
  terracotta: { name: 'Terracotta', hex: '#c1603f' },
  honey: { name: 'Honey', hex: '#e0a940' }
} satisfies Record<string, ColorSwatch>;

const AMIGURUMI_SIZES = ['Small', 'Medium', 'Large'];

export const products: Product[] = [
  { id: 'rose-single', name: 'Single Crochet Rose', category: 'flowers', price: 12, colors: [C.coral, C.blush, C.butter], isNew: true, caption: 'a little bloom that lasts', description: 'A single hand-stitched rose on a wire stem, shaped bloom by bloom to hold its form.', care: 'Wipe with a dry cloth. Keep away from direct heat and moisture.' },
  { id: 'teddy-bear', name: 'Cuddle Teddy Bear', category: 'amigurumi', price: 28, sizes: AMIGURUMI_SIZES, colors: [C.honey, C.cream, C.dustyrose], isNew: true, caption: 'my most-requested hug', description: 'A soft, huggable bear stitched in a dense double-crochet for durability.', care: 'Surface wash with mild soap. Air dry flat, out of direct sun.' },
  { id: 'mini-animal-keychain', name: 'Mini Animal Keychain', category: 'keychains', price: 9, colors: [C.coral, C.sage, C.sky], isBestseller: true, caption: 'tiny friend for your keys', description: 'A palm-sized amigurumi charm on a metal clip, ready for bags or keys.', care: 'Spot clean only.' },
  { id: 'shoulder-bag', name: 'Granny-Square Shoulder Bag', category: 'bags', price: 52, colors: [C.coral, C.butter, C.sky, C.sage], isBestseller: true, caption: 'the one everyone asks about', description: 'Classic granny squares joined into a lined shoulder bag with a leather strap.', care: 'Spot clean. Avoid soaking the joins.' },
  { id: 'scrunchie-set', name: 'Scrunchie Set (3-Pack)', category: 'accessories', price: 16, colors: [C.blush, C.sage, C.butter], isNew: true, caption: 'soft on your hair, sweeter in person', description: 'Three oversized scrunchies in a soft cotton-blend yarn.', care: 'Hand wash cold, lay flat to dry.' },
  { id: 'cushion-cover', name: 'Granny-Square Cushion Cover', category: 'home-decor', price: 30, colors: [C.dustyrose, C.honey, C.cream], isBestseller: true, caption: 'a little warmth for the couch', description: 'A patchwork of granny squares backed in cotton, fits an 18-inch insert.', care: 'Hand wash cold, lay flat to dry.' },
  { id: 'birthday-gift-set', name: 'Birthday Gift Set', category: 'gifts', price: 42, colors: [C.coral, C.butter, C.sky], isNew: true, caption: 'wrapped up and ready to gift', description: 'A mini bouquet, keychain charm, and gift tag bundled for a birthday.', care: 'See individual care instructions per item.' },
  { id: 'couple-dolls', name: 'Couple Dolls', category: 'gifts', price: 36, colors: [C.blush, C.sky, C.cream], isBestseller: true, caption: 'made for two', description: 'A pair of matching dolls, customizable with different hair and outfits.', care: 'Surface wash only. Air dry flat.' }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function getCategoryLabel(slug: string): string {
  const c = categories.find(c => c.slug === slug);
  return c ? c.label : 'Shop All';
}
