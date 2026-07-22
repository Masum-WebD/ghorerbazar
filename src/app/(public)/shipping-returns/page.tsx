import { Metadata } from 'next';
import ShippingReturnsClient from './ShippingReturnsClient';

export const metadata: Metadata = {
  title: "Shipping & Returns | Siraj Tech",
  description: "Shipping and Returns Policy for Siraj Tech"
};

export default function ShippingReturnsPage() {
  return <ShippingReturnsClient />;
}
