import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp' },
  { icon: Instagram, href: 'https://www.instagram.com/cuj_telugu_community', label: 'Instagram' },
  // { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@cujtelugucommunity', label: 'YouTube' },
];

export const Footer = () => {
  return (
    <footer id="about" className="bg-card border-t">
      {/* FULL WIDTH */}
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">త</span>
              </div>
              <div>
                <div className="font-bold">CUJ Telugu Community</div>
                <div className="text-xs text-muted-foreground">తెలుగు సమాజం</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A united Telugu community at Central University of Jharkhand —
              culture, connection, and collaboration.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Home', 'Events', 'Gallery', 'Contact'].map((l) => (
                <Link
                  key={l}
                  to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center
                             hover:bg-primary hover:text-primary-foreground transition"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CUJ Telugu Community · CUJ, Ranchi
        </div>
      </div>
    </footer>
  );
};
