'use client';

import React from 'react';
import SimpleTianzige from '@/components/tianzige/SimpleTianzige';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">汉字笔画学习</h1>
        
        <div className="max-w-2xl mx-auto">
          <SimpleTianzige size={400} />
        </div>
      </div>
    </main>
  );
}
