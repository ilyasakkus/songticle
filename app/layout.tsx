import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Songticle',
  description: 'Share your music stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-base-200">
          {children}
        </main>
      </body>
    </html>
  )
}
