import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import './globals.css'
import { SupabaseProvider } from './providers/SupabaseProvider'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Songticle',
  description: 'Share your favorite songs with stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className={inter.className}>
        <SupabaseProvider>
          <Toaster />
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <ThemeProvider>
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </ThemeProvider>
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
