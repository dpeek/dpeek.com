import { Metadata } from "next";
import Link from "next/link";
import { reader } from "./reader";
import { Views } from "./views";

export const metadata: Metadata = {
  title: "David Peek - Developer, Entrepreneur, Optimist",
  description:
    "I'm a fullstack developer, entrepreneur and technology optimist. I'm co-founder and CTO of estii.com - an estimation and pricing platform for solution providers.",
};

function PostLink({ slug, title }: { slug: string; title: string }) {
  const href = `/posts/${slug}`;
  return (
    <Link
      className="block border p-4 no-underline border-gray-600 hover:border-gray-400 transition-all my-[-1px] relative hover:z-10"
      key={slug}
      href={href}
    >
      <h3>{title}</h3>
      <Views pathname={href} />
    </Link>
  );
}

export default async function Page() {
  const posts = await reader.collections.posts.all();
  posts.sort(
    (a, b) =>
      new Date(a.entry.date).getTime() - new Date(b.entry.date).getTime(),
  );

  return (
    <div className="mx-auto max-w-xl p-6 space-y-10">
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
            <PostLink
              key={post.slug}
              slug={post.slug}
              title={post.entry.title}
            />
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
