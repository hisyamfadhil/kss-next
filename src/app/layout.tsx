import "./style.css";
import { baseUrl, baseUrlAPI, imageBaseUrl } from "@/utils/baseUrl";
import { getGoogleAnalytic } from "./lib/api";
import { Jost } from 'next/font/google';
import TrackingScript from "./TrackingScript";
import { GoogleTagManager } from '@next/third-parties/google'

const jost = Jost({ weight: '600', subsets: ['latin'], display: 'swap' });

export async function generateMetadata() {

  const res = await fetch(baseUrlAPI(`api/global_metadata/1`), {
    // next: { revalidate: 3600 },
    // cache: "no-store"
  });
  const data = await res.json();

  return {
    title: {
      default: data.settings.site_title || "Distributor Alat Safety Indonesia",
      template: `%s - ${data.settings.site_title || 'Distributor Alat Safety Indonesia'}`
    },
    description:
      data.settings.site_description ||
      "Distributor Alat Safety Indonesia untuk Brand 3M, MSA, AED ZOLL, Honeywell, Ansell, Bullard, Microgard, DBI Sala, Protector, Haws.",
    openGraph: {
      title: data.settings.site_title,
      description: data.settings.site_description,
      url: baseUrl("/", "id"),
      images: imageBaseUrl(data.general_settings.favicon || "default-og.jpg"),
      siteName: data.settings.site_title,
      locale: "id_ID",
      type: "website",
    },
    icons: {
      icon: [
        {
          url: "/favicon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      apple: {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    },
    manifest: "/site.webmanifest",
    other: {
      'google-site-verification': '0KEeP3Jc67LrwsWPYUIaS3X2MP3kIdSAMqNdlUt46CY'
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const google_analytics = await getGoogleAnalytic()  
  return (
    <html lang="id" className={jost.className}>
      <head>
        <>
          <meta name="google-site-verification" content="0KEeP3Jc67LrwsWPYUIaS3X2MP3kIdSAMqNdlUt46CY" />
        </>
      </head>
      <GoogleTagManager gtmId="GTM-PS4VWM6" />
      <body >
        {children}
      </body>
    </html>
  );
}