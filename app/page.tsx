"use client";

import { useState } from "react";

export default function Home() {
  const books = [
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide" },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER SECTION */}
      <header className="px-6 py-8 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/phoenix-logo.svg" alt="Phoenix Publishing" className="h-12 w-auto" />
            <div className="border-l border-zinc-200 pl-4">
              <h1 className="text-xl font-bold tracking-tight">PHOENIX</h1>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Sovereign Publications</p>
            </div>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-600 transition">Library</a>
            <a href="#" className="hover:text-blue-600 transition">Audit Readiness</a>
            <a href="#" className="bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">Get Assistance</a>
          </nav>
        </div>
      </header>

      {/* HERO / CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-12">Specialist Knowledge Resources</h2>
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="group border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/4] bg-zinc-50 relative overflow-hidden">
                <img 
                  src={book.src} 
                  alt={book.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{book.alt}</h3>
                <p className="text-sm text-zinc-600 mb-6">Expert guidance for navigating complex tax and audit landscapes.</p>
                <button className="w-full py-3 border border-zinc-900 rounded-lg font-bold hover:bg-zinc-900 hover:text-white transition">
                  Access Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 mt-20 py-12 text-center text-zinc-400 text-sm">
        <p>© 2026 Phoenix Publishing. Sovereign tax and audit navigation.</p>
      </footer>
    </main>
  );
}