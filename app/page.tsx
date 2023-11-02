import { Metadata } from "next";
import Link from "next/link";
import { reader } from "./reader";

export const metadata: Metadata = {
  title: "David Peek - Developer, Entrepreneur, Optimist",
  description:
    "I'm a fullstack developer, entrepreneur and technology optimist. I'm co-founder and CTO of estii.com - an estimation and pricing platform for solution providers.",
};

export default async function Page() {
  const posts = await reader.collections.posts.all();
  posts.sort(
    (a, b) =>
      new Date(a.entry.date).getTime() - new Date(b.entry.date).getTime(),
  );

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-10">
      <p>
        <a href="/" className="text-gray-400 hover:text-gray-200">
          Home
        </a>
      </p>
      <div className="prose prose-invert">
        <h1 className="text-2xl">Hello, I'm David Peek</h1>
        <p>
          I'm a fullstack developer, entrepreneur and technology optimist. I'm
          co-founder and CTO of <a href="https://estii.com">estii.com</a> - an
          estimation and pricing platform for solution providers.
        </p>
        <p>
          I build software that lets small teams do ambitious things. Generally,
          that means pluging together the best tools from the amazing JavaScript
          ecosystem and stiching it all together with automation and love.
        </p>
        <p>
          One day (today actually), I decided I should have a home on the
          internet. I've started a bunch of these over the years, to be honest,
          so I wouldn't get your hopes up for this one to last. But the only way
          to do something is to just start, right?
        </p>
        <p>Here are my most popular posts:</p>
        <div>
          {posts.map((post) => (
            <Link
              className="block border p-4 no-underline border-gray-600 hover:border-gray-400 transition-all my-[-1px] relative hover:z-10"
              key={post.slug}
              href={`/posts/${post.slug}`}
            >
              {post.entry.title}
            </Link>
          ))}
        </div>
      </div>
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
