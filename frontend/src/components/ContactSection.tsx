import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { SiTiktok, SiDiscord, SiTelegram, SiMedium, SiDevdotto, SiDribbble, SiBehance } from "react-icons/si";
import type { ContactSettings } from "../services/settingsApi";

interface ContactSectionProps {
  contact: ContactSettings;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email:  "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await emailjs. send(
        'service_d87ca08',
        'template_dczzy9n',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'uk-ATivG4wo_aDTl8'
      );

      console.log('✅ Email sent successfully:', result);
      setStatus("success");
      setFormData({ name: "", email:  "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error('❌ Email send failed:', error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // NEW: Icon mapping for platforms
  const getIconForPlatform = (platform: string) => {
    const icons: Record<string, any> = {
      'GitHub': Github,
      'LinkedIn': Linkedin,
      'Twitter': Twitter,
      'Instagram':  Instagram,
      'YouTube': Youtube,
      'Facebook':  Facebook,
      'TikTok': SiTiktok,
      'Discord': SiDiscord,
      'Telegram':  SiTelegram,
      'Medium': SiMedium,
      'Dev.to':  SiDevdotto,
      'Dribbble': SiDribbble,
      'Behance': SiBehance,
    };
    return icons[platform] || Mail;
  };

  // NEW: Format display value (username/handle)
  const getDisplayValue = (platform: string, url: string) => {
    const cleanUrl = url.replace(/\/$/, '');
    const parts = cleanUrl.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    
    if (platform === 'GitHub' || platform === 'Twitter' || platform === 'Instagram' || platform === 'TikTok') {
      return `@${last}`;
    }
    if (platform === 'LinkedIn' || platform === 'Dev.to' || platform === 'Medium') {
      return `/${last}`;
    }
    return last || url;
  };

  // Contact info (email & location)
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email || "your@email.com",
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value:  contact.location || "Your Location",
      href: null,
    },
  ];

  // NEW: Dynamic social links from settings
  const socialLinks = contact.socialLinks.map(link => ({
    icon: getIconForPlatform(link.platform),
    label: link.platform,
    value: getDisplayValue(link.platform, link.url),
    href: link.url. startsWith('http') ? link.url : `https://${link.url}`,
  }));

  return (
    <section
      id="contact"
      data-scroll-section
      className="px-6 md:px-20 py-20 bg-gradient-to-b from-transparent to-gray-900/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-4">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
              Get In Touch
            </p>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Contact Me
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's work together
            to create something amazing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left:  Contact Info */}
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Whether it's web
                development, network infrastructure, or cloud solutions - let's
                talk! 
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="group">
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-center gap-4 p-4 bg-gray-700/50 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 rounded-lg border border-gray-600 hover:border-indigo-500/50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <info.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          <p className="text-white font-semibold group-hover:text-indigo-400 transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <info.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          <p className="text-white font-semibold">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links - DYNAMIC!  */}
            {socialLinks.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-4">Follow Me</h4>
                <div className="space-y-3">
                  {socialLinks. map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-gray-700/50 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 rounded-lg border border-gray-600 hover:border-indigo-500/50 transition-all duration-300 group"
                      >
                        <IconComponent
                          size={20}
                          className="text-gray-400 group-hover:text-indigo-400 transition-colors"
                        />
                        <div>
                          <p className="text-gray-400 text-sm">{social.label}</p>
                          <p className="text-white font-semibold group-hover:text-indigo-400 transition-colors">
                            {social.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Send size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Quick Response</h4>
                  <p className="text-gray-300 text-sm">
                    I typically respond within 24 hours.  For urgent inquiries,
                    feel free to connect on LinkedIn! 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right:  Contact Form */}
          <div className="animate-fadeIn delay-200">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 space-y-6"
            >
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-semibold mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ... formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus: ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="John Doe"
                  disabled={status === "sending"}
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target. value })
                  }
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus: border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="john@example.com"
                  disabled={status === "sending"}
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-semibold mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData. message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  placeholder="Tell me about your project, idea, or just say hi!"
                  disabled={status === "sending"}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover: from-indigo-700 hover:to-purple-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled: cursor-not-allowed disabled:transform-none"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent! 
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={20} />
                    Try Again
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === "success" && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
                  <CheckCircle size={20} className="text-green-400" />
                  <p className="text-green-300">
                    Thanks for reaching out! I'll get back to you soon. 
                  </p>
                </div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
                  <AlertCircle size={20} className="text-red-400" />
                  <p className="text-red-300">
                    Oops! Something went wrong. Please try again or email me
                    directly at {contact.email}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}