import React from 'react';
import MusicMaker from './MusicMaker';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <MusicMaker />
      </div>
      <Footer />
    </div>
  );
};

export default Index;