;
 
import { useState } from "react";
 
export default function Home() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
 
  // Structural mapping for your publications
  // Ensure these exact filenames exist in your /public directory
  const books = [
    { id: "before-you-accept", src: "/before-you-accept.jpg", alt: "Before You Accept" },
    { id: "sars-guide", src: "/filing-system.jpg", alt: "SARS Audit-Ready" },
    { id: "missing-link", src: "/missing-link.jpg", alt: "Missing Link" },
    { id: "disability-tax", src: "/disability-tax.jpg", alt: "Disability Tax Benefits" },
    { id: "uif-guide", src: "/uif-guide.jpg", alt: "UIF Survival Guide" },
  ];
 
  const activeBook = books.find((b) => b.id === selectedBook);
 
  return (
    <main className="min-h-screen w-full flex flex-col bg-white">
      {/* HEADER: logo left, title center */}
      <header className="bg-white flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b border-zinc-200 gap-4 md:gap-0">
        <img
          src="/phoenix-logo.svg"
          alt="Phoenix Publishing"
          className="h-16 md:h-20 w-auto object-contain"
          onError={(e) => {
            console.error("Logo failed to load:", e);
          }}
        />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-zinc-900">BOOK CORNER</h1>
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">SOVEREIGN CHECKOUT</p>
        </div>
        {/* spacer so the title sits roughly centered against the logo on desktop */}
        <div className="hidden md:block w-16 md:w-20" />
      </header>
 
      {/* HERO / BLUE BANNER */}
      <section className="w-full bg-[#4a80c2] text-center py-8 px-6 border-y border-[#3a6ba8] shadow-md">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-wide">
          Specialist Educational Literature
        </h2>
        <p className="text-zinc-100 text-sm md:text-base max-w-2xl mx-auto">
          Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
        </p>
      </section>
 
      {/* BOOK GRID - wood panel background */}
      <section
        className="flex-1 w-full py-10 px-6 md:px-12"
        style={{
          backgroundColor: "#4a3320",
          backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.4) 2px, transparent 2px)",
          backgroundSize: "8.33vw 100%",
        }}
      >
        <div className="flex items-center mb-8 pl-1">
          <div className="w-1.5 h-6 bg-yellow-500 mr-3" />
          <h3 className="text-white text-xl font-bold tracking-wider">Now Available</h3>
        </div>
 
        <div className="flex flex-wrap gap-8 items-start justify-center md:justify-start">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book.id)}
              className="w-[220px] bg-white rounded-md shadow-2xl overflow-hidden flex flex-col cursor-pointer transition-transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-400"
            >
              <div className="h-[300px] w-full bg-zinc-100 overflow-hidden">
                <img
                  src={book.src}
                  alt={book.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Asset failed: ${book.src}`);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* BOOK DETAILS MODAL */}
      {activeBook && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black bg-white rounded-full w-8 h-8 flex items-center justify-center z-10 border border-zinc-200 transition-colors"
            >
              ✕
            </button>
 
            <div className="w-full md:w-1/2 bg-zinc-100 p-8 flex items-center justify-center">
              <img
                src={activeBook.src}
                alt={activeBook.alt}
                className="max-h-[400px] w-auto shadow-xl object-contain rounded"
              />
            </div>
 
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-2">Phoenix Publishing</p>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-zinc-900 leading-tight">{activeBook.alt}</h2>
              <p className="text-zinc-600 mb-8 leading-relaxed text-sm">
                Navigate the landscape with ease. Step-by-step manual walks you through claiming benefits without the usual structural friction.
              </p>
              <div className="mt-auto space-y-3">
                <p className="text-2xl font-bold text-zinc-900 mb-2">R49.50</p>
                <button className="w-full py-3 bg-zinc-900 text-white font-bold text-sm rounded-lg hover:bg-zinc-800 transition-colors">
                  Generate EFT Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
 