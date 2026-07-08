'use client';

import React, { useState } from 'react';

// --- DATA TYPES ---
interface Book {
  id: string;
  title: string;
  desc: string;
  price: number;
  imgSrc: string;
  status: 'available' | 'editing';
}

interface EftDetails {
  ref: string;
  book: Book;
}

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [eftDetails, setEftDetails] = useState<EftDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // --- DATABASE DATA ---
  const books: Book[] = [
    {
      id: 'before-you-accept',
      title: 'Before You Accept: Basic Tax Check',
      desc: 'Essential pre-submission validation protocols to ensure your tax data is structurally sound before SARS locks the assessment. Avoid automated penalties through rigorous verification.',
      price: 250,
      imgSrc: '/before-you-accept.jpg',
      status: 'available',
    },
    {
      id: 'filing-system',
      title: 'The SARS Audit-Ready Filing System',
      desc: 'Construct a bulletproof document architecture. Learn how to organize and retain your financial data to survive rigorous SARS validation loops completely clean.',
      price: 250,
      imgSrc: '/filing-system.jpg',
      status: 'available',
    },
    {
      id: 'missing-link',
      title: 'The Missing Link in Your Tax Claim',
      desc: 'Identify and secure the critical supporting documents for individual taxpayers that frequently trigger automated rejections. Close the gaps in your submission matrix.',
      price: 250,
      imgSrc: '/missing-link.jpg',
      status: 'available',
    },
    {
      id: 'disability-tax',
      title: 'Disability Tax Benefits (ITR-DD)',
      desc: 'The definitive execution guide for navigating complex SARS disability claims. Maximize asset retention legally and guarantee structural compliance across all submissions.',
      price: 450,
      imgSrc: '/disability-tax.jpg',
      status: 'available',
    },
    {
      id: 'uif-guide',
      title: 'The UIF Survival Guide',
      desc: 'Navigate the UIF landscape with ease. This step-by-step manual walks you through claiming unemployment benefits in ZA without the usual structural friction.',
      price: 250,
      imgSrc: '/uif-guide.jpg',
      status: 'available',
    }
  ];

  // --- LOGIC ---
  const openModal = (book: Book) => {
    setSelectedBook(book);
    setEftDetails(null);
  };
  
  const closeModal = () => {
    setSelectedBook(null);
    setEftDetails(null);
  };
  
  const handleGenerateInvoice = () => {
    if (!selectedBook) return;
    setIsProcessing(true);

    // 1. Generate Sovereign Cryptographic Reference
    const orderRef = `PHX-BC-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Fire-and-Forget Database Payload (Non-blocking if Supabase is down)
    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        book_id: selectedBook.id,
        book_title: selectedBook.title,
        price: selectedBook.price,
        reference: orderRef
      })
    }).catch(error => {
      console.warn("Database telemetry unreachable. Proceeding with local invoice generation.", error);
    });

    // 3. Morph UI instantly
    setTimeout(() => {
      setIsProcessing(false);
      setEftDetails({ ref: orderRef, book: selectedBook });
    }, 600); 
  };

  // --- SVG ICONS ---
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  );

  return (
    <main className="min-h-screen flex flex-col font-sans w-full overflow-x-hidden bg-gray-100 relative selection:bg-blue-500 selection:text-white">
      
      {/* HEADER SECTION */}
      <header className="bg-white flex flex-col md:flex-row justify-between items-center px-6 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-48 md:w-64 flex items-center justify-start">
             {/* SCALABLE VECTOR LOGO INJECTION */}
             <img 
               src="/phoenix-logo.svg" 
               alt="Phoenix Logo" 
               className="w-full h-auto object-contain" 
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
          </div>
        </div>

        <div className="flex-grow text-center flex justify-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">BOOK CORNER</h1>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="px-4 py-2 flex items-center space-x-3">
            <span className="text-xs font-bold tracking-tight text-gray-400 uppercase">Sovereign Checkout</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-[#3b7ac1] w-full py-16 px-8 relative flex flex-col items-center justify-center text-center shadow-inner">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-wide shadow-black drop-shadow-md">
          Specialist Educational Literature
        </h2>
        <p className="text-white text-lg md:text-xl italic font-light max-w-3xl drop-shadow-md px-4">
          Expanding horizons through researched publications, technical guides, and specialized knowledge resources.
        </p>
      </section>

      {/* MAIN CONTENT / BOOK GRID */}
      <section 
        className="flex-grow w-full py-12 px-6 md:px-12 min-h-[600px] border-t-4 border-amber-600"
        style={{
          backgroundColor: '#4a3320',
          backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.4) 2px, transparent 2px)',
          backgroundSize: '8.33vw 100%'
        }}
      >
        <div className="flex items-center mb-8 pl-2">
          <div className="w-1.5 h-6 bg-yellow-500 mr-3 shadow-sm"></div>
          <h3 className="text-white text-xl font-bold tracking-wider drop-shadow-md">Now Available</h3>
        </div>

        <div className="flex flex-wrap gap-8 items-start">
          {books.map((book) => (
            <div 
              key={book.id}
              onClick={() => openModal(book)} 
              className="w-[240px] bg-white rounded-md shadow-2xl overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-400"
            >
              <div className="h-[340px] w-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
                <img src={book.imgSrc} alt={book.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('bg-slate-800'); }} />
                <span className="absolute text-gray-400 text-xs font-mono drop-shadow-md z-[-1] text-center px-4">{book.title}</span>
              </div>
              <div className="p-3 bg-white flex space-x-1 justify-center border-t border-gray-100">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC OVERLAY MODAL */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative scale-100 animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* LEFT COLUMN: IMAGE */}
            <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col items-center justify-center relative min-h-[300px] border-r border-gray-200">
              <img src={selectedBook.imgSrc} alt={selectedBook.title} className="max-h-[350px] w-auto shadow-xl object-contain rounded mb-4" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>

            {/* RIGHT COLUMN: DYNAMIC CONTENT (Details OR Invoice) */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
              
              {!eftDetails ? (
                // STATE 1: BOOK DETAILS
                <>
                  <div className="uppercase tracking-widest text-xs font-bold text-blue-600 mb-2">Phoenix Publishing</div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 text-gray-900 leading-tight">{selectedBook.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">{selectedBook.desc}</p>
                  
                  <div className="mt-auto space-y-3">
                    <button 
                      onClick={handleGenerateInvoice}
                      disabled={isProcessing}
                      className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Securing Reference...' : `Generate EFT Invoice • R ${selectedBook.price}`}
                    </button>
                  </div>
                </>
              ) : (
                // STATE 2: EFT INVOICE
                <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                  <div className="uppercase tracking-widest text-xs font-bold text-green-600 mb-2">Secure Checkout Initiated</div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">Payment Instructions</h3>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
                    <p className="text-sm text-gray-700">Please complete an EFT for <strong className="text-black text-lg">R {eftDetails.book.price}</strong> using the details below.</p>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Bank:</span> <span className="font-bold text-gray-900">FNB</span></div>
                      <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Account Name:</span> <span className="font-bold text-gray-900">Phoenix Disability Tax</span></div>
                      <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Account No:</span> <span className="font-bold text-gray-900">62XXXXXXXXX</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Branch Code:</span> <span className="font-bold text-gray-900">250655</span></div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-4">
                      <p className="text-xs text-yellow-800 font-bold mb-1 uppercase tracking-wide">Critical: Payment Reference</p>
                      <p className="font-mono text-lg text-black font-black text-center bg-white border border-yellow-300 py-1 rounded">{eftDetails.ref}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-6 text-center">
                    Email your proof of payment to <strong className="text-gray-700">michelle@phoenix.co.za</strong>. Your eBook will be dispatched immediately upon clearance.
                  </p>

                  <div className="mt-auto">
                    <button 
                      onClick={closeModal}
                      className="block w-full text-center border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Close & Complete Later
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}
    </main>
  );
}