import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getRelated, products } from '@/lib/products';
import { ProductView } from './ProductView';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'happy loops' };
  return {
    title: `${product.name} — happy loops`,
    description: product.description
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductView product={product} related={getRelated(product, 3)} />;
}
