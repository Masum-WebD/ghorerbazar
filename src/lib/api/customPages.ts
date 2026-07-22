import { API_BASE_URL } from "./config";

// ─── Types ───────────────────────────────────────────────────────────

export interface CustomPageListItem {
  id: number;
  title: string;
  slug: string;
}

export interface CustomPageProduct {
  id: number;
  name: string;
  slug: string;
  product_type: "normal" | "variant";
  thumbnail_image: string;
  regular_price: string;
  sale_price: string;
  status: string;
  landing_page: {
    id: number;
    product_id: number;
    info_title: string;
    template: string;
    is_active: boolean;
  } | null;
  images: unknown[];
  variants: {
    id: number;
    product_id: number;
    name: string;
    price: string;
    sale_price: string;
    attribute_combinations: {
      id: number;
      product_variant_id: number;
      attribute: string;
      attribute_value: string;
    }[];
  }[];
}

export interface CustomPageDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  is_active: boolean;
  whatsapp_btn_text: string;
  messenger_btn_text: string;
  created_at: string;
  updated_at: string;
  og_image_url: string;
  products: CustomPageProduct[];
}

// ─── API Responses ───────────────────────────────────────────────────

interface CustomPagesListResponse {
  success: boolean;
  message: string;
  data: CustomPageListItem[];
}

interface CustomPageDetailResponse {
  success: boolean;
  message: string;
  data: CustomPageDetail;
}

// ─── Fetch Functions ─────────────────────────────────────────────────

/** Fetch all active custom pages (used for footer "Other Products" links). */
export const fetchCustomPages = async (): Promise<CustomPageListItem[]> => {
  try {
    if (!API_BASE_URL) return [];
    const response = await fetch(`${API_BASE_URL}/api/v1/custom-pages`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return [];
    const result: CustomPagesListResponse = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("fetchCustomPages error:", error);
    return [];
  }
};

/** Fetch a single custom page by slug (includes SEO data + associated products). */
export const fetchCustomPageBySlug = async (slug: string): Promise<CustomPageDetail | null> => {
  try {
    if (!API_BASE_URL) return null;
    const response = await fetch(`${API_BASE_URL}/api/v1/custom-pages/${slug}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;
    const result: CustomPageDetailResponse = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error(`fetchCustomPageBySlug error (${slug}):`, error);
    return null;
  }
};
