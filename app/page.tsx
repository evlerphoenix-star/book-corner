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
    <main className="min-h-screen bg-white font-sans text-zinc-900">
      {/* HEADER: White Background, Logo Left */}
      <header className="px-6 py-4 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/phoenix-logo.svg" alt="Phoenix Logo" className="h-10 w-auto" />
            <span className="text-lg font-bold text-zinc-800">Book Corner</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="#" className="hover:text-blue-600">About</a>
            <div className="flex items-center gap-2">
               <span className="text-zinc-400">🔒</span>
               <a href="#" className="hover:text-blue-600">PDF Download</a>
               <a href="#" className="hover:text-blue-600">eReader</a>
            </div>
            <div className="font-bold text-black uppercase text-xs tracking-wider">
               EPUB READER DOWNLOAD
            </div>
          </div>
        </div>
      </header>

      {/* BLUE BANNER */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Specialist Educational Literature</h2>
        <p className="max-w-2xl mx-auto opacity-90 text-sm">
          Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
        </p>
      </section>

      {/* BROWN GRID SECTION */}
      <section className="bg-[#3e2e25] py-12 px-6 min-h-[500px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-6 bg-yellow-600"></div>
            <h3 className="text-white font-bold text-lg">Now Available</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white p-2 rounded shadow-sm hover:shadow-lg transition">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative">
                  <img 
                    src={book.src} 
                    alt={book.alt} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="py-3 px-1 text-center">
                  <p className="text-xs font-semibold text-zinc-800 truncate">{book.alt}</p>
                  <div className="flex justify-center mt-2 text-yellow-500 text-xs">
                     ★★★★★
                  </div>
                </div>
              </div>
            ))}
            
            {/* PLACEHOLDER FOR "EDITING PHASE" */}
            <div className="border-2 border-dashed border-zinc-600 bg-[#3e2e25]/50 flex flex-col items-center justify-center p-6 text-zinc-400 text-sm italic">
               <span className="mb-2">EDITING PHASE</span>
               <span className="text-xs">☆☆☆☆☆</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}