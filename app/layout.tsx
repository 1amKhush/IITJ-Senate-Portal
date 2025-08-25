import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "IIT Jodhpur Student Senate Portal",
  description: "Explore the structure and members of the IIT Jodhpur Student Senate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add custom fonts here */}
        <link
          href="https://fonts.cdnfonts.com/css/ica-rubrik-black"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/poppins"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
