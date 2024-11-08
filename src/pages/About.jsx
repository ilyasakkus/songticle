import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Music Maker Lab</h1>
        <p className="mb-4">
          Welcome to Music Maker Lab, your creative space for digital music production. Our online platform provides an intuitive and powerful environment for musicians, producers, and enthusiasts to create, experiment, and bring their musical ideas to life.
        </p>
        <p className="mb-4">
          With our state-of-the-art digital audio workstation, you can compose music using a variety of virtual instruments, create beats with our step sequencer, and mix your tracks in real-time. Whether you're a beginner or an experienced producer, our tools are designed to be both accessible and powerful.
        </p>
        <p className="mb-4">
          Our platform features multiple synthesizers, drum machines, and effects processors that you can use to craft your unique sound. The intuitive grid-based interface makes it easy to compose melodies and rhythms, while our mixing tools help you achieve professional-quality results.
        </p>
        <p>
          Join our community of music creators and start making music today. Music Maker Lab - Where Creativity Meets Technology.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;