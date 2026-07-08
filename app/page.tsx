"use client";

import { useState } from "react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const books = [
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide" },
  ];

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden bg-white text-zinc-900">
      <div className="flex-1 flex overflow-hidden">
        {selectedBook && (
          <div className="w-1/3 min-w-[320px] max-w-[450px] border-r border-zinc-200 bg-zinc-50 p-8 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300 z-20 shadow-lg">
            <button
              onClick={() => setSelectedBook(null)}
              className="self-start text-xs bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-full hover:bg-zinc-200 transition mb-8"
            >
              ✕ Close Checkout
            </button>
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">PHOENIX PUBLISHING</p>
              <h2 className="text-2xl font-bold leading-tight uppercase">Sovereign Publication</h2>
              <p className="text-sm text-zinc-600">Navigate the landscape with ease. Step-by-step manual walks you through claiming benefits without the usual structural friction.</p>
              <div className="pt-6 mt-6 border-t border-zinc-200">
                <p className="text-2xl font-bold">R49.50</p>
                <button className="mt-6 w-full py-4 bg-zinc-900 text-white font-bold text-sm hover:bg-black transition-colors">
                  Generate EFT Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOGO DISPLAY MATRIX - Aligned Left */}
        <div className="flex-1 flex flex-col items-start justify-center p-12 relative z-10">
          <div
            className={`w-full flex justify-start transition-all duration-500 ease-out ${
              selectedBook ? 'max-w-[150px]' : 'max-w-lg'
            }`}
          >
            <img
              src="/phoenix-logo.svg"
              alt="Phoenix Publishing"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight uppercase">BOOK CORNER</h1>
            <p className="text-sm text-zinc-500 tracking-widest uppercase mt-1">SOVEREIGN CHECKOUT</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#4a80c2] text-center py-2.5 border-y border-[#3a6ba8] shrink-0 z-30 shadow-md">
        <h3 className="text-sm font-bold text-white mb-0.5">Specialist Educational Literature</h3>
        <p className="text-[10px] text-blue-100 uppercase tracking-wide">Expanding horizons through researched publications, technical guides, and specialized knowledge resources.</p>
      </div>

      <div className="h-[280px] bg-zinc-100 p-4 flex gap-4 overflow-x-auto border-t border-zinc-200 shrink-0 z-30">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book.id)}
            className={`cursor-pointer flex-shrink-0 w-40 lg:w-44 transition-all duration-300 hover:-translate-y-2 ${
              selectedBook === book.id ? 'ring-2 ring-[#4a80c2] shadow-xl scale-105' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden shadow border border-zinc-200 relative">
              <img
                src={book.src}
                alt={book.alt}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-[10px] text-zinc-400 absolute bottom-2 left-2 z-0 truncate w-[90%]">{book.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}