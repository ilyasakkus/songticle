import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
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
      </body>
    </html>
  );
}
