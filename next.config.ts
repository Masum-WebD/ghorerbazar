import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // Local Development
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },

      // Production API
      {
        protocol: "https",
        hostname: "aa.sirajtech.org",
        pathname: "/**",
      },

    ],
  },

  async headers() {
    return [
      {
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/shop-now",
        destination: "/shop",
        statusCode: 301,
      },
      {
        source: "/category/:path*",
        destination: "/blog/:path*",
        statusCode: 301,
      },
      {
        source: "/product-category/:path*",
        destination: "/shop/:path*",
        statusCode: 301,
      },
       {
        source: "/wp-content/:path*",
        destination: "https://aa.sirajtech.org/storage/media_gallery/:path*",
        statusCode: 301,
      },
      {
        source: "/order-received/:path*",
        destination: "/track-order",
        statusCode: 301,
      },
      {
        source: "/checkout/order-received/:path*",
        destination: "/track-order",
        statusCode: 301,
      },
      {
        source: "/order-received",
        destination: "/track-order",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;