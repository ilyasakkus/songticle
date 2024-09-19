import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Songticle</h1>
        <p className="mb-4">
          Welcome to Songticle, your ultimate destination for music listicles and artist spotlights. We're passionate about celebrating the rich tapestry of music history and contemporary hits.
        </p>
        <p className="mb-4">
          At Songticle, we curate top 10 lists of songs from legendary artists, spanning various genres and eras. Our mission is to help music lovers discover classic hits, hidden gems, and the stories behind their favorite songs.
        </p>
        <p className="mb-4">
          Whether you're a casual listener or a die-hard music aficionado, Songticle offers a unique perspective on the world's most influential artists and their greatest works. Dive into our carefully crafted lists, explore new artists, and rediscover timeless classics.
        </p>
        <p>
          Join us on this musical journey as we celebrate the power of song and the artists who shape our cultural landscape. Songticle - Where Every List Tells a Musical Story.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;