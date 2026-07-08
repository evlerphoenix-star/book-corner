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
    <main className="min-h-screen font-sans flex flex-col bg-[#4a3520] relative">
      
      {}
      <header className="bg-white w-full px-6 py-4 flex items-center justify-between border-b border-zinc-200 z-20 shrink-0 shadow-sm relative">
        <div className="flex items-center w-1/3">
          <img
            src="/phoenix-logo.svg"
            alt="Phoenix Logo"
            style={{ height: '100px', width: 'auto', maxWidth: '350px', objectFit: 'contain' }} 
          />
        </div>

        <div className="flex items-center justify-center w-1/3 text-black font-semibold text-lg tracking-wide">
          Book Corner
        </div>

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

      {}
      <section className="bg-[#3170a7] text-white py-12 px-6 relative z-10 shadow-md shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3 drop-shadow-sm tracking-wide">
            Specialist Educational Literature
          </h2>
          <p className="opacity-90 text-sm italic font-light tracking-wide">
            Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
          </p>
        </div>
      </section>

      {}
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
                className="bg-white p-4 rounded-sm shadow-2xl w-[260px] h-[360px] flex flex-col items-center transition-transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="w-full h-full bg-zinc-100 relative overflow-hidden border border-zinc-200 mb-4 flex items-center justify-center text-xs text-zinc-400">
                  <img 
                    src={book.src} 
                    alt={book.alt} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} 
                  />
                </div>
                <div className="text-yellow-400 text-xl tracking-widest pb-2">★★★★★</div>
              </div>
            ))}

            <div className="border-2 border-dashed border-zinc-400/30 bg-[#4a3520]/40 w-[260px] h-[360px] flex flex-col items-center justify-end pb-6 text-zinc-400 relative shadow-lg">
               <div className="absolute inset-0 flex items-center justify-center transform -rotate-45 font-bold tracking-widest text-2xl opacity-30">
                 EDITING PHASE
               </div>
               <div className="text-xl tracking-widest opacity-30 relative z-10">☆☆☆☆☆</div>
            </div>
          </div>
        </div>
      </section>

      {}
      {checkoutOpen && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-zinc-950 text-white z-50 shadow-2xl flex flex-col border-l border-zinc-800 animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Phoenix Publishing</span>
              <h2 className="text-xl font-bold uppercase tracking-wide mt-1">Sovereign Checkout</h2>
            </div>
            <button 
              onClick={() => setCheckoutOpen(false)} 
              className="text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1 rounded-full text-sm transition"
            >
              Close ✕
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-sm text-zinc-300 leading-relaxed mb-8">
              Navigate the landscape with ease. Step-by-step manual walks you through claiming benefits without the usual structural friction.
            </p>
            <div className="border-t border-b border-zinc-800 py-4 mb-8 flex justify-between items-center">
              <span className="font-medium text-zinc-300">Total</span>
              <span className="text-xl font-bold text-white">R49.50</span>
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded hover:bg-zinc-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Generate EFT Invoice
            </button>
          </div>
        </div>
      )}
    </main>
  );
}