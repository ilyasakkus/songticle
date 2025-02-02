import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { AuthProvider } from './providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://songticle.com'),
  title: {
    default: 'Songticle - Share Your Music Stories and Discover New Songs',
    template: '%s | Songticle'
  },
  description: 'Join Songticle to share your personal music stories, discover new songs through others\' experiences, and connect with music lovers worldwide. Create, read, and engage with unique musical narratives.',
  keywords: 'music stories, song sharing, music community, music discovery, personal music experiences, songticle, music social platform',
  openGraph: {
    title: 'Songticle - Share Your Music Stories and Discover New Songs',
    description: 'Join Songticle to share your personal music stories, discover new songs through others\' experiences, and connect with music lovers worldwide.',
    url: 'https://songticle.com',
    siteName: 'Songticle',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Songticle - Share Your Music Stories'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Songticle - Share Your Music Stories and Discover New Songs',
    description: 'Share your personal music stories, discover new songs through others\' experiences, and connect with music lovers worldwide.',
    creator: '@songticle',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://songticle.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              <main className="flex-1 bg-base-200 p-4">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
