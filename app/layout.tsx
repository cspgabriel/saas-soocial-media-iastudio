import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SocialMediaOS',
  description: 'SaaS para gestão de Social Media',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
