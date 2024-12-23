import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Songticle',
  description: 'Share your favorite songs with stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
