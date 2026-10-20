import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  turbopack: {
    root: __dirname,
  },
  // Gunakan modul ES modern agar tidak transpile ke ES5
  experimental: {
    esmExternals: true, // buat semua dependency pakai ES Module
  },

  // Opsional: hapus console.log di production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* config options here */
  images: {
    // domains: ['www.kurniasafety.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandbox.kurniasafety.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      }
    ];
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/award",
        destination: "/awards",
        permanent: true,
      },
      {
        source: "/id/award",
        destination: "/id/awards",
        permanent: true,
      },
      // redirect old category root
      {
        source: '/product-category/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },
    ];
  }
  // i18n: {
  //   locales: ['en', 'id'], // 'en' for English, 'id' for Indonesian
  //   defaultLocale: 'en',
  // }
};

export default nextConfig;
