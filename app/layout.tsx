import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomCursor from "@/components/shared/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "IIT Jodhpur Student Senate Portal",
  description: "Explore the structure and members of the IIT Jodhpur Student Senate. Your official portal for student activities, councils, and events.",
  keywords: ["IIT Jodhpur", "Student Senate", "IITJ", "Student Council", "Campus Life"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-navy text-white min-h-screen`}>
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Noise texture overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay" aria-hidden="true" />
        
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
