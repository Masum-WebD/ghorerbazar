import type { Metadata } from "next";
import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import ErrorTracker from "@/components/ErrorTracker";

const balooDa2 = Baloo_Da_2({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo-da-2',
  display: 'swap',
});
import { Providers } from "@/providers";
import { ToastProviders } from "@/components/ToastProviders";
import { AffiliateTracker } from "@/components/AffiliateTracker";
import { Suspense } from "react";
import NextTopLoader from 'nextjs-toploader';
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { fetchMarketingConfig } from "@/lib/api/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const configs = await fetchMarketingConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sirajtech.org";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "SIRAJ TECH",
      template: "%s | Sirajtech",
    },
    description: "বাংলাদেশে টেকসই Geo Bags & Garden Materials উন্নতমানের Geotextiles পাবেন আমাদের কাছে। ছাদ বাগানের সকল পণ্য এক যাগায় - সরাসরি SirajTech থেকে",
    keywords: ["Geotextiles", "Geo Bags", "Garden Materials", "Geotextile price in Bangladesh", "Roof Garden Products", "Sirajtech"],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale: "bn_BD",
      siteName: "SIRAJ TECH",
      url: siteUrl,
      title: "We provide High-Quality Geo Bags, Geotextiles & Garden Materials - SIRAJ TECH",
      description: "বাংলাদেশে টেকসই Geo Bags, উন্নতমানের Geotextile এবং Garden Materials পাবেন আমাদের কাছে। ছাদ বাগানের সকল পণ্য এক যাগায় - সরাসরি SirajTech থেকে",
      images: [
        {
          url: "/assets/logo.png",
          width: 800,
          height: 600,
          alt: "SIRAJ TECH",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "We provide High-Quality Geo Bags, Geotextiles & Garden Materials - SIRAJ TECH",
      description: "বাংলাদেশে টেকসই Geo Bags, উন্নতমানের Geotextile এবং Garden Materials পাবেন আমাদের কাছে। ছাদ বাগানের সকল পণ্য এক যাগায় - সরাসরি SirajTech থেকে",
      site: "@siraj_tech24",
    },
    verification: configs?.gsc_verification_token ? {
      google: configs.gsc_verification_token,
    } : undefined,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configs = await fetchMarketingConfig();

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {/* Dynamic GSC Verification as fallback */}
        {configs?.gsc_verification_token && (
          <meta name="google-site-verification" content={configs.gsc_verification_token} />
        )}
      </head>
      {configs?.gtm_id && <GoogleTagManager gtmId={configs.gtm_id} />}
      <body className={`${balooDa2.variable} font-body antialiased`} suppressHydrationWarning>
        <ErrorTracker />
        {configs?.gtm_id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${configs.gtm_id}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {configs?.ga4_measurement_id && <GoogleAnalytics gaId={configs.ga4_measurement_id} />}
        <NextTopLoader color="#059669" height={5} showSpinner={false} />
        <Providers>
          {children}
          <Suspense fallback={null}>
            <AffiliateTracker />
          </Suspense>
          <ToastProviders />
        </Providers>
      </body>
    </html>
  );
}

