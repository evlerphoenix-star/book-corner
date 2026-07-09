import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Corner",
  description: "Book Corner Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}