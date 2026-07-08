"use client";

import { useState } from "react";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const books = [
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept", price: "R49.50" },
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready", price: "R49.50" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link", price: "R49.50" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits", price: "R49.50" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide", price: "R49.50" },
  ];

  return (
    <main className="min-h-screen font-sans flex flex-col relative bg-[#4a3520]">
      
      {/* HEADER SECTION - White background, logo left */}
      <header className="bg-white w-full px-6 py-4 flex items-center justify-between border-b border-zinc-200 z-20 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-4">
          <img
            src="/phoenix-logo.svg"
            alt="Phoenix Logo"
            className="h-[100px] w-auto object-contain" 
          />
        </div>
        
        <div className="flex items-center justify-end gap-6 text-sm font-medium text-zinc-600 hidden md:flex">
          <span className="font-bold text-black text-lg">Book Corner</span>
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

      {/* BLUE BANNER */}
      <section className="bg-[#3170a7] text-white py-8 px-6 relative z-10 shrink-0 border-b-4 border-[#255682]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2 tracking-wide">
            Specialist Educational Literature
          </h2>
          <p className="opacity-90 text-sm italic font-light tracking-wide">
            Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
          </p>
        </div>
      </section>

      {/* WOOD GRID BACKGROUND */}
      <section
        className="flex-1 py-12 px-8 relative shadow-inner"
        style={{
          backgroundColor: '#4a3520',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 2px, transparent 2px)',
          backgroundSize: '120px 100%'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-10 inline-flex bg-[#4a3520]/80 pr-4 py-1 rounded">
            <div className="w-1.5 h-6 bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
            <h3 className="text-white font-bold text-lg tracking-wide">Now Available</h3>
          </div>

          <div className="flex flex-wrap gap-8">
            {books.map((book) => (
              <div 
                key={book.id} 
                onClick={() => setCheckoutOpen(true)}
                className="bg-white p-4 rounded-sm shadow-2xl w-[260px] flex flex-col items-center transition-transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="w-full bg-zinc-100 relative overflow-hidden border border-zinc-200 mb-4 flex items-center justify-center text-xs text-zinc-400 aspect-[3/4]">
                  <img 
                    src={book.src} 
                    alt={book.alt} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} 
                  />
                </div>
                <div className="text-yellow-400 text-xl tracking-widest pb-1">★★★★★</div>
              </div>
            ))}
            {/* The editing phase placeholder has been completely removed */}
          </div>
        </div>
      </section>

      {/* CHECKOUT SIDEBAR OVERLAY - Using fixed positioning so it floats over the UI */}
      {checkoutOpen && (
        <>
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity" 
            onClick={() => setCheckoutOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-[#3a2a18] text-white z-50 shadow-2xl flex flex-col border-l border-[#5c4428] animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#5c4428] flex justify-between items-center bg-[#2c1f11]">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-yellow-500 uppercase">Phoenix Publishing</span>
                <h2 className="text-xl font-bold uppercase tracking-wide mt-1">Sovereign Checkout</h2>
              </div>
              <button 
                onClick={() => setCheckoutOpen(false)} 
                className="text-zinc-400 hover:text-white bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full text-sm transition"
              >
                Close ✕
              </button>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-zinc-300 leading-relaxed mb-8">
                Navigate the landscape with ease. Step-by-step manual walks you through claiming benefits without the usual structural friction.
              </p>
              
              <div className="bg-black/20 p-4 rounded-lg mb-8 border border-black/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-sm">Selected Item</span>
                  <span className="font-medium text-white">eBook Guide</span>
                </div>
                <div className="border-t border-[#5c4428] my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-zinc-300">Total</span>
                  <span className="text-2xl font-bold text-yellow-500">R49.50</span>
                </div>
              </div>

              <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition shadow-[0_0_15px_rgba(255,255,255,0.1)] text-lg mt-auto">
                Generate EFT Invoice
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}