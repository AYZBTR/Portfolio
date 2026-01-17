import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSettings {
  name: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImageUrl:  string;
}

export interface IAboutSettings {
  headline: string;
  description: string;
  skills: string[];
}

// NEW: Social Link interface
export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IContactSettings {
  email: string;
  location: string;
  socialLinks:  ISocialLink[];  // NEW! 
}

export interface ISiteSettings extends Document {
  hero: IHeroSettings;
  about: IAboutSettings;
  contact: IContactSettings;
}

const HeroSchema = new Schema<IHeroSettings>({
  name: { type: String, default: "Aayush" },
  title: { type:  String, default: "Full-Stack Developer" },
  subtitle:  {
    type: String,
    default: 
      "I specialize in the MERN stack — crafting fast, scalable, and beautifully designed applications with clean architecture.",
  },
  primaryCtaLabel: { type: String, default: "View Projects" },
  secondaryCtaLabel: { type: String, default: "Contact Me" },
  heroImageUrl: { type: String, default: "" },
});

const AboutSchema = new Schema<IAboutSettings>({
  headline: { type:  String, default: "About Me" },
  description: {
    type: String,
    default:
      "I'm a passionate full-stack developer focused on building modern, fast, and scalable web apps.",
  },
  skills: {
    type: [String],
    default: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "TailwindCSS",
    ],
  },
});

// NEW: Social Link Schema
const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required:  true },
  url: { type: String, required: true },
});

const ContactSchema = new Schema<IContactSettings>({
  email: { type: String, default: "yourmail@example.com" },
  location: { type: String, default: "Your City, Country" },
  socialLinks: { type: [SocialLinkSchema], default: [] },  // NEW!
});

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    hero: { type: HeroSchema, default: () => ({}) },
    about: { type: AboutSchema, default: () => ({}) },
    contact: { type: ContactSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>(
  "SiteSettings",
  SiteSettingsSchema
);