import { Cormorant_Garamond, Inter } from 'next/font/google';
import "./globals.css";

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});
const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: "Onel Farmz | Premium Organic Broiler Chickens",
  description: "Fresh, ethically-raised poultry from Minna to Lagos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary selection:bg-secondary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}