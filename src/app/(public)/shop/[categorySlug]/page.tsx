import ShopClient from "@/components/shop/ShopClient";
import { Metadata } from "next";
import { fetchShopCategories, findShopCategoryBySlug } from "@/lib/api/categories";

export const revalidate = 60; // ISR every 60 seconds

type Props = {
    params: {
        categorySlug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const categories = await fetchShopCategories();
    const match = findShopCategoryBySlug(categories, resolvedParams.categorySlug);

    const rawTitle = match?.category.meta_title || (match ? match.category.name : "Shop");
    const cleanTitle = rawTitle.replace(/\s*[\-–|]\s*siraj\s*tech\s*$/i, "").trim();

    const description = match?.category.meta_description || (match
        ? `Browse our selection of ${match.category.name} products.`
        : "Browse all agricultural and medical products at Sirajtech.");
    
    const currentPath = `/shop/${resolvedParams.categorySlug}`;

    return {
        title: {
            absolute: `${cleanTitle} | Sirajtech`,
        },
        description,
        keywords: match?.category.meta_keywords || "sirajtech, shop, products, agriculture, medical",
        alternates: {
            canonical: currentPath,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
        openGraph: {
            type: "website",
            locale: "bn_BD",
            siteName: "Sirajtech",
            url: currentPath,
            title: `${cleanTitle} | Sirajtech`,
            description,
        },
        twitter: {
            card: "summary_large_image",
            site: "@siraj_tech24",
            title: `${cleanTitle} | Sirajtech`,
            description,
        },
    };
}

export default async function ShopCategoryPage({ params }: Props) {
    const resolvedParams = await params;
    return <ShopClient initialCategorySlug={resolvedParams.categorySlug} />;
}
