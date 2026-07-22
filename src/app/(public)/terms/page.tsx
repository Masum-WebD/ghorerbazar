import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms & Conditions | Siraj Tech",
  description: "Terms and conditions and delivery policies for Siraj Tech"
};

export default function TermsPage() {
  return <TermsClient />;
}
