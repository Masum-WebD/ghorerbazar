import { Metadata } from 'next';
import BlogClient from '../BlogClient';
import { fetchBlogCategories } from '@/lib/api/blog';

type Props = {
  params: Promise<{ slug?: string[] }>
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sirajtech.org";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug?.[0];
  const subCategorySlug = resolvedParams.slug?.[1];
  
  let currentPath = "/blog";
  if (categorySlug) currentPath += `/${categorySlug}`;
  if (subCategorySlug) currentPath += `/${subCategorySlug}`;

  if (categorySlug) {
    try {
      const categories = await fetchBlogCategories();
      const category = categories.find(c => c.slug === categorySlug);
      
      if (category) {
        let title = category.title;
        if (subCategorySlug && category.sub_categories) {
           const sub = category.sub_categories.find(s => s.slug === subCategorySlug);
           if (sub) {
             title = `${sub.title} - ${category.title}`;
           }
        }

        const description = `Read articles about ${title} on Siraj Tech. প্রযুক্তি, সিভিল ইঞ্জিনিয়ারিং এবং আধুনিক কৃষির গভীর বিশ্লেষণ ও অনুপ্রেরণামূলক কাহিনী জানুন।`;

        return {
          title: {
            absolute: `${title} | Sirajtech`,
          },
          description,
          alternates: {
            canonical: currentPath,
          },
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
          },
          openGraph: {
            type: 'website',
            locale: 'bn_BD',
            siteName: 'Sirajtech',
            url: currentPath,
            title: `${title} | Sirajtech`,
            description,
          },
          twitter: {
            card: 'summary_large_image',
            site: '@siraj_tech24',
            title: `${title} | Sirajtech`,
            description,
          }
        };
      }
    } catch (e) {
      // Ignore error and fall back to default metadata
    }
  }

  const defaultTitle = "Blog";
  const defaultDesc = "প্রযুক্তি, সিভিল ইঞ্জিনিয়ারিং এবং আধুনিক কৃষির গভীর বিশ্লেষণ ও অনুপ্রেরণামূলক কাহিনী জানুন।";

  return {
    title: {
      absolute: `${defaultTitle} | Sirajtech`,
    },
    description: defaultDesc,
    alternates: {
      canonical: currentPath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: 'website',
      locale: 'bn_BD',
      siteName: 'Sirajtech',
      url: currentPath,
      title: `${defaultTitle} | Sirajtech`,
      description: defaultDesc,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@siraj_tech24',
      title: `${defaultTitle} | Sirajtech`,
      description: defaultDesc,
    }
  };
}

export default async function BlogPage({ params }: Props) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug?.[0];
  const subCategorySlug = resolvedParams.slug?.[1];

  return <BlogClient categorySlug={categorySlug} subCategorySlug={subCategorySlug} />;
}
