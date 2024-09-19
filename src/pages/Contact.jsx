import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4">
          We'd love to hear from you! If you have any questions, suggestions, or just want to say hello, please don't hesitate to reach out.
        </p>
        <p className="mb-4">
          You can contact us at:
        </p>
        <p className="font-bold text-xl mb-4">
          <a href="mailto:info@songticle.com" className="text-blue-600 hover:underline">info@songticle.com</a>
        </p>
        <p>
          We aim to respond to all inquiries within 48 hours. Thank you for your interest in Songticle!
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;