export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl p-6 space-y-10">
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
  );
}
