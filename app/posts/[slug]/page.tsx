import { DocumentRenderer } from "@keystatic/core/renderer";
import { format } from "date-fns";
import { Metadata } from "next";
import { reader } from "../../reader";

const renderers = {
  inline: {
    link: (props: any) => (
      <a
        {...props}
        className="text-blue-400 hover:text-blue-300 transition-all"
      />
    ),
  },
};

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
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl">{post.title}</h1>
        <p className="text-sm text-gray-400">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </p>
      </div>
      <DocumentRenderer document={await post.content()} renderers={renderers} />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
