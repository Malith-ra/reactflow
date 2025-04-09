import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Studio',
  description: 'AI Studio Proof of Concept',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-900">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-white text-2xl">AI Studio</h2>
            <div className="flex gap-4">
              <Link href="/">
                <button
                  type="button"
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
                >
                  Home
                </button>
              </Link>
              <Link href="/drag-and-drop">
                <button
                  type="button"
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
                >
                  Drag and Drop
                </button>
              </Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
