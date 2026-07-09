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
    } catch (error) { alert("Error."); console.error(error); } 
    finally { setIsProcessing(false); }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <header className="p-6 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">LIVE-TEST-V2</h1>
        <button onClick={() => setIsCartOpen(true)} className="bg-slate-100 px-4 py-2 rounded">Cart ({cart.length})</button>
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {BOOKS.map((book) => (
            <div key={book.id} onClick={() => addToCart(book)} className="cursor-pointer border p-4 rounded hover:shadow-lg transition-shadow">
                <h3 className="font-bold">{book.title}</h3>
                <p className="text-sm text-slate-500">{book.author}</p>
                <p className="font-bold mt-2">{book.price} rand</p>
            </div>
        ))}
      </main>
      
      {mounted && isCartOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-end bg-black/50">
            <div className="w-full max-w-md bg-white h-full p-6">
                <h2 className="text-xl font-bold mb-4">Your Basket</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                    <input required type="text" placeholder="Full Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full p-2 border" />
                    <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" />
                    <input required type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
                    <button type="submit" className="w-full bg-orange-600 text-white p-3">Complete Order</button>
                    <button type="button" onClick={() => setIsCartOpen(false)} className="w-full border p-2">Close</button>
                </form>
            </div>
        </div>, document.body
      )}
    </div>
  );
}