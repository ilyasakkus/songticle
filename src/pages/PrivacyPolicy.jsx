import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">
          At Songticle, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We do not collect any personal information from you when you visit our website unless you choose to provide it to us voluntarily, such as when contacting us via email.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          If you contact us, we will use your information to respond to your inquiry and to improve our website and services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Cookies and Analytics</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. We may use third-party services such as Google Analytics to analyze the use of our website.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@songticle.com" className="text-blue-600 hover:underline">info@songticle.com</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;