// src/pages/Admin/SiteSettings.tsx

import { useEffect, useState, type ChangeEvent } from "react";
import {
  fetchSiteSettings,
  updateSiteSettings,
} from "../../services/settingsApi";
import type { SiteSettings } from "../../services/settingsApi";

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSiteSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings", err);
        setError("Failed to load site settings.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleHeroChange =
    (field: keyof SiteSettings["hero"]) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!settings) return;
      setSettings({
        ...settings,
        hero: {
          ...settings.hero,
          [field]: e.target.value,
        },
      });
    };

  const handleAboutChange =
    (field: keyof SiteSettings["about"]) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!settings) return;

      // Special: skills as comma-separated
      if (field === "skills") {
        const value = e.target.value;
        const skillsArray = value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        setSettings({
          ...settings,
          about: {
            ...settings.about,
            skills: skillsArray,
          },
        });
      } else {
        setSettings({
          ...settings,
          about: {
            ...settings.about,
            [field]: e.target.value,
          },
        });
      }
    };

  const handleContactChange =
    (field: keyof SiteSettings["contact"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!settings) return;
      setSettings({
        ...settings,
        contact: {
          ...settings.contact,
          [field]: e.target.value,
        },
      });
    };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await updateSiteSettings(settings, token);
      setSettings(updated);
      setSuccess("Settings saved successfully.");
    } catch (err) {
      console.error("Failed to save settings", err);
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex items-center justify-center pt-16">
        Loading site settings…
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-900 text-red-300 flex items-center justify-center pt-16">
        Could not load site settings.
      </div>
    );
  }

  const skillsAsText = settings.about.skills.join(", ");

  return (
    <div className="bg-slate-900 text-slate-100 px-4 py-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
        <p className="text-slate-400 mb-6">
          Update the content of your landing page. Changes will reflect on the
          public site.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/40 border border-red-700 px-4 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-emerald-900/40 border border-emerald-700 px-4 py-2 text-sm text-emerald-200">
            {success}
          </div>
        )}

        <div className="space-y-8">
          {/* HERO SETTINGS */}
          <section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.hero.name}
                  onChange={handleHeroChange("name")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Title (small text)</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.hero.title}
                  onChange={handleHeroChange("title")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  rows={3}
                  value={settings.hero.subtitle}
                  onChange={handleHeroChange("subtitle")}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">
                    Primary Button Label
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                    value={settings.hero.primaryCtaLabel}
                    onChange={handleHeroChange("primaryCtaLabel")}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">
                    Secondary Button Label
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                    value={settings.hero.secondaryCtaLabel}
                    onChange={handleHeroChange("secondaryCtaLabel")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Hero Image URL</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.hero.heroImageUrl}
                  onChange={handleHeroChange("heroImageUrl")}
                />
                <p className="text-xs text-slate-400 mt-1">
                  Later we can hook this up with Cloudinary so you can upload
                  images directly.
                </p>
              </div>
            </div>
          </section>

          {/* ABOUT SETTINGS */}
          <section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">About Section</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Headline</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.about.headline}
                  onChange={handleAboutChange("headline")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  rows={4}
                  value={settings.about.description}
                  onChange={handleAboutChange("description")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Skills (comma separated)
                </label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={skillsAsText}
                  onChange={handleAboutChange("skills")}
                />
              </div>
            </div>
          </section>

          {/* CONTACT SETTINGS */}
          <section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Section</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.contact.email}
                  onChange={handleContactChange("email")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.contact.location}
                  onChange={handleContactChange("location")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">GitHub</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.contact.github || ""}
                  onChange={handleContactChange("github")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">LinkedIn</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.contact.linkedin || ""}
                  onChange={handleContactChange("linkedin")}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Twitter</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                  value={settings.contact.twitter || ""}
                  onChange={handleContactChange("twitter")}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}