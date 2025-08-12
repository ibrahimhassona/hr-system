import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { routing } from "@/i18n/routing";
// Example implementation for hasLocale and routing


interface Params {
  locale: string;
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as "ar" | "en";
  // -- direction --
  const dir = locale === "ar" ? "rtl" : "ltr";

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={dir === 'rtl' ? 'font-arabic' : 'font-english'}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex h-screen bg-neutral-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">
                {children}
              </main>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}