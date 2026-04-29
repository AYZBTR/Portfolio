import api from "./api";

export interface HeroSettings {
  name: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImageUrl: string;

  // ✅ NEW
  resumeUrl?: string;
}

export interface AboutSettings {
  headline: string;
  description: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactSettings {
  email: string;
  location: string;
  socialLinks: SocialLink[];
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
  data: SiteSettings,
  token?: string
): Promise<SiteSettings> {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.put<SiteSettings>("/settings", data, config);
  return res.data;
}

/**
 * Existing image upload helper (already used in your admin page)
 * uploads to POST /uploads
 */
export async function uploadImage(file: File, token?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.post<{ url: string }>("/uploads", formData, config);
  return res.data.url;
}

/**
 * ✅ NEW: resume upload helper (PDF)
 * uploads to POST /uploads/resume
 */
export async function uploadResume(file: File, token?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.post<{ url: string }>("/uploads/resume", formData, config);
  return res.data.url;
}