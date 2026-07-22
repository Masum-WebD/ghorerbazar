'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import AnimatedSection from "@/components/home/AnimatedSection";
import ShopCategoryCard from "@/components/shop/ShopCategoryCard";
import ProductCardEnhanced from "@/components/home/ProductCardEnhanced";
import Pagination from "@/components/shop/Pagination";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchShopCategories,
  getShopCategoryView,
  isShopRootCategory,
  ShopCategory,
  ShopCategoryItem,
  findShopCategoryBySlug,
} from "@/lib/api/categories";
import {
  fetchProducts,
  formatProductPrice,
  formatOriginalPrice,
  Product,
} from "@/lib/api/products";
import { getImageUrl } from "@/lib/api/images";
import { ChevronRight, Loader2, PackageOpen, RefreshCw, Filter, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const getCategoryHref = (item: ShopCategoryItem): string => `/shop/${item.slug}`;

const getSubcategoryCount = (
  item: ShopCategoryItem,
  categories: ShopCategory[]
): number => {
  if (isShopRootCategory(categories, item)) {
    return item.children.length;
  }
  return 0;
};

const ProductSkeleton = () => (
  <div className="bg-white rounded-t-xl rounded-b-none overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-border/60 flex flex-col h-full">
    {/* Image Container */}
    <div className="relative w-full aspect-[4/3] bg-[#f8fafc] border-b border-border/30">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
    </div>

    {/* Content */}
    <div className="p-2 md:p-4 flex flex-col flex-grow bg-white gap-1 md:gap-2">
      {/* Title */}
      <div className="h-3 md:h-4 w-full bg-gray-200 animate-pulse rounded mt-1"></div>
      <div className="h-3 md:h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-1 md:mb-2"></div>

      {/* Price & Order Button */}
      <div className="mt-auto pt-1 md:pt-2 flex flex-col gap-2.5">
        <div className="h-4 md:h-5 w-1/3 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-full h-[34px] md:h-[42px] bg-gray-200 animate-pulse rounded-md mt-1"></div>
      </div>
    </div>
  </div>
);

interface ShopClientProps {
  initialCategorySlug?: string;
}

const ShopClient = ({ initialCategorySlug }: ShopClientProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [productPage, setProductPage] = useState(1);
  const isWholesaler = user?.role === "wholesaler";

  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const [selectedSubCategories, setSelectedSubCategories] = useState<Set<number>>(new Set());
  const [selectedChildCategories, setSelectedChildCategories] = useState<Set<number>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Local state for slug to enable shallow routing without Next.js full remounts
  const [currentSlug, setCurrentSlug] = useState(initialCategorySlug);

  useEffect(() => {
    setCurrentSlug(initialCategorySlug);
  }, [initialCategorySlug]);

  const { data: categories = [], isLoading, isError, refetch, isFetching } =
    useQuery({
      queryKey: ["shopCategories"],
      queryFn: fetchShopCategories,
      staleTime: 5 * 60 * 1000,
    });

  // Sync category state based on local slug state
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    let initialCats = new Set<number>();
    let initialSubs = new Set<number>();
    let initialChilds = new Set<number>();
    let initialExpanded = new Set<number>();

    if (currentSlug) {
      const found = findShopCategoryBySlug(categories, currentSlug);
      if (found) {
        const { category, parent } = found;

        if (parent) {
          const isRootParent = categories.some(c => c.id === parent.id);
          if (isRootParent) {
            initialSubs.add(category.id);
            initialExpanded.add(parent.id);
          } else {
            initialChilds.add(category.id);
            initialExpanded.add(parent.id);
            const rootParent = categories.find(c => c.children?.some(sub => sub.id === parent.id));
            if (rootParent) {
              initialExpanded.add(rootParent.id);
            }
          }
        } else {
          initialCats.add(category.id);
          initialExpanded.add(category.id);
        }
      }
    }

    // Parse query string for multi-select support from external links
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qCats = params.get('categories')?.split(',') || [];
      const qSubs = params.get('subcategories')?.split(',') || [];
      const qChilds = params.get('childcategories')?.split(',') || [];

      qCats.forEach(slug => {
        const foundCat = categories.find(c => c.slug === slug);
        if (foundCat) {
          initialCats.add(foundCat.id);
          initialExpanded.add(foundCat.id);
        }
      });

      qSubs.forEach(slug => {
        categories.forEach(c => {
          const foundSub = c.children?.find(s => s.slug === slug);
          if (foundSub) {
            initialSubs.add(foundSub.id);
            initialExpanded.add(c.id);
          }
        });
      });

      qChilds.forEach(slug => {
        categories.forEach(c => {
          c.children?.forEach(s => {
            const foundChild = s.children?.find(ch => ch.slug === slug);
            if (foundChild) {
              initialChilds.add(foundChild.id);
              initialExpanded.add(s.id);
            }
          });
        });
      });
    }

    // Cascade down from selected roots
    initialCats.forEach(catId => {
      const cat = categories.find(c => c.id === catId);
      cat?.children?.forEach(sub => {
        initialSubs.add(sub.id);
        sub.children?.forEach(child => initialChilds.add(child.id));
      });
    });

    // Cascade down from selected subcategories
    initialSubs.forEach(subId => {
      categories.forEach(c => {
        const sub = c.children?.find(s => s.id === subId);
        sub?.children?.forEach(child => initialChilds.add(child.id));
      });
    });

    setSelectedCategories(initialCats);
    setSelectedSubCategories(initialSubs);
    setSelectedChildCategories(initialChilds);
    setExpandedCategories(prev => new Set([...Array.from(prev), ...Array.from(initialExpanded)]));
  }, [currentSlug, categories]);

  const updateUrlWithFilters = (
    cats: Set<number>,
    subs: Set<number>,
    childs: Set<number>
  ) => {
    const params = new URLSearchParams();

    // Map IDs to slugs for pretty URLs
    const catSlugs = Array.from(cats).map(id => categories.find(c => c.id === id)?.slug).filter(Boolean);
    const subSlugs = Array.from(subs).map(id => {
      for (const c of categories) {
        const s = c.children?.find(ch => ch.id === id);
        if (s) return s.slug;
      }
      return null;
    }).filter(Boolean);
    const childSlugs = Array.from(childs).map(id => {
      for (const c of categories) {
        for (const s of c.children || []) {
          const ch = s.children?.find(child => child.id === id);
          if (ch) return ch.slug;
        }
      }
      return null;
    }).filter(Boolean);

    if (catSlugs.length > 0) params.set('categories', catSlugs.join(','));
    if (subSlugs.length > 0) params.set('subcategories', subSlugs.join(','));
    if (childSlugs.length > 0) params.set('childcategories', childSlugs.join(','));

    const queryStr = params.toString();

    // Maintain current path (e.g. /shop or /shop/medical) but update query
    // If they uncheck everything, we can just clear the query. 
    // Wait, what if they click a completely different category?
    // Let's just update the query string on the current path.
    const path = window.location.pathname;
    window.history.pushState(null, '', queryStr ? `${path}?${queryStr}` : path);
  };

  const toggleCategory = (catId: number) => {
    const newCats = new Set(selectedCategories);
    const newSubs = new Set(selectedSubCategories);
    const newChilds = new Set(selectedChildCategories);
    const category = categories.find(c => c.id === catId);

    if (newCats.has(catId)) {
      newCats.delete(catId);
      // Cascade unselect children
      category?.children?.forEach(sub => {
        newSubs.delete(sub.id);
        sub.children?.forEach(child => newChilds.delete(child.id));
      });
    } else {
      newCats.add(catId);
      setExpandedCategories(prev => new Set(prev).add(catId));
      // Cascade select children
      category?.children?.forEach(sub => {
        newSubs.add(sub.id);
        sub.children?.forEach(child => newChilds.add(child.id));
      });
    }

    setSelectedCategories(newCats);
    setSelectedSubCategories(newSubs);
    setSelectedChildCategories(newChilds);
    setProductPage(1);
    updateUrlWithFilters(newCats, newSubs, newChilds);
  };

  const toggleSubCategory = (subCatId: number, parentId: number) => {
    const newCats = new Set(selectedCategories);
    const newSubs = new Set(selectedSubCategories);
    const newChilds = new Set(selectedChildCategories);

    const parent = categories.find(c => c.id === parentId);
    const sub = parent?.children?.find(s => s.id === subCatId);

    if (newSubs.has(subCatId)) {
      newSubs.delete(subCatId);
      newCats.delete(parentId); // Unchecking child unchecks parent
      // Cascade unselect children
      sub?.children?.forEach(child => newChilds.delete(child.id));
    } else {
      newSubs.add(subCatId);
      setExpandedCategories(prev => new Set(prev).add(subCatId));
      // Cascade select children
      sub?.children?.forEach(child => newChilds.add(child.id));

      // Auto-check parent if all subcategories are checked
      if (parent?.children && parent.children.every(s => newSubs.has(s.id))) {
        newCats.add(parentId);
      }
    }

    setSelectedCategories(newCats);
    setSelectedSubCategories(newSubs);
    setSelectedChildCategories(newChilds);
    setProductPage(1);
    updateUrlWithFilters(newCats, newSubs, newChilds);
  };

  const toggleChildCategory = (childId: number, subCatId: number, parentId: number) => {
    const newCats = new Set(selectedCategories);
    const newSubs = new Set(selectedSubCategories);
    const newChilds = new Set(selectedChildCategories);

    const parent = categories.find(c => c.id === parentId);
    const sub = parent?.children?.find(s => s.id === subCatId);

    if (newChilds.has(childId)) {
      newChilds.delete(childId);
      newSubs.delete(subCatId); // Unchecking child unchecks parent
      newCats.delete(parentId);
    } else {
      newChilds.add(childId);

      // Auto-check subcategory if all its children are checked
      if (sub?.children && sub.children.every(c => newChilds.has(c.id))) {
        newSubs.add(subCatId);
      }
      // Auto-check root category if all its subcategories are checked
      if (parent?.children && parent.children.every(s => newSubs.has(s.id))) {
        newCats.add(parentId);
      }
    }

    setSelectedCategories(newCats);
    setSelectedSubCategories(newSubs);
    setSelectedChildCategories(newChilds);
    setProductPage(1);
    updateUrlWithFilters(newCats, newSubs, newChilds);
  };

  const toggleExpand = (catId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(catId)) {
      newExpanded.delete(catId);
    } else {
      newExpanded.add(catId);
    }
    setExpandedCategories(newExpanded);
  };

  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedSubCategories(new Set());
    setSelectedChildCategories(new Set());
    setProductPage(1);
    const path = window.location.pathname;
    window.history.pushState(null, '', path);
    // If they want to also clear the path routing to /shop when clearing all filters, we can do:
    // window.history.pushState(null, '', '/shop');
    // setCurrentSlug(undefined);
  };

  const selectAllFilters = () => {
    const allCatIds = categories.map((c) => c.id);
    const allSubCatIds = categories.flatMap((c) => c.children?.map((ch) => ch.id) || []);
    const allChildIds = categories.flatMap((c) => c.children?.flatMap(ch => ch.children?.map(sub => sub.id) || []) || []);
    setSelectedCategories(new Set(allCatIds));
    setSelectedSubCategories(new Set(allSubCatIds));
    setSelectedChildCategories(new Set(allChildIds));
    setProductPage(1);
    updateUrlWithFilters(new Set(allCatIds), new Set(allSubCatIds), new Set(allChildIds));
  };

  const view = getShopCategoryView(categories, currentSlug);

  // Reset page when slug changes
  useEffect(() => {
    setProductPage(1);
  }, [currentSlug]);

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
    isFetching: productsFetching,
  } = useQuery({
    queryKey: ["products", Array.from(selectedCategories), Array.from(selectedSubCategories), Array.from(selectedChildCategories), productPage],
    queryFn: async () => {
      // Show all products when no filters selected
      if (selectedCategories.size === 0 && selectedSubCategories.size === 0 && selectedChildCategories.size === 0) {
        return fetchProducts({ page: productPage });
      }

      // Fast path: single root category
      if (selectedCategories.size === 1 && selectedSubCategories.size === 0) {
        const catId = Array.from(selectedCategories)[0];
        return fetchProducts({ categoryId: catId, page: productPage });
      }
      // Fast path: single root category with its subcategories
      if (selectedCategories.size === 1) {
        const catId = Array.from(selectedCategories)[0];
        const category = categories.find((c) => c.id === catId);
        const childIds = category?.children?.map((ch) => ch.id) || [];
        const allChildrenSelected = childIds.length > 0 && childIds.every((id) => selectedSubCategories.has(id));
        if (allChildrenSelected && selectedSubCategories.size === childIds.length) {
          return fetchProducts({ categoryId: catId, page: productPage });
        }
      }

      // Fast path: single subcategory
      if (selectedCategories.size === 0 && selectedSubCategories.size === 1) {
        const subCatId = Array.from(selectedSubCategories)[0];
        return fetchProducts({ subCategoryId: subCatId, page: productPage });
      }

      // Fast path: single child category
      if (selectedCategories.size === 0 && selectedSubCategories.size === 0 && selectedChildCategories.size === 1) {
        const childCatId = Array.from(selectedChildCategories)[0];
        return fetchProducts({ childCategoryId: childCatId, page: productPage });
      }

      // Parallel queries for multiple selections
      const promises: Promise<any>[] = [];

      selectedCategories.forEach((id) => {
        promises.push(fetchProducts({ categoryId: id }));
      });

      selectedSubCategories.forEach((id) => {
        const parent = categories.find((c) => c.children?.some((ch) => ch.id === id));
        if (!parent || !selectedCategories.has(parent.id)) {
          promises.push(fetchProducts({ subCategoryId: id }));
        }
      });

      selectedChildCategories.forEach((id) => {
        let isCovered = false;
        for (const cat of categories) {
          if (selectedCategories.has(cat.id)) {
            if (cat.children?.some(sub => sub.children?.some(child => child.id === id))) {
              isCovered = true;
              break;
            }
          }
          const subCat = cat.children?.find(sub => sub.children?.some(child => child.id === id));
          if (subCat && selectedSubCategories.has(subCat.id)) {
            isCovered = true;
            break;
          }
        }
        if (!isCovered) {
          promises.push(fetchProducts({ childCategoryId: id }));
        }
      });

      const results = await Promise.allSettled(promises);

      const allItems: Product[] = [];
      const seenIds = new Set<number>();

      results.forEach((result) => {
        if (result.status !== "fulfilled") return;
        const list = result.value?.data || [];
        list.forEach((item: Product) => {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            allItems.push(item);
          }
        });
      });

      const perPage = 12;
      const total = allItems.length;
      const lastPage = Math.max(1, Math.ceil(total / perPage));
      const currentPage = Math.min(productPage, lastPage);
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      const pageData = allItems.slice(start, end);

      return {
        data: pageData,
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total: total,
        from: total > 0 ? start + 1 : null,
        to: Math.min(end, total),
      };
    },
    enabled: categories.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  const products = productsData?.data ?? [];
  const pagination = productsData
    ? {
      currentPage: productsData.current_page,
      lastPage: productsData.last_page,
      total: productsData.total,
      from: productsData.from,
      to: productsData.to,
    }
    : null;

  const renderSidebarContent = () => (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
            <Filter size={14} className="text-primary" />
          </div>
          <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">
            Categories
          </h3>
        </div>
        {(selectedCategories.size > 0 || selectedSubCategories.size > 0 || selectedChildCategories.size > 0) && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary/70 hover:text-primary bg-primary/8 hover:bg-primary/15 px-2.5 py-1 rounded-full transition-all duration-200"
          >
            <X size={10} />
            Clear
          </button>
        )}
      </div>

      {/* Active filters badge */}
      {(selectedCategories.size > 0 || selectedSubCategories.size > 0 || selectedChildCategories.size > 0) && (
        <div className="flex items-center gap-1.5 mb-4 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">
            {selectedCategories.size + selectedSubCategories.size + selectedChildCategories.size} filter{selectedCategories.size + selectedSubCategories.size + selectedChildCategories.size > 1 ? "s" : ""} active
          </span>
        </div>
      )}

      <div className="space-y-1">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          const hasSub = category.children && category.children.length > 0;
          const isCatChecked = selectedCategories.has(category.id);

          return (
            <div key={category.id}>
              {/* Category row */}
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 group cursor-pointer",
                  isCatChecked
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/60 text-foreground/80"
                )}
                onClick={() => toggleCategory(category.id)}
              >
                {/* Custom checkbox */}
                <div
                  className={cn(
                    "flex items-center justify-center w-4 h-4 shrink-0 rounded border-2 transition-all duration-200",
                    isCatChecked
                      ? "bg-primary border-primary"
                      : "border-gray-400 group-hover:border-primary/70"
                  )}
                >
                  {isCatChecked && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                <span
                  className={cn(
                    "text-sm font-medium flex-1 leading-snug break-words select-none",
                    isCatChecked ? "text-primary font-semibold" : "text-foreground/75 group-hover:text-foreground"
                  )}
                >
                  {category.name}
                </span>

                {/* Sub-category count badge */}
                {hasSub && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 transition-colors",
                    isCatChecked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {category.children.length}
                  </span>
                )}

                {/* Expand toggle */}
                {hasSub && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleExpand(category.id); }}
                    className={cn(
                      "p-0.5 rounded shrink-0 transition-all duration-200",
                      isCatChecked ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    <ChevronRight
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isExpanded ? "rotate-90" : "rotate-0"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Sub-categories */}
              {hasSub && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="flex flex-col gap-0.5 pl-4 ml-3 border-l-2 border-primary/15 mt-1 mb-1">
                    {category.children.map((sub) => {
                      const isSubChecked = selectedSubCategories.has(sub.id);
                      const hasChild = sub.children && sub.children.length > 0;
                      const isSubExpanded = expandedCategories.has(sub.id);

                      return (
                        <div key={sub.id}>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer transition-all duration-200 group",
                              isSubChecked ? "bg-primary/8 text-primary" : "hover:bg-muted/50"
                            )}
                            onClick={() => toggleSubCategory(sub.id, category.id)}
                          >
                            {/* Custom sub-checkbox */}
                            <div
                              className={cn(
                                "flex items-center justify-center w-3.5 h-3.5 shrink-0 rounded border-2 transition-all duration-200",
                                isSubChecked
                                  ? "bg-primary border-primary"
                                  : "border-gray-400 group-hover:border-primary/60"
                              )}
                            >
                              {isSubChecked && (
                                <svg width="7" height="5.5" viewBox="0 0 7 5.5" fill="none">
                                  <path d="M1 2.75L2.75 4.5L6 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <label
                              className={cn(
                                "text-xs font-medium leading-snug break-words flex-1 cursor-pointer select-none transition-colors",
                                isSubChecked ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              {sub.name}
                            </label>

                            {/* Expand toggle for subcategory */}
                            {hasChild && (
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleExpand(sub.id); }}
                                className={cn(
                                  "p-0.5 rounded shrink-0 transition-all duration-200",
                                  isSubChecked ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                              >
                                <ChevronRight
                                  size={12}
                                  className={cn(
                                    "transition-transform duration-200",
                                    isSubExpanded ? "rotate-90" : "rotate-0"
                                  )}
                                />
                              </button>
                            )}
                          </div>

                          {/* Child categories */}
                          {hasChild && (
                            <div
                              className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isSubExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                              )}
                            >
                              <div className="flex flex-col gap-0.5 pl-4 ml-3 border-l-2 border-primary/15 mt-1 mb-1">
                                {sub.children?.map((childCat) => {
                                  const isChildChecked = selectedChildCategories.has(childCat.id);
                                  return (
                                    <div
                                      key={childCat.id}
                                      className={cn(
                                        "flex items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all duration-200 group",
                                        isChildChecked ? "bg-primary/5 text-primary" : "hover:bg-muted/30"
                                      )}
                                      onClick={() => toggleChildCategory(childCat.id, sub.id, category.id)}
                                    >
                                      {/* Custom child-checkbox */}
                                      <div
                                        className={cn(
                                          "flex items-center justify-center w-3 h-3 shrink-0 rounded border transition-all duration-200",
                                          isChildChecked
                                            ? "bg-primary border-primary"
                                            : "border-gray-400 group-hover:border-primary/60"
                                        )}
                                      >
                                        {isChildChecked && (
                                          <svg width="6" height="4.5" viewBox="0 0 7 5.5" fill="none">
                                            <path d="M1 2.75L2.75 4.5L6 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                        )}
                                      </div>
                                      <label
                                        className={cn(
                                          "text-[11px] font-medium leading-snug break-words flex-1 cursor-pointer select-none transition-colors",
                                          isChildChecked ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
                                        )}
                                      >
                                        {childCat.name}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <main id="main-content" role="main" className="flex-grow bg-gradient-to-b from-section-alt/40 via-background to-background">
        {/* Breadcrumb */}
        <div className="bg-slate-100 py-3 md:py-4">
          <div className="container-main">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                HOME
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors uppercase">
                Shop
              </Link>
              {initialCategorySlug && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-foreground font-medium truncate max-w-[200px]">
                    {view.current?.name || "Filtered"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container-main px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-12">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
              {/* Sidebar Skeleton */}
              <aside className="hidden md:block w-64 lg:w-72 shrink-0 bg-white border border-border/40 rounded-2xl p-5 shadow-sm sticky top-24">
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-6"></div>
                <div className="flex flex-col gap-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main Catalog Skeleton */}
              <div className="flex-grow w-full">
                {/* Mobile Header / Filters Skeleton */}
                <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-border/40 shadow-sm">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  <div className="md:hidden h-8 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          ) : isError ? (
            <AnimatedSection>
              <div className="mx-auto max-w-md rounded-2xl border border-destructive/20 bg-white p-8 text-center shadow-card">
                <p className="mb-4 text-muted-foreground">
                  Could not load categories. Please try again.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
                >
                  {isFetching ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <RefreshCw size={16} />
                  )}
                  Retry
                </button>
              </div>
            </AnimatedSection>
          ) : view.notFound ? (
            <AnimatedSection>
              <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-10 text-center shadow-card">
                <PackageOpen className="mx-auto mb-4 text-muted-foreground/50" size={48} />
                <h2 className="mb-2 text-lg font-bold text-foreground">Category not found</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  This category may have been removed or the link is incorrect.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  Back to Shop
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">

                {/* Desktop Sidebar (Left side, sticky) */}
                <aside className="hidden md:block w-64 lg:w-72 shrink-0 bg-white border border-border/40 rounded-2xl p-5 shadow-sm sticky top-24">
                  {renderSidebarContent()}
                </aside>

                {/* Main Catalog View (Right side) */}
                <div className="flex-grow w-full">

                  {/* Mobile Header / Filters Drawer Trigger */}
                  <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-border/40 shadow-sm">
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Showing <span className="font-bold text-foreground">{pagination?.currentPage ? `${pagination.from}-${pagination.to} of ` : ""}{pagination?.total ?? 0}</span> products
                    </div>
                    <button
                      onClick={() => setMobileFiltersOpen(true)}
                      className="md:hidden inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary transition-all shadow-sm"
                    >
                      <SlidersHorizontal size={13} />
                      Filters
                      {(selectedCategories.size > 0 || selectedSubCategories.size > 0) && (
                        <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white leading-none">
                          {selectedCategories.size + selectedSubCategories.size}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Products Grid / Fetching States */}
                  {productsLoading ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                      ))}
                    </div>
                  ) : productsError ? (
                    <div className="mx-auto max-w-md rounded-2xl border border-destructive/20 bg-white p-8 text-center shadow-card">
                      <p className="mb-4 text-muted-foreground">
                        Could not load products. Please try again.
                      </p>
                      <button
                        type="button"
                        onClick={() => refetchProducts()}
                        disabled={productsFetching}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
                      >
                        {productsFetching ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <RefreshCw size={16} />
                        )}
                        Retry
                      </button>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="mx-auto max-w-lg rounded-2xl border border-border/60 bg-white p-8 text-center shadow-card sm:p-10">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <PackageOpen size={32} />
                      </div>
                      <h2 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                        No Products Found
                      </h2>
                      <p className="mb-6 text-sm text-muted-foreground sm:text-base">
                        No products matched the selected filters. Please adjust your categories or show all.
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={selectAllFilters}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                        >
                          Show All Products
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Product Cards Grid */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
                        {products.map((product) => (
                          <ProductCardEnhanced
                            key={product.id}
                            image={getImageUrl(product.thumbnail_image)}
                            title={product.name}
                            price={formatProductPrice(product, isWholesaler)}
                            originalPrice={formatOriginalPrice(product, isWholesaler)}
                            badge={product.sale_price ? "Sale" : undefined}
                            productId={product.slug}
                          />
                        ))}
                      </div>

                      {/* Pagination Controls */}
                      {pagination && pagination.lastPage > 1 && (
                        <div className="mt-10 flex items-center justify-center">
                          <Pagination
                            currentPage={pagination.currentPage}
                            lastPage={pagination.lastPage}
                            onPageChange={setProductPage}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>

      {/* Mobile Filters Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/60">
              <h2 className="font-extrabold text-foreground text-base">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-5">
              {renderSidebarContent()}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/60 bg-muted/20">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full btn-gradient-primary text-white py-2.5 rounded-xl font-bold text-sm shadow hover:shadow-md transition-all text-center"
              >
                Apply Filters ({pagination?.total ?? 0} Products)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopClient;
