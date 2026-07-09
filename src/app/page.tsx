'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const [stats, setStats] = useState({ totalBooks: 0, totalOrders: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { count: bookCount } = await supabase.from('books').select('*', { count: 'exact', head: true });
      const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      
      setStats({
        totalBooks: bookCount || 0,
        totalOrders: orderCount || 0,
      });
    }
    fetchData();
  }, [supabase]);

  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Book Corner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-gray-500 text-sm uppercase">Total Inventory</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalBooks}</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-gray-500 text-sm uppercase">Total Orders</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
      </div>
    </main>
  );
}