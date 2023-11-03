import { Metadata } from "next";
import "./layout.css";

export const metadata: Metadata = {
  title: {
    default: "David Peek",
    template: "%s | David Peek",
  },
  description: "Developer, entrepreneur, eternal optimist",
  openGraph: {
    title: "David Peek",
    description: "Developer, entrepreneur, eternal optimist",
    url: "https://dpeek.com",
    siteName: "David Peek",
    locale: "en_AU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-white">{children}</body>
    </html>
  );
}
