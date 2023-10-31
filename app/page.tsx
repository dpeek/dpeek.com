import Link from "next/link";
import { reader } from "./reader";

export default async function Homepage() {
  const posts = await reader.collections.posts.all();
  posts.sort(
    (a, b) =>
      new Date(a.entry.date).getTime() - new Date(b.entry.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Hello, I'm David Peek</h1>
      <p>
        I'm a fullstack developer, entrepreneur and technology optimist. I'm
        co-founder and CTO of{" "}
        <a className="underline" href="https://estii.com">
          estii.com
        </a>{" "}
        - an estimation and pricing platform for solution providers.
      </p>
      <p>
        I build software that lets small teams do ambitious things. Generally,
        that means pluging together the best tools from the amazing JavaScript
        ecosystem and stiching it all together with automation and love.
      </p>
      <p>
        One day (today actually), I decided I should have a home on the
        internet. I've started a bunch of these over the years, to be honest, so
        I wouldn't get your hopes up for this one to last. But the only way to
        do something is to just start, right?
      </p>
      <p>Here is my most popular post:</p>
      <ul>
        {posts.map((post) => (
          <Link key={post.slug} href={`/${post.slug}`}>
            <li className="border p-4 border-gray-600 hover:border-gray-400 transition-all">
              {post.entry.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
