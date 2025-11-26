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

export async function fetchSiteSettings() {
  const res = await api.get<SiteSettings>("/settings");
  return res.data;
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  const res = await api.put<SiteSettings>("/settings", data);
  return res.data;
}
