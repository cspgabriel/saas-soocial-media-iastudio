import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SocialOS | Operacao profissional de social media',
  description: 'SaaS para agencias e freelancers controlarem clientes, calendario, IA, aprovacoes e relatorios.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'SocialOS',
    description: 'Gestao de social media com IA, calendario, clientes e limites por plano.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  );
}
