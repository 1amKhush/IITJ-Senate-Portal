import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-navy text-white min-h-screen">
      <div className="h-16 bg-navy/80 backdrop-blur-xl shadow-lg border-b border-white/5"></div>
      <main className="w-full mx-auto">{children}</main>
    </div>
  );
}