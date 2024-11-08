import React from 'react';
import MusicMaker from './MusicMaker';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <MusicMaker />
      </div>
      <Footer />
    </div>
  );
};

export default Index;