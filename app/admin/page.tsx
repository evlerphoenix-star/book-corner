'use client';

import { useState } from 'react';

export default function AdminUploadPortal() {
  const [status, setStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setStatus('Uploading to server...');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(`✅ Success: ${result.message}`);
        (e.target as HTMLFormElement).reset(); 
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      setStatus('❌ Critical Error: Could not connect to the server.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl text-white">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">Book Corner | Admin Portal</h1>
      <p className="mb-8 text-zinc-400">Upload a new eBook to the shelf. Do not close the window until you see the success message.</p>
      
      <form onSubmit={handleUpload} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium mb-2">Book Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g. The Quantum Horizon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Cover Image (JPG/PNG)</label>
          <input 
            type="file" 
            name="cover" 
            accept="image/*" 
            required 
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload eBook File (PDF)</label>
          <input 
            type="file" 
            name="pdf" 
            accept=".pdf" 
            required 
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer text-zinc-400"
          />
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className={`w-full py-3 mt-4 rounded font-bold text-white transition-all ${isUploading ? 'bg-zinc-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'}`}
        >
          {isUploading ? 'Processing Upload...' : 'Publish to Shelf'}
        </button>
        
        {status && (
          <div className={`mt-4 p-4 rounded text-sm font-medium ${status.includes('✅') ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-800' : 'bg-red-900/50 text-red-300 border border-red-800'}`}>
            {status}
          </div>
        )}

      </form>
    </div>
  );
}