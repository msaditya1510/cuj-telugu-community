import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const HeroSection = () => {

const { user } = useAuth();

const displayName =
user?.preferredName ||
user?.name ||
user?.userName ||
"";

return ( <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden bg-gradient-to-b from-orange-50 via-amber-100 to-[#faf7f2] pb-28">

  {/* Floating background blobs */}

  <motion.div
    className="absolute top-10 left-10 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.35)_0%,_rgba(99,102,241,0)_70%)] -z-10 pointer-events-none"
    animate={{ y: [0, -30, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35)_0%,_rgba(56,189,248,0)_70%)] -z-10 pointer-events-none"
    animate={{ y: [0, 30, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Soft spotlight */}

  <div className="absolute w-[500px] h-[500px] bg-orange-200 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

  {/* Logo */}

  <motion.img
    src="/images/community1.png"
    alt="CUJ Telugu Community"
    className="relative w-44 md:w-60 z-10"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
    transition={{
      opacity: { duration: 0.8 },
      scale: { duration: 0.8 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
  />

  {/* Greeting */}

  {user && (
    <motion.p
      className="mt-4 text-orange-600 font-semibold text-xl z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Welcome back, {displayName} 
    </motion.p>
  )}

  {/* Title */}

  <motion.h1
    className="relative mt-4 text-4xl md:text-6xl font-bold text-slate-800 z-10"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    CUJ Telugu Community
  </motion.h1>

  {/* Animated underline */}

  <motion.div
    className="h-[3px] bg-orange-500 rounded-full mt-4 z-10"
    initial={{ width: 0 }}
    animate={{ width: 140 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  />

  {/* Subtitle */}

  <motion.p
    className="relative mt-5 text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7 }}
  >
    Bringing Telugu students, alumni and faculty together at{" "}
    <span className="font-semibold text-slate-800">
      Central University of Jharkhand
    </span>
  </motion.p>

  {/* Buttons */}

  <motion.div
    className="flex gap-4 mt-10 flex-wrap justify-center z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >

    {user ? (
      <Link
        to="/contacts"
        className="px-7 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        Explore Community
      </Link>
    ) : (
      <Link
        to="/signup"
        className="px-7 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        Join Community
      </Link>
    )}

    <Link
      to="/events"
      className="px-7 py-3 rounded-xl bg-white border border-gray-200 font-semibold hover:bg-gray-50 hover:scale-105 transition"
    >
      Explore Events
    </Link>

  </motion.div>

  {/* Scroll hint */}

  <motion.div
    className="absolute bottom-16 text-gray-600 text-sm pb-10 pointer-events-none"
    animate={{ y: [0, 10, 0] }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
    }}
  >
    ↓ Scroll
  </motion.div>

</section>


);
};
