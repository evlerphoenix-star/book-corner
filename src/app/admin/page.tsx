import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded-lg p-6 bg-zinc-900">
        <h1 className="text-2xl font-bold tracking-tight mb-2 uppercase">AeroAfrica / Phoenix Admin Node</h1>
        <div className="h-px w-full bg-zinc-800 mb-6"></div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded font-mono text-xs text-zinc-400">
          <p className="text-emerald-400 mb-2">&gt; SYSTEM STATUS: ONLINE</p>
          <p>&gt; Telemetry modules unlinked.</p>
          <p>&gt; Structural component mounted to satisfy strict Next.js compilation.</p>
        </div>
      </div>
    </div>
  );
}