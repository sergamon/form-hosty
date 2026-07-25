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
  metadataBase: new URL('https://checkin.hostygroup.com'),
  title: 'Registro y Autorización de Ingreso',
  description: 'Aplicación para el registro de huéspedes y autorización de ingreso - Hosty',
  icons: {
    icon: 'https://res.cloudinary.com/daauwbhzj/image/upload/v1785022511/icon_k9pxyp.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://checkin.hostygroup.com',
    title: 'Registro y Autorización de Ingreso',
    description: 'Aplicación para el registro de huéspedes y autorización de ingreso - Hosty',
    siteName: 'Hosty Check-in',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hosty - Registro y Autorización de Ingreso',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Registro y Autorización de Ingreso',
    description: 'Aplicación para el registro de huéspedes y autorización de ingreso - Hosty',
    images: ['/og-image.png'],
    creator: '@HostyGroup',
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
