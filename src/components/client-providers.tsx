'use client';

import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
            <Toaster />
        </LanguageProvider>
    );
}

