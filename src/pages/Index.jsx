import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicMaker from './MusicMaker';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Songticle Beat Maker</h1>
          <MusicMaker />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;