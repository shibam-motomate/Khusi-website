# Happy Loops — Handmade Crochet Store

A small-batch, made-to-order crochet storefront ("happy loops"), built with **Next.js (App Router) + TypeScript** from the Claude design handoff.

## Pages

| Route | Screen |
|---|---|
| `/` | Home — hero, statement, product story panels, no-list, extras, shelf, custom callout |
| `/shop` | Catalog — all products, alternating blob-framed rows |
| `/product/[id]` | Product detail — gallery, color/size selection, add to cart |
| `/cart` | Cart — quantity steppers, remove, order summary, free shipping over ₹50 |
| `/checkout` | Checkout — contact/shipping/payment form (prototype — no real payment) |
| `/custom-order` | Custom order request form |

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:3000
npm run build     # production build (all pages prerender statically)
npm start         # serve the production build
```

## Structure

- `app/` — routes (App Router)
- `components/` — Header, Footer, ProductCard, ImageSlot (photo placeholder), and `motifs.tsx` (yarn balls, scallop edges, stitch underlines, dividers)
- `lib/products.ts` — product catalog data + helpers
- `lib/cart.tsx` — cart context, persisted to `localStorage` (`happyloops_cart`)
- `lib/reveal.ts` — scroll-reveal system (IntersectionObserver + fallback, respects reduced motion)

## Notes

- **Product photos are placeholders** (`ImageSlot`) — swap in real crochet photography when available.
- Checkout is a prototype: no payment processing or order backend yet (Stripe + an orders store are the planned next step).
