"use client";

import { useState } from "react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // Verified asset registry
  const books = [
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide" },
  ];

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden bg-black">
      <div className="flex-1 flex overflow-hidden">
        {selectedBook && (
          <div className="w-1/3 min-w-[320px] max-w-[450px] border-r border-zinc-800 bg-black p-8 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300 z-20">
            <button
              onClick={() => setSelectedBook(null)}
              className="self-start text-xs bg-zinc-800 text-white px-3 py-1.5 rounded-full hover:bg-zinc-700 transition mb-8"
            >
              ✕ Close Checkout
            </button>
            <div className="text-white space-y-4">
              <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">PHOENIX PUBLISHING</p>
              <h2 className="text-2xl font-bold leading-tight uppercase">Sovereign Publication</h2>
              <p className="text-sm text-zinc-400">Navigate the landscape with ease. Step-by-step manual walks you through claiming benefits without the usual structural friction.</p>
              <div className="pt-6 mt-6 border-t border-zinc-800">
                <p className="text-2xl font-bold">R49.50</p>
                <button className="mt-6 w-full py-4 bg-zinc-200 text-black font-bold text-sm hover:bg-white transition-colors">
                  Generate EFT Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
          <div
            className={`w-full mx-auto flex justify-center transition-all duration-500 ease-out ${
              selectedBook ? 'max-w-[200px] py-2' : 'max-w-lg md:max-w-xl py-8'
            }`}
          >
            <img
              src="/phoenix-logo.svg"
              alt="Phoenix Publishing"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white mb-1">BOOK CORNER</h1>
            <p className="text-[10px] text-zinc-400 tracking-widest uppercase">SOVEREIGN CHECKOUT</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#4a80c2] text-center py-2.5 border-y border-[#3a6ba8] shrink-0 z-30 shadow-md">
        <h3 className="text-sm font-bold text-white mb-0.5">Specialist Educational Literature</h3>
        <p className="text-[10px] text-zinc-100 uppercase tracking-wide">Expanding horizons through researched publications, technical guides, and specialized knowledge resources.</p>
      </div>

      <div className="h-[280px] bg-[#3a2e24] p-4 flex gap-4 overflow-x-auto border-t border-zinc-900 shrink-0 shadow-inner z-30">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book.id)}
            className={`cursor-pointer flex-shrink-0 w-40 lg:w-44 transition-all duration-300 hover:-translate-y-2 ${
              selectedBook === book.id ? 'ring-4 ring-[#4a80c2] shadow-2xl scale-105' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden shadow-lg border border-black relative">
              <img
                src={book.src}
                alt={book.alt}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.jpg"; // Fallback to prevent red breaks
                }}
              />
              <span className="text-[10px] text-zinc-500 absolute bottom-2 left-2 z-0 truncate w-[90%]">{book.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}