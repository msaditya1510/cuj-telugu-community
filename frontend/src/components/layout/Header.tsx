import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
{ label: 'About Us', href: '/#about' },
{ label: 'News', href: '/news' },
{ label: 'Events', href: '/events' },
{ label: 'Gallery', href: '/gallery' },
];

export const Header = () => {
const [open, setOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

const { theme, toggleTheme } = useTheme();
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 120);
};

window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);

}, []);

const handleNav = (href: string) => {
setOpen(false);

if (href.includes('#')) {
  const [, hash] = href.split('#');
  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
} else {
  navigate(href);
}

};

return (
<header
className={cn(
"fixed top-0 inset-x-0 z-50 transition-all duration-300",
scrolled
? "bg-background/80 backdrop-blur-md border-b border-border"
: "bg-transparent border-transparent"
)}
> <div className="w-full px-4 sm:px-6"> <div className="flex h-16 md:h-20 items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">

        {/* Animated logo appearance */}
        <motion.img
          src="/images/community1.png"
          alt="CUJ Telugu"
          className="w-9 h-9"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0.6
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="hidden sm:block leading-tight">
          <div className="font-bold">CUJ Telugu</div>
          <div className="text-xs text-muted-foreground">Community</div>
        </div>

      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item.href)}
            className={cn(
              'px-4 py-2 text-sm rounded-md transition',
              location.pathname === item.href
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>

        <div className="hidden md:flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Login
          </Button>

          <Button onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>

      </div>
    </div>

    {/* Mobile Menu */}
    {open && (
      <div className="lg:hidden border-t py-3">
        <nav className="flex flex-col">

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className="px-4 py-3 text-left hover:bg-accent"
            >
              {item.label}
            </button>
          ))}

          <div className="flex gap-2 px-4 pt-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>

            <Button
              className="flex-1"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>

        </nav>
      </div>
    )}

  </div>
</header>

);
};
