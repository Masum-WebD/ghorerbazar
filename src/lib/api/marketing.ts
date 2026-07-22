import { API_BASE_URL } from "./config";

export interface MarketingConfig {
  gtm_id: string | null;
  ga4_measurement_id: string | null;
  gsc_verification_token: string | null;
}

export interface SitemapItem {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export interface MarketingConfigResponse {
  success: boolean;
  message: string;
  data: MarketingConfig;
}

export interface SitemapDataResponse {
  success: boolean;
  message: string;
  data: SitemapItem[];
}

/**
 * Fetch Google Tag Manager, Analytics, and Search Console configs from Laravel API.
 */
export const fetchMarketingConfig = async (): Promise<MarketingConfig> => {
  try {
    if (!API_BASE_URL) {
      return { gtm_id: null, ga4_measurement_id: null, gsc_verification_token: null };
    }
    const response = await fetch(`${API_BASE_URL}/api/v1/marketing-configs`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return { gtm_id: null, ga4_measurement_id: null, gsc_verification_token: null };
    }

    const data: MarketingConfigResponse = await response.json();

    if (!data.success || !data.data) {
      return { gtm_id: null, ga4_measurement_id: null, gsc_verification_token: null };
    }

    return data.data;
  } catch (error) {
    return {
      gtm_id: null,
      ga4_measurement_id: null,
      gsc_verification_token: null,
    };
  }
};

/**
 * Fetch sitemap dynamic data from Laravel API.
 */
export const fetchSitemapData = async (): Promise<SitemapItem[]> => {
  try {
    if (!API_BASE_URL) {
      return [];
    }
    const response = await fetch(`${API_BASE_URL}/api/v1/sitemap-data`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return [];
    }

    const data: SitemapDataResponse = await response.json();

    if (!data.success || !data.data) {
      return [];
    }

    return data.data;
  } catch (error) {
    return [];
  }
};
