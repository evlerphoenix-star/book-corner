import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Instantiate the Inter font with latin subsets for high-velocity rendering
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Corner | Sovereign Checkout",
  description: "Phoenix and AeroAfrica Secure Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}