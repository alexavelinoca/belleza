import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belleza | Your Beauty Appointment, Just a Click Away",
  description:
    "Discover the best beauty products and services. Experts in personal care, aesthetic treatments, and beauty advice.",
  keywords: "beauty, personal care, aesthetic treatments, beauty advice",
  authors: [{ name: "Belleza" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#ffffff",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://belleza.com",
    title: "Belleza | Your Beauty Appointment, Just a Click Away",
    description:
      "Discover the best beauty products and services. Experts in personal care, aesthetic treatments, and beauty advice.",
    siteName: "Belleza",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belleza | Your Beauty Appointment, Just a Click Away",
    description:
      "Discover the best beauty products and services. Experts in personal care, aesthetic treatments, and beauty advice.",
  },
  icons: {
    icon: "/images/belleza-logo2.png",
    apple: "/images/belleza-logo2.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${montserrat.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet='utf-8' />
        <meta name='format-detection' content='telephone=no' />
      </head>
      <body className='min-h-screen bg-white text-gray-900'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
