import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { FirebaseProvider } from '@/components/FirebaseProvider';
import './globals.css'; // Global styles

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://saas-soocial-media-iastudio.vercel.app'),
  title: 'SocialOS — IA para agências de social media | Grátis 14 dias',
  description: 'Controle clientes, calendário, aprovação, IA e relatórios em um SaaS rápido para social media. Crie conta grátis, sem cartão.',
  manifest: '/manifest.json',
  keywords: ['social media', 'ia para social media', 'calendário editorial', 'aprovação de posts', 'agência de social media'],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SocialOS — IA para agências de social media',
    description: 'Demita ferramentas soltas. Centralize briefing, calendário, IA, aprovação e relatório.',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialOS — IA para agências de social media',
    description: 'Briefing, calendário, IA, aprovação e relatório em um fluxo rápido.',
    images: ['/opengraph-image'],
  },
};

export const viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className={`${jakarta.className} antialiased`}>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
