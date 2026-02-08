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

// Social Link interface
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

// Helper function to retry requests
async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 2,
  delay: number = 2000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries reached");
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  return retryRequest(async () => {
    const res = await api.get<SiteSettings>("/settings");
    return res.data;
  });
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