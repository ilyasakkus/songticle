export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          Welcome to Songticle. By accessing or using our website, you agree to be bound by these Terms and Conditions.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Songticle, you acknowledge that you have read, understood, and agree to be bound by these terms.
          If you do not agree with any part of these terms, you must not use our service.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          To access certain features of Songticle, you may need to create an account. You are responsible for:
        </p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized use</li>
        </ul>

        <h2>3. Content Guidelines</h2>
        <p>
          When sharing content on Songticle, you agree not to post:
        </p>
        <ul>
          <li>Content that violates intellectual property rights</li>
          <li>Harmful, threatening, or harassing content</li>
          <li>False or misleading information</li>
          <li>Spam or unauthorized commercial content</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content and materials available on Songticle, including but not limited to text, graphics, logos, 
          button icons, images, audio clips, and software, are the property of Songticle or its content suppliers 
          and are protected by copyright laws.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, 
          and protect your personal information.
        </p>

        <h2>6. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any material changes 
          via email or through our website. Your continued use of Songticle after such modifications constitutes 
          your acceptance of the updated terms.
        </p>

        <h2>7. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to Songticle at our sole discretion, 
          without notice, for conduct that we believe violates these terms or is harmful to other users, us, 
          or third parties, or for any other reason.
        </p>

        <h2>8. Contact</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at{' '}
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