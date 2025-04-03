import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"
import { AppProps } from 'next/app';
import i18n from '../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export const metadata: Metadata = {
  title: "MyStore",
  description: "A simple store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster />

      </body>
    </html>
  );
}
