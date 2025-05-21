"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./Providers";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import 'jquery-ui/themes/base/all.css';
import { CartProvider } from "use-shopping-cart";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';










const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children, session }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);
  

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/imgs/theme/favicon.png" />
  
  <link rel="stylesheet" href="/assets/css/plugins/slider-range.css" />

  <link rel="stylesheet" href="/assets/css/fontawesome/css/all.min.css"/>
  <link rel="stylesheet" href="/assets/css/utils.css"/>
  <link rel="stylesheet" href="/assets/css/styles.css"/>
  <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        
        <SessionProvider session={session}>
          <CartProvider
  mode="client-only"
  cartMode="client-only"
  stripe={null} // not using Stripe directly
  currency="USD"
    shouldPersist={true}

>
          <Header categories={categories} />
          {children}
          <Footer />
          <Script src="/assets/js/vendor/modernizr-3.6.0.min.js" />
            <Script src="/assets/js/vendor/jquery-3.6.0.min.js"/>
            <Script src="/assets/js/vendor/jquery-migrate-3.3.0.min.js"/>
            <Script src="/assets/js/vendor/bootstrap.bundle.min.js"/>
            <Script src="/assets/js/plugins/slick.js"/>
            <Script src="/assets/js/plugins/jquery.syotimer.min.js"/>
            <Script src="/assets/js/plugins/wow.js"/>
            <Script src="/assets/js/plugins/slider-range.js"/>
            <Script src="/assets/js/plugins/perfect-scrollbar.js"/>
            <Script src="/assets/js/plugins/magnific-popup.js"/>
            <Script src="/assets/js/plugins/select2.min.js"/>
            <Script src="/assets/js/plugins/counterup.js"/>
            <Script src="/assets/js/plugins/jquery.countdown.min.js"/>
            <Script src="/assets/js/plugins/scrollup.js"/>
            <Script src="/assets/js/plugins/jquery.vticker-min.js"/>
            <Script src="/assets/js/plugins/jquery.theia.sticky.js"/>
            <Script src="/assets/js/plugins/jquery.elevatezoom.js"/>
          
            
            <Script src="/assets/js/main.js"/>
            <Script src="/assets/js/shop.js"/>
            
</CartProvider>
</SessionProvider>

      </body>
    </html>
  );
}