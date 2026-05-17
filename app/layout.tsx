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
  title: 'SocialOS — operação de social media que o cliente respeita',
  description: 'Transforme briefing, calendário, IA, aprovação e relatório em uma operação clara para vender mais controle, velocidade e confiança ao cliente.',
  manifest: '/manifest.json',
  keywords: ['social media', 'ia para social media', 'calendário editorial', 'aprovação de posts', 'agência de social media'],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SocialOS — operação de social media que o cliente respeita',
    description: 'Mostre processo, gere conteúdo com contexto e entregue aprovação e relatório sem improviso.',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialOS — operação de social media que o cliente respeita',
    description: 'Briefing, calendário, IA, aprovação e relatório em um fluxo que passa confiança.',
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
