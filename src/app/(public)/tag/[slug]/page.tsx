import { Metadata } from "next";
import TagClient from "./TagClient";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const tagName = decodeURIComponent(slug).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: {
      absolute: `${tagName}`,
    },
    description: `Read all blog posts related to ${tagName} at Siraj Tech. Explore articles tagged with ${tagName}.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/tag/${slug}`,
    },
    openGraph: {
      title: `${tagName}`,
      description: `Read all blog posts related to ${tagName} at Siraj Tech.`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const resolvedParams = await params;
  return <TagClient slug={resolvedParams.slug} />;
}
