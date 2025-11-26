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
  skills: string[];
}

export interface ContactSettings {
  email: string;
  location: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  contact: ContactSettings;
}

/**
 * Fetch current site settings.
 */
export async function fetchSiteSettings(): Promise<SiteSettings> {
  const res = await api.get<SiteSettings>("/settings");
  return res.data;
}

/**
 * Update site settings. If you need to pass an auth token explicitly,
 * provide it in the optional `token` argument. If your `api` axios instance
 * already attaches auth headers automatically, you can omit `token`.
 */
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

/**
 * Upload an image file to the backend upload route (/api/uploads).
 * Returns the Cloudinary secure URL (string).
 * Pass token if the upload route is protected (recommended).
 */
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