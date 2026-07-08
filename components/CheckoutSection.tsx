'use client';

import React, { useState } from 'react';

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
}

export default function CheckoutSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceRef, setInvoiceRef] = useState<string>('');
  
  const cartItems: CheckoutItem[] = [
    { id: 'bk-01', title: 'Aviation Engineering Core Manual', price: 450.00 },
    { id: 'bk-02', title: 'Sovereign Architecture Principles', price: 350.00 }
  ];
  
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const triggerCheckoutPipeline = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, items: cartItems })
      });
      
      const data = await response.json();
      if (data.success) {
        setInvoiceRef(data.reference);
        setIsOpen(true);
      } else {
        alert('Sovereign pipeline execution error.');
      }
    } catch (err) {
      console.error('Pipeline connection failure:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100">
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">BOOK CORNER CHECKOUT</h2>
          <p className="text-xs text-zinc-400">Phoenix / AeroAfrica Sovereign Node</p>
        </div>
        <img 
          src={`/phoenix-logo.svg?v=${Date.now()}`} 
          alt="Phoenix Logo" 
          className="h-10 w-auto object-contain"
          onError={(e) => {
            console.error("SVG Asset missing or path invalid. Executing structural fallback.");
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="space-y-3 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm border-b border-zinc-800/50 pb-2">
            <span className="text-zinc-300">{item.title}</span>
            <span className="font-mono text-zinc-100">R {item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2 font-bold text-base text-white">
          <span>TOTAL DUE:</span>
          <span className="font-mono text-emerald-400">R {totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={triggerCheckoutPipeline}
        disabled={loading}
        className="w-full py-3 bg-white text-black font-semibold text-sm rounded hover:bg-zinc-200 transition-colors duration-150 tracking-wider uppercase disabled:bg-zinc-700 disabled:text-zinc-400"
      >
        {loading ? 'PROCESSING POPIA PIPELINE...' : 'GENERATE SOVEREIGN INVOICE'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 bg-zinc-950 border border-zinc-700 rounded-lg shadow-2xl relative">
            <h3 className="text-lg font-bold tracking-tight text-white mb-2">MANUAL EFT INVOICE ISSUED</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Please execute payment from your banking portal using the exact reference identifier below to clear compliance checks.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded p-4 space-y-3 font-mono text-xs text-zinc-300 mb-6">
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Bank:</span>
                <span className="text-white font-semibold">First National Bank (FNB)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Account Type:</span>
                <span className="text-white">Business Current</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Account Number:</span>
                <span className="text-white font-bold tracking-wider">62900011223</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Branch Code:</span>
                <span className="text-white">250655</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Amount:</span>
                <span className="text-emerald-400 font-bold text-sm">R {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex flex-col bg-zinc-950 p-2.5 border border-dashed border-zinc-700 rounded mt-2">
                <span className="text-zinc-500 mb-1 font-sans font-medium text-[11px]">REQUIRED REFERENCE:</span>
                <span className="text-amber-400 font-bold text-center text-sm tracking-widest bg-zinc-900 py-1 border border-zinc-800 rounded select-all">
                  {invoiceRef}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(invoiceRef);
                  alert('Reference copied to clipboard.');
                }}
                className="flex-1 py-2 bg-zinc-800 text-zinc-200 text-xs font-semibold rounded hover:bg-zinc-700 transition"
              >
                COPY REFERENCE
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 bg-zinc-100 text-black text-xs font-semibold rounded hover:bg-white transition"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}