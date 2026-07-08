"use client";

import { useState } from "react";

export default function Home() {
  const books = [
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide" },
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits" },
  ];

  return (
    <main className="min-h-screen font-sans flex flex-col bg-[#4a3520]">
      
      {/* HEADER SECTION - White */}
      <header className="bg-white w-full px-6 py-4 flex items-center justify-between border-b border-zinc-200 z-20 shrink-0 shadow-sm">
        
        {/* Left: Logo - STRICTLY BOUNDED with inline styles to prevent explosion */}
        <div className="flex items-center w-1/3">
          <img
            src="/phoenix-logo.svg"
            alt="Phoenix Logo"
            style={{ height: '60px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }} 
          />
        </div>

        {/* Center: Title */}
        <div className="flex items-center justify-center w-1/3 text-black font-semibold text-sm">
          Book Corner
        </div>

        {/* Right: Links */}
        <div className="flex items-center justify-end w-1/3 gap-4 text-[11px] text-zinc-600 font-medium hidden md:flex">
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <a href="#" className="hover:text-blue-600 transition">PDF Download</a>
            <a href="#" className="hover:text-blue-600 transition">eReader</a>
            <a href="#" className="hover:text-blue-600 transition">ReadEra</a>
          </div>
          <div className="font-extrabold text-black uppercase text-[10px] text-right leading-tight border-l border-zinc-200 pl-4">
            EPUB READER<br/>DOWNLOAD
          </div>
        </div>
      </header>

      {/* BLUE BANNER SECTION */}
      <section className="bg-[#3170a7] text-white py-12 px-6 relative z-10 shadow-md shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3 drop-shadow-sm tracking-wide">
            Specialist Educational Literature
          </h2>
          <p className="opacity-90 text-sm italic font-light tracking-wide">
            Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
          </p>
        </div>

        {/* Store Links Placeholder (Hidden on mobile, visible on large screens) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 text-xs opacity-80">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition">Get it on Google Play</div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition">Apple Logo</div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition">Get it from Microsoft</div>
        </div>
      </section>

      {/* BROWN GRID SECTION WITH WOOD PANEL EFFECT */}
      <section
        className="flex-1 py-12 px-8 relative shadow-inner"
        style={{
          backgroundColor: '#4a3520',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 2px, transparent 2px)',
          backgroundSize: '120px 100%'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-10 inline-flex bg-[#4a3520]/80 pr-4 py-1 rounded">
            <div className="w-1.5 h-6 bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
            <h3 className="text-white font-bold text-lg tracking-wide">Now Available</h3>
          </div>

          {/* Books Grid */}
          <div className="flex flex-wrap gap-8">
            
            {books.map((book) => (
              <div key={book.id} className="bg-white p-4 rounded-sm shadow-2xl w-[260px] h-[360px] flex flex-col items-center transition-transform hover:-translate-y-2 cursor-pointer">
                <div className="w-full h-full bg-zinc-100 relative overflow-hidden border border-zinc-200 mb-4 flex items-center justify-center text-xs text-zinc-400">
                  <img 
                    src={book.src} 
                    alt={book.alt} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} 
                  />
                  <span className="absolute -z-10 text-center px-2">{book.alt}</span>
                </div>
                <div className="text-yellow-400 text-xl tracking-widest pb-2">★★★★★</div>
              </div>
            ))}

            {/* Editing Phase Placeholder */}
            <div className="border-2 border-dashed border-zinc-400/30 bg-[#4a3520]/40 w-[260px] h-[360px] flex flex-col items-center justify-end pb-6 text-zinc-400 relative shadow-lg">
               <div className="absolute inset-0 flex items-center justify-center transform -rotate-45 font-bold tracking-widest text-2xl opacity-30">
                 EDITING PHASE
               </div>
               <div className="text-xl tracking-widest opacity-30 relative z-10">☆☆☆☆☆</div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}