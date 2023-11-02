import { Metadata } from "next";
import Link from "next/link";
import { TrackCount } from "./posts/track";
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
          that means plugging together tools from the amazing JavaScript
          ecosystem with automation, duct-tape and love.
        </p>
        <p>
          I decided I should have a home on the internet. Avid readers will know
          that I've started a bunch of two-post blogs over the years, so I
          wouldn't get your hopes up for this one lasting.
        </p>
        <p>
          But if you want to be one of those people who blog, at some point
          you've got to start another blog... right?
        </p>
      </div>
      <div className="space-y-4">
        <p>Here are my most popular posts:</p>
        <div>
          {posts.map((post) => (
            <Link
              className="block border p-4 no-underline border-gray-600 hover:border-gray-400 transition-all my-[-1px] relative hover:z-10"
              key={post.slug}
              href={`/posts/${post.slug}`}
            >
              <h3>{post.entry.title}</h3>
              <p className="text-gray-500 text-sm">
                <TrackCount pathname={`/posts/${post.slug}`} />
              </p>
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
