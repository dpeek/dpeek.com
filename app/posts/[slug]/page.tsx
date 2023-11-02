import { DocumentRenderer } from "@keystatic/core/renderer";
import { format } from "date-fns";
import { Metadata } from "next";
import { reader } from "../../reader";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const post = await reader.collections.posts.read(params.slug);

  return {
    title: post?.title ?? "",
    description: post?.description ?? "",
  } satisfies Metadata;
}

export default async function Post({ params }: PageProps) {
  const { slug } = params;

  const post = await reader.collections.posts.read(slug);

  if (!post) return <div>Post not found!</div>;

  return (
    <div className="prose prose-invert prose-img:rounded">
      <h1 className="text-3xl">{post.title}</h1>
      <p className="text-gray-500">
        {format(new Date(post.date), "MMMM dd, yyyy")}
      </p>
      <DocumentRenderer document={await post.content()} />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
