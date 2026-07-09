import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <aside className="w-64 bg-neutral-950 text-white p-6">
        <h2 className="text-xl font-bold mb-8 text-neutral-100">Admin Portal</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block p-2 hover:bg-neutral-800 rounded transition">Dashboard</Link>
          <Link href="/admin/inventory" className="block p-2 hover:bg-neutral-800 rounded transition">Inventory</Link>
          <Link href="/admin/orders" className="block p-2 hover:bg-neutral-800 rounded transition">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}