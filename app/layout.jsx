import JsonLD from "@/components/SEO/JsonLD";
import StoreProvider from "./StoreProvider";
import "./globals.css"; // Optional: Global styles
import FbPixelTracker from "@/components/FbPixelTracker";
import Script from "next/script";

const FB_PIXEL_ID = "YOUR_PIXEL_ID";
export const metadata = {
  title: "Home | Ceramic & Food Products",
  description:
    "Buy high-quality ceramic and food products online at affordable prices.",
  keywords: ["ceramic", "food", "organic", "kitchenware", "home decor"],
  authors: [{ name: "Ceramic & Food Products" }],
  openGraph: {
    title: "Ceramic & Food Products",
    description: "Your one-stop shop for all ceramic and food items.",
    url: "https://ceramicandfoodproducts.com",
    siteName: "Ceramic & Food Products",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Ceramic Product Display",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceramic & Food Products",
    description: "Explore our exclusive ceramic and food collection.",
    images: ["/logo1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLD />
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
        <FbPixelTracker />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
