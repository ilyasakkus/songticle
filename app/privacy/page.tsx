export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          At Songticle, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, and protect your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>Account information (email, name, profile picture)</li>
          <li>Usage data (interactions, preferences, activity logs)</li>
          <li>Device information (browser type, IP address)</li>
          <li>User-generated content (stories, comments, likes)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about updates and features</li>
          <li>Ensure platform security and prevent abuse</li>
          <li>Analyze usage patterns to improve our service</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information in the following circumstances:
        </p>
        <ul>
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and safety</li>
          <li>With service providers who assist in our operations</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information. 
          However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Export your data</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience, understand usage patterns, 
          and provide more personalized service. You can control cookie settings through your browser preferences.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly collect personal information 
          from children under 13. If you become aware that a child has provided us with personal information, 
          please contact us.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
          the new Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:contact@songticle.com" className="text-primary hover:underline">
            contact@songticle.com
          </a>
        </p>

        <div className="mt-8 p-4 bg-base-200 rounded-lg">
          <p className="text-sm text-base-content/70">
            Last updated: January 2024
          </p>
        </div>
      </div>
    </div>
  )
} 