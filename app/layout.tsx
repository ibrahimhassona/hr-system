import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'MHG HRM - Human Resources Management System',
  description: 'Comprehensive Human Resources Management Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning>
      <body className={'font-arabic' }>
        {/* <NextIntlClientProvider > */}
          {children}
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
