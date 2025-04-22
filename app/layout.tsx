import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ClientReduxProvider from '@/common/ui/components/client/ClientReduxProvider';
import ClearButton from '@/components/ClearButton/ClearButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Arimac AI studio',
  description:
    'AI Studio – Build, manage, and deploy your AI agents seamlessly.',
  keywords: [
    'AI Studio',
    'AI Agent Builder',
    'AI Dashboard',
    'AI Workflow',
    'Conversational AI',
    'AI Assistant Builder',
    'Low-code AI platform',
    'AI integration tools',
  ],
  authors: [
    {
      name: 'Arimac AI studio',
      url: 'https://ai-studio-poc.vercel.app/drag-and-drop',
    },
  ],
  creator: 'AI Studio Team',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Studio – Build Powerful AI Agents with Ease',
    description:
      'Manage your AI agents, customize workflows, and monitor performance – all in one powerful AI dashboard.',
    url: 'https://ai-studio-poc.vercel.app/drag-and-drop',
    siteName: 'AI Studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Studio Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Studio',
    description:
      'Build and manage your AI agents with our intuitive dashboard.',
    site: '@aistudioapp',
    creator: '@aistudioapp',
    images: ['https://ai-studio-poc.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://ai-studio-poc.vercel.app/drag-and-drop'),
  themeColor: '#47C2FF',
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
        <ClientReduxProvider>
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
                <ClearButton />
              </div>
            </div>
          </div>
          {children}
        </ClientReduxProvider>
      </body>
    </html>
  );
}
