import { API_BASE_URL } from "./config";

export interface AboutPage {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: number;
  title: string;
  description: string;
  image: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AboutUsData {
  page: AboutPage;
  sections: AboutSection[];
}

export interface AboutUsResponse {
  success: boolean;
  message: string;
  data: AboutUsData;
}

/** About section images are served from /storage/. */
export const getAboutSectionImageUrl = (section: AboutSection): string => {
  if (section.image_url?.startsWith('http')) return section.image_url;
  if (section.image?.startsWith('http')) return section.image;
  if (section.image) {
    return `${API_BASE_URL}/storage/${section.image.replace(/^\//, '')}`;
  }
  return '';
};

export const getActiveAboutSections = (sections: AboutSection[]): AboutSection[] =>
  sections ? sections.filter((s) => s?.id && s.status === 'active') : [];

export const fetchAboutUs = async (): Promise<AboutUsData | null> => {
  try {
    if (!API_BASE_URL) return null;
    const response = await fetch(`${API_BASE_URL}/api/v1/about-us`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 3600 }
    });
    if (!response.ok) return null;
    const result: AboutUsResponse = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("fetchAboutUs error:", error);
    return null;
  }
};
