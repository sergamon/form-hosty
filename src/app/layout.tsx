import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClientProviders } from '@/components/client-providers';

// Main Root Layout
if (typeof global !== 'undefined' && (global as any).localStorage && typeof (global as any).localStorage.getItem !== 'function') {
  try {
    delete (global as any).localStorage;
    console.warn('SERVER FIX: Deleted broken global.localStorage mock');
  } catch (e) {
    // Fallback if delete fails
    (global as any).localStorage = undefined;
  }
}



export const metadata: Metadata = {
  title: 'Registro y Autorización de Ingreso',
  description: 'Aplicación para el registro de huéspedes y autorización de ingreso.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
