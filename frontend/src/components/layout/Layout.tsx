import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
Menu,
User,
LogOut,
Shield,
} from "lucide-react";

import { motion } from "framer-motion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Footer } from "@/components/layout/Footer";

interface LayoutProps {
children: ReactNode;
showFooter?: boolean;
}

const navItems = [
{ name: "Home", href: "/" },
{ name: "About Us", href: "/about" },
{ name: "Events", href: "/events" },
{ name: "Contact Cards", href: "/contacts" },
{ name: "Gallery", href: "/gallery" },
];


export const Layout = ({ children, showFooter = true }: LayoutProps) => {

const { user, isAuthenticated, logout, isAdmin } = useAuth();
const navigate = useNavigate();

async function handleLogout(){
  await logout();
  navigate("/");
}
const location = useLocation();
const isHomePage = location.pathname === "/";
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const onScroll = () => setScrolled(window.scrollY > 40);
window.addEventListener("scroll", onScroll);
return () => window.removeEventListener("scroll", onScroll);
}, []);

const isActive = (path: string) => location.pathname === path;

return (
<div className="min-h-screen flex flex-col bg-background text-foreground">

{/* ================= HEADER ================= */}

<header
className={`sticky top-0 z-50 w-full transition-all duration-500 ${
scrolled
? "border-b border-border bg-background/90 backdrop-blur-md shadow-sm"
: "bg-transparent"
}`}
>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex h-16 md:h-20 items-center justify-between">

{/* LOGO */}

<Link to="/" className="flex items-center gap-3">

<motion.img
src="/images/community1.png"
alt="CUJ Telugu"
className="h-10 w-10"
initial={{ opacity: 0, scale: 0.9 }}
animate={{
opacity: isHomePage ? (scrolled ? 1 : 0) : 1,
scale: isHomePage ? (scrolled ? 1 : 0.9) : 1
}}
transition={{ duration: 0.35 }}
/>

<div className="hidden sm:block leading-tight">
<div className="font-bold">CUJ Telugu</div>
<div className="text-xs text-muted-foreground">Community</div>
</div>

</Link>

{/* DESKTOP NAV */}

<nav className="hidden lg:flex items-center gap-2">

{navItems.map((item) => (
<Link
key={item.href}
to={item.href}
className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
isActive(item.href)
? "bg-accent text-accent-foreground"
: "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
}`}
>
{item.name}
</Link>
))}

{/* Admin navigation */}

{isAdmin && (
<Link
to="/admin"
className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
>
Admin
</Link>
)}

</nav>

{/* RIGHT ACTIONS */}

<div className="hidden lg:flex items-center gap-3">

{isAuthenticated ? (

<DropdownMenu>

<DropdownMenuTrigger asChild>
<Button variant="ghost">
<User className="h-5 w-5" />
</Button>
</DropdownMenuTrigger>

<DropdownMenuContent align="end">

<DropdownMenuItem asChild>
<Link to="/profile">
<User className="mr-2 h-4 w-4" />
My Profile
</Link>
</DropdownMenuItem>

{isAdmin && (

<DropdownMenuItem asChild>
<Link to="/admin/pending-users">
<Shield className="mr-2 h-4 w-4" />
Admin Panel
</Link>
</DropdownMenuItem>

)}

<DropdownMenuItem onClick={handleLogout}>
<LogOut className="mr-2 h-4 w-4" />
Logout
</DropdownMenuItem>

</DropdownMenuContent>

</DropdownMenu>

) : (

<>

<Button variant="ghost" asChild>
<Link to="/signin">Login</Link>
</Button>

<Button asChild>
<Link to="/signup">Sign Up</Link>
</Button>

</>

)}

</div>

{/* MOBILE MENU */}

<Sheet>

<SheetTrigger asChild className="lg:hidden">

<Button variant="ghost" size="icon">
<Menu className="h-6 w-6" />
</Button>

</SheetTrigger>

<SheetContent side="right" className="p-8">

<nav className="flex flex-col gap-6 mt-10">

{navItems.map((item) => (

<Link
key={item.href}
to={item.href}
className="text-lg font-medium"
>
{item.name}
</Link>

))}

{/* Admin link */}

{isAdmin && (
<Link
to="/admin/pending-users"
className="text-lg font-semibold"
>
Admin
</Link>
)}

{/* Auth actions */}

{isAuthenticated ? (

<>

<Link
to="/profile"
className="text-lg font-medium"
>
My Profile
</Link>

<button
onClick={handleLogout}
className="text-lg font-medium text-left"
>
Logout
</button>

</>

) : (

<>

<Link
to="/signin"
className="text-lg font-medium"
>
Login
</Link>

<Link
to="/signup"
className="text-lg font-medium"
>
Sign Up
</Link>

</>

)}

</nav>

</SheetContent>

</Sheet>

</div>

</div>

</header>

{/* ================= MAIN ================= */}

<main className="flex-1">
{children}
</main>

{/* ================= FOOTER ================= */}

{showFooter && <Footer />}

</div>
);
};