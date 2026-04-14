import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickStocks - Portfolio Dashboard",
  description: "Premium wealth management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
      </head>
      <body className="flex min-h-screen bg-background text-on-surface">
        <main className="flex-1 flex flex-col min-h-screen">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
