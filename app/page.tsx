"use client";

import React, { useState } from 'react';
import { ShoppingCart, BookOpen, QrCode } from 'lucide-react';

export default function BookCornerShop() {
  const [cart, setCart] = useState<{id: string, title: string, price: number, cover: string}[]>([]);
  const [checkoutStep, setCheckoutStep] = useState('shop'); 
  const [orderRef, setOrderRef] = useState('');

  const products = [
    {
      id: 'p1',
      title: 'Disability Tax Mastery (ITR-DD)',
      price: 450,
      cover: 'bg-orange-600',
    },
    {
      id: 'p2',
      title: 'Phoenix Audit Readiness',
      price: 300,
      cover: 'bg-amber-500',
    }
  ];

  const addToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); // Stops any accidental page refresh
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cart.length > 0) {
      setCheckoutStep('checkout');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const mockEmail = "client@example.com"; 
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: mockEmail,
          productName: cart.map(i => i.title).join(', '),
          amount: cartTotal
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setOrderRef(data.reference);
        setCheckoutStep('payment');
      }
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-600 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-slate-100">BOOK <span className="text-orange-500">CORNER</span></h1>
        </div>
        
        <button 
          type="button"
          onClick={handleCartClick}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition-colors relative"
        >
          <ShoppingCart className="w-5 h-5 text-orange-500" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-6xl mx-auto">
        
        {checkoutStep === 'shop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all group">
                <div className={`h-48 w-full ${product.cover} flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity`}>
                  <BookOpen className="w-16 h-16 text-white/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-6 h-10">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">{product.price} rand</span>
                    <button 
                      type="button"
                      onClick={(e) => addToCart(e, product)}
                      disabled={cart.some(item => item.id === product.id)}
                      className="px-4 py-2 bg-slate-800 text-slate-200 rounded-md hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cart.some(item => item.id === product.id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {checkoutStep === 'checkout' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 border-b border-slate-800 pb-4">Checkout</h2>
            
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800/50">
                  <div>
                    <h4 className="font-bold text-slate-200">{item.title}</h4>
                    <button type="button" onClick={(e) => removeFromCart(e, item.id)} className="text-red-500 text-sm hover:underline mt-1">Remove</button>
                  </div>
                  <span className="font-bold">{item.price} rand</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xl font-bold mb-8">
              <span>Total:</span>
              <span className="text-orange-500">{cartTotal} rand</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setCheckoutStep('shop')}
                className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-bold"
              >
                Back to Shop
              </button>
              <button 
                type="button"
                onClick={handleCheckout}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors font-bold shadow-lg shadow-orange-900/20"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {checkoutStep === 'payment' && (
          <div className="max-w-xl mx-auto text-center bg-slate-900 border border-slate-800 rounded-xl p-8">
            <div className="flex justify-center mb-6">
              <QrCode className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-100">Complete Your Payment</h2>
            
            <div className="bg-slate-950 p-6 rounded-lg border border-orange-500/30 mb-8">
              <p className="text-slate-400 mb-2">Total Due:</p>
              <p className="text-3xl font-bold text-orange-500 mb-6">{cartTotal} rand</p>
              
              <p className="text-slate-400 mb-2">Payment Reference (CRITICAL):</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest bg-slate-800 py-3 rounded-md">
                {orderRef || 'BC-XXXX'}
              </p>
            </div>

            <div className="text-left space-y-4 text-slate-300 mb-8">
              <p>1. Open your banking app.</p>
              <p>2. Scan the QR Code below (or transfer manually).</p>
              <p>3. Use the exact reference <strong>{orderRef}</strong>.</p>
              <p className="text-sm text-slate-500 mt-4">
                Your secure PDF download link will be emailed to you automatically within minutes of the transfer clearing.
              </p>
            </div>

            <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center rounded-lg mb-8">
              <span className="text-slate-800 font-bold text-center px-4">[INSERT FNB QR IMAGE HERE]</span>
            </div>

            <button 
              type="button"
              onClick={() => setCheckoutStep('shop')}
              className="text-slate-400 hover:text-white underline transition-colors"
            >
              Cancel Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
}