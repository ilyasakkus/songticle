import { Mail, Github, Linkedin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          Have questions, suggestions, or just want to say hello? We'd love to hear from you! 
          Here are the ways you can reach us:
        </p>

        <div className="not-prose">
          <div className="grid gap-6 mt-8">
            {/* Email */}
            <a 
              href="mailto:contact@songticle.com"
              className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
            >
              <Mail className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-base-content/70">contact@songticle.com</p>
              </div>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/ilyassakkus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
            >
              <Github className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-base-content/70">@ilyassakkus</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/ilyasakkus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <p className="text-base-content/70">İlyas Akkuş</p>
              </div>
            </a>
          </div>
        </div>

        <h2 className="mt-8">Response Time</h2>
        <p>
          We aim to respond to all inquiries within 24-48 hours during business days. 
          For urgent matters, please reach out via email with "URGENT" in the subject line.
        </p>
      </div>
    </div>
  )
} 