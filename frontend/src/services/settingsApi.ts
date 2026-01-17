import api from "./api";

export interface HeroSettings {
  name: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImageUrl: string;
}

export interface AboutSettings {
  headline: string;
  description: string;
  skills:  string[];
}

// NEW: Social Link interface
export interface SocialLink {
  platform:  string;
  url: string;
}

export interface ContactSettings {
  email: string;
  location: string;
  socialLinks: SocialLink[];  // NEW!
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  contact: ContactSettings;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const res = await api.get<SiteSettings>("/settings");
  return res.data;
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>,
  token?: string
): Promise<SiteSettings> {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  const res = await api.put<SiteSettings>("/settings", data, config);
  return res.data;
}

export async function uploadImage(file: File, token?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const res = await api.post<{ url: string }>("/uploads", formData, config);
  return res.data.url;
}

export default {
  fetchSiteSettings,
  updateSiteSettings,
  uploadImage,
};