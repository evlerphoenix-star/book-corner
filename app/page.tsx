"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../utils/supabase";

const BOOKS = [
  { id: 1, title: "Navigating Sec 18(1)(b)", author: "Phoenix Tax", price: 450, color: "bg-slate-800" },
  { id: 2, title: "The AETHYR Principles", author: "Adrien Scott", price: 320, color: "bg-indigo-900" },
  { id: 3, title: "Cognitive Guardians", author: "Phoenix Edu", price: 280, color: "bg-emerald-900" },
  { id: 4, title: "Diagnostic Sales Framework", author: "Adrien Scott", price: 550, color: "bg-red-900" },
  { id: 5, title: "Flat Earth & Curricula", author: "Research Div", price: 150, color: "bg-amber-900" },
  { id: 6, title: "Predatory Manipulation", author: "Psych Core", price: 390, color: "bg-zinc-800" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const addToCart = (book: any) => {
    setCart((prev) => [...prev, book]);
    setIsCartOpen(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!buyerName || !email || !phone) {
        alert("Please complete all contact fields.");
        return;
    }
    
    setIsProcessing(true);
    try {
      const orders = cart.map(item => ({
        book_id: item.id.toString(),
        book_title: item.title,
        price: item.price,
        status: 'pending',
        buyer_name: buyerName,
        email_address: email,
        contact_number: phone
      }));
      const { error } = await supabase.from('orders').insert(orders);
      if (error) throw error;
      alert("Order placed successfully!");
      setCart([]); 
      setIsCartOpen(false);
      setBuyerName(""); setEmail(""); setPhone("");
    } catch (error) {
      console.error("Supabase Error:", error);
      alert("Database error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const CartModal = () => (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="p-6 border-b border-slate-100 flex justify-between">
          <h2 className="text-xl font-bold">Your Basket</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-sm font-bold text-slate-500 hover:text-black">Close</button>
        </div>
        <form onSubmit={handleCheckout} className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? <p className="text-slate-400">Shelf is empty.</p> : (
            <>
                <ul className="space-y-2">{cart.map((item, i) => (
                <li key={i} className="flex justify-between p-3 bg-slate-50 rounded-lg text-sm">
                    <span>{item.title}</span>
                    <span>{item.price} rand</span>
                </li>
                ))}</ul>
                <div className="pt-4 space-y-3 border-t">
                <input required type="text" placeholder="Full Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="tel" placeholder="Contact Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
                </div>
            </>
          )}
          <button type="submit" disabled={cart.length === 0 || isProcessing} className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold mt-4">
            {isProcessing ? 'Processing...' : 'Complete Order'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col relative">
      <header className="w-full bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-14 w-14 rounded overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center bg-white">
              <img src="/logo-2-blue-s.png" alt="Logo" className="object-cover h-full w-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Phoenix Publishing</h1>
              <span className="text-xs font-semibold text-orange-600 uppercase">Book Corner</span>
            </div>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOOKS.map((book) => (
                <div key={book.id} onClick={() => addToCart(book)} className="cursor-pointer bg-white p-6 rounded shadow border hover:border-orange-500 transition-all">
                    <h3 className="font-bold text-lg">{book.title}</h3>
                    <p className="text-sm text-slate-500">{book.author}</p>
                    <p className="font-bold mt-2">{book.price} rand</p>
                </div>
            ))}
        </div>
      </main>
      {mounted && isCartOpen && createPortal(<CartModal />, document.body)}
    </div>
  );
}