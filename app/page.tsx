"use client";

import { useState } from "react";

export default function Home() {
  // Asset mapping aligned to your verified public folder
  const books = [
    { id: "sars-guide", src: "/filing-system.jpg", alt: "Mastering the SARS ITR-DD Form" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "The UIF Survival Guide" },
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "The Missing Link in Your Tax Claim" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Demystifying Disability Tax Benefits" },
  ];

  return (
    <main className="min-h-screen font-sans bg-[#4a3520]">
      {/* HEADER SECTION - White */}
      <header className="bg-white px-6 py-3 flex items-center justify-between border-b shadow-sm relative z-20">
        <div className="flex items-center w-1/3">
          <img 
            src="/phoenix-logo.svg" 
            alt="Phoenix Logo" 
            className="h-10 w-auto" 
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} 
          />
        </div>
        
        <div className="flex items-center justify-center w-1/3 text-zinc-900 font-semibold text-sm">
          Book Corner
        </div>
        
        <div className="flex items-center justify-end w-1/3 gap-5 text-[11px] text-zinc-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm">🔒</span>
            <a href="#" className="hover:text-blue-600 flex items-center gap-1 transition">
              PDF Download
            </a>
            <a href="#" className="hover:text-blue-600 flex items-center gap-1 transition">
              eReader
            </a>
            <a href="#" className="hover:text-blue-600 transition">ReadEra</a>
          </div>
          <div className="font-extrabold text-black uppercase text-[10px] text-right leading-tight ml-2 border-l border-zinc-200 pl-4">
            EPUB READER<br/>DOWNLOAD
          </div>
        </div>
      </header>

      {/* BLUE BANNER SECTION */}
      <section className="bg-[#3170a7] text-white py-14 px-6 relative z-10 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3 drop-shadow-md tracking-wide">Specialist Educational Literature</h2>
          <p className="opacity-90 text-sm italic font-light tracking-wide">
            Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
          </p>
        </div>
        
        {/* Placeholder App Store Links on the right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 text-xs opacity-70">
          <div className="hover:opacity-100 transition cursor-pointer flex items-center gap-2">
            Get it on Google Play
          </div>
          <div className="hover:opacity-100 transition cursor-pointer flex items-center gap-2">
            Apple Logo
          </div>
          <div className="hover:opacity-100 transition cursor-pointer flex items-center gap-2">
            Get it from Microsoft
          </div>
        </div>
      </section>

      {/* BROWN GRID SECTION WITH WOOD PANEL EFFECT */}
      <section 
        className="min-h-[600px] py-12 px-8 relative shadow-inner"
        style={{
          backgroundColor: '#4a3520',
          backgroundImage: 'linear-gradient(to right, #3e2c1a 2px, transparent 2px)',
          backgroundSize: '120px 100%'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10 bg-[#4a3520]/80 inline-flex pr-4 py-1 rounded">
            <div className="w-1.5 h-6 bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
            <h3 className="text-white font-bold text-lg tracking-wide">Now Available</h3>
          </div>
          
          {/* Books Grid */}
          <div className="flex flex-wrap gap-8">
            {books.map((book) => (
              <div key={book.id} className="bg-white p-3.5 rounded-sm shadow-2xl w-[260px] flex flex-col h-[340px] transition-transform duration-300 hover:-translate-y-2">
                <div className="text-[13px] font-semibold text-zinc-800 mb-3 leading-snug h-10 overflow-hidden">
                  {book.alt}
                </div>
                <div className="flex-1 bg-zinc-100 relative overflow-hidden shadow-inner border border-zinc-200">
                  <img 
                    src={book.src} 
                    alt={book.alt} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none"; 
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xs text-zinc-400 p-4 text-center">Cover Image Missing</div>';
                    }} 
                  />
                </div>
                <div className="flex justify-center mt-4 text-yellow-400 text-xl tracking-widest drop-shadow-sm">
                  ★★★★★
                </div>
              </div>
            ))}

            {/* Editing Phase Placeholder */}
            <div className="border-2 border-dashed border-zinc-500/40 bg-[#4a3520]/60 w-[260px] h-[340px] flex flex-col items-center justify-end pb-5 text-zinc-400 transition-colors hover:bg-[#4a3520]/80 shadow-lg">
               <div className="transform -rotate-45 font-bold tracking-widest text-xl opacity-40 mb-20">
                 EDITING PHASE
               </div>
               <div className="text-lg tracking-widest opacity-40">☆☆☆☆☆</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}