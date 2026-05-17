import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Next feature section will sit here */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Grid Component will go here */}
      </main>
    </div>
  );
}

export default App;