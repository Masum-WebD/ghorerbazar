import { API_BASE_URL } from "./config";

export interface Settings {
  id: number;
  name: string;
  title: string;
  logo: string;
  dark_logo: string;
  favicon: string;
  tagline: string;
  primary_color: string;
  secondary_color: string;
  mobile: string;
  email: string;
  address: string;
  phone_secondary: string;
  support_email: string | null;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  google_map_link: string;
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  whatsapp_number: string | null;
  footer_text: string;
  footer_description: string;
  footer_logo_id: string;
  footer_qrcode: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string | null;
  google_analytics_id: string | null;
  facebook_pixel_id: string | null;
  google_tag_manager_id: string | null;
  maintenance_mode: boolean;
  maintenance_message: string;
  created_at: string;
  updated_at: string;
  logo_url: string;
  dark_logo_url: string;
  favicon_url: string;
  og_image_url: string | null;
  sidebar_messenger: string | null;
  sidebar_whatsapp: string | null;
  sidebar_phone: string | null;
  sidebar_telegram: string | null;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: Settings;
}

export const fetchSettings = async (): Promise<Settings | null> => {
  try {
    if (!API_BASE_URL) return null;
    const response = await fetch(`${API_BASE_URL}/api/v1/settings`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const data: SettingsResponse = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("fetchSettings error:", error);
    return null;
  }
};
