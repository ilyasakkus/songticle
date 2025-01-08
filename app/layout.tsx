import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './providers/AuthProvider'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Songticle',
  description: 'Share your song stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-base-100">
            <Header />
            <div className="container mx-auto px-4">
              <div className="flex gap-6 pt-6">
                <Sidebar />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
