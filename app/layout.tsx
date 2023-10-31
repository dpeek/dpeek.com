import "./layout.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-white">
        <div className="mx-auto max-w-3xl p-6 space-y-10">
          <p>
            <a href="/" className="text-gray-400 hover:text-gray-200">
              Home
            </a>
          </p>
          {children}
          <p>
            <a
              href="https://x.com/dpeek_"
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Follow me on X
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
