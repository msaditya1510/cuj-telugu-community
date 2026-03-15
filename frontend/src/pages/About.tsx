import { Layout } from "@/components/layout/Layout";
import {
Users, Heart, Target, Sparkles, Network, BookOpen,
Music, Handshake
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
// import TeamsSection from "@/components/TeamsSection";

function IllustrationCommunity() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bg1" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>
      <rect width="480" height="360" fill="url(#bg1)" />
      <circle cx="240" cy="200" r="130" fill="#fef3c7" opacity="0.5" className="il-pulse" />
      <circle cx="240" cy="200" r="100" fill="#fde68a" opacity="0.3" className="il-pulse2" />
      <g className="il-float1">
        <circle cx="120" cy="195" r="30" fill="#f59e0b" opacity="0.9" />
        <circle cx="120" cy="170" r="16" fill="#fde68a" />
        <rect x="104" y="192" width="32" height="34" rx="8" fill="#f59e0b" opacity="0.9" />
        <line x1="120" y1="195" x2="168" y2="205" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="il-float2">
        <circle cx="240" cy="195" r="34" fill="#d97706" opacity="0.9" />
        <circle cx="240" cy="168" r="18" fill="#fef3c7" />
        <rect x="222" y="193" width="36" height="36" rx="9" fill="#d97706" opacity="0.9" />
      </g>
      <g className="il-float3">
        <circle cx="360" cy="195" r="30" fill="#f59e0b" opacity="0.9" />
        <circle cx="360" cy="170" r="16" fill="#fde68a" />
        <rect x="344" y="192" width="32" height="34" rx="8" fill="#f59e0b" opacity="0.9" />
        <line x1="360" y1="195" x2="312" y2="205" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M138 210 Q180 175 222 210" stroke="#d97706" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.6" className="il-dash" />
      <path d="M258 210 Q300 175 342 210" stroke="#d97706" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.6" className="il-dash" />
      <g className="il-sparkle">
        <polygon points="80,100 83,110 93,110 85,116 88,126 80,120 72,126 75,116 67,110 77,110" fill="#fbbf24" opacity="0.8" />
        <polygon points="400,80 402,88 410,88 404,93 406,101 400,96 394,101 396,93 390,88 398,88" fill="#f59e0b" opacity="0.7" />
        <circle cx="160" cy="280" r="5" fill="#fcd34d" opacity="0.6" />
        <circle cx="320" cy="270" r="4" fill="#f59e0b" opacity="0.5" />
        <circle cx="420" cy="150" r="6" fill="#fef3c7" opacity="0.7" />
        <circle cx="60" cy="240" r="4" fill="#fbbf24" opacity="0.6" />
      </g>
      <rect x="80" y="228" width="320" height="6" rx="3" fill="#fde68a" opacity="0.4" />
      <g className="il-hearts">
        <text x="190" y="140" fontSize="18" textAnchor="middle">🧡</text>
        <text x="295" y="132" fontSize="14" textAnchor="middle">💛</text>
        <text x="240" y="108" fontSize="22" textAnchor="middle">🤝</text>
      </g>
      <text x="240" y="310" textAnchor="middle" fontSize="13" fill="#d97706" fontWeight="600" letterSpacing="4" opacity="0.7">— TOGETHER WE GROW —</text>
      <style>{`
        .il-pulse  { animation: ilPulse 3s ease-in-out infinite; transform-origin: 240px 200px; }
        .il-pulse2 { animation: ilPulse 3s ease-in-out infinite 0.5s; transform-origin: 240px 200px; }
        @keyframes ilPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        .il-float1 { animation: ilFloat 4s ease-in-out infinite; }
        .il-float2 { animation: ilFloat 4s ease-in-out infinite 0.8s; }
        .il-float3 { animation: ilFloat 4s ease-in-out infinite 1.6s; }
        @keyframes ilFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .il-dash   { stroke-dashoffset: 100; animation: ilDash 6s linear infinite; }
        @keyframes ilDash  { to { stroke-dashoffset: 0; } }
        .il-sparkle { animation: ilSpin 8s linear infinite; transform-origin: 240px 180px; }
        @keyframes ilSpin  { to { transform: rotate(360deg); } }
        .il-hearts text { animation: ilHeart 2.5s ease-in-out infinite; }
        .il-hearts text:nth-child(2) { animation-delay: 0.5s; }
        .il-hearts text:nth-child(3) { animation-delay: 1s; }
        @keyframes ilHeart { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.15)} }
      `}</style>
    </svg>
  );
}

function IllustrationMission() {
  return (
    <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>
      <rect width="480" height="380" fill="url(#bg2)" />
      <circle cx="240" cy="190" r="120" fill="none" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.5" className="im-ring1" />
      <circle cx="240" cy="190" r="88"  fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" className="im-ring2" />
      <circle cx="240" cy="190" r="56"  fill="#fef3c7" opacity="0.6" />
      <circle cx="240" cy="190" r="36"  fill="#fde68a" opacity="0.7" />
      <circle cx="240" cy="190" r="18" fill="#d97706" className="im-target" />
      <circle cx="240" cy="190" r="7"  fill="#fffbeb" />
      <g className="im-arrow">
        <line x1="110" y1="130" x2="222" y2="183" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <polygon points="222,183 205,176 210,193" fill="#d97706" />
      </g>
      <g className="im-p1">
        <circle cx="240" cy="80" r="20" fill="#f59e0b" opacity="0.85" />
        <circle cx="240" cy="62" r="12" fill="#fef3c7" />
        <rect x="228" y="78" width="24" height="26" rx="6" fill="#f59e0b" opacity="0.85" />
      </g>
      <g className="im-p2">
        <circle cx="350" cy="160" r="18" fill="#d97706" opacity="0.85" />
        <circle cx="350" cy="144" r="11" fill="#fde68a" />
        <rect x="339" y="158" width="22" height="24" rx="6" fill="#d97706" opacity="0.85" />
      </g>
      <g className="im-p3">
        <circle cx="130" cy="240" r="18" fill="#f59e0b" opacity="0.85" />
        <circle cx="130" cy="224" r="11" fill="#fef3c7" />
        <rect x="119" y="238" width="22" height="24" rx="6" fill="#f59e0b" opacity="0.85" />
      </g>
      <g className="im-p4">
        <circle cx="310" cy="295" r="18" fill="#d97706" opacity="0.85" />
        <circle cx="310" cy="279" r="11" fill="#fde68a" />
        <rect x="299" y="293" width="22" height="24" rx="6" fill="#d97706" opacity="0.85" />
      </g>
      <line x1="240" y1="104" x2="240" y2="172" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <line x1="332" y1="168" x2="258" y2="185" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <line x1="148" y1="242" x2="222" y2="196" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <line x1="292" y1="283" x2="252" y2="206" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <rect x="56" y="96"  width="70" height="26" rx="13" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
      <text x="91" y="114" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="600">UNITY</text>
      <rect x="56" y="316" width="80" height="26" rx="13" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
      <text x="96" y="334" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="600">CULTURE</text>
      <rect x="350" y="316" width="80" height="26" rx="13" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
      <text x="390" y="334" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="600">SUPPORT</text>
      <style>{`
        .im-ring1 { animation: imRing 8s linear infinite; transform-origin:240px 190px; }
        .im-ring2 { animation: imRing 6s linear infinite reverse; transform-origin:240px 190px; }
        @keyframes imRing { to { transform: rotate(360deg); } }
        .im-target { animation: imPulse 2s ease-in-out infinite; transform-origin:240px 190px; }
        @keyframes imPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .im-arrow  { animation: imArrow 2s ease-in-out infinite; }
        @keyframes imArrow { 0%,100%{opacity:1;transform:translateX(0)} 50%{opacity:0.7;transform:translateX(4px)} }
        .im-p1 { animation: imFloat 3.5s ease-in-out infinite; }
        .im-p2 { animation: imFloat 3.5s ease-in-out infinite 0.7s; }
        .im-p3 { animation: imFloat 3.5s ease-in-out infinite 1.4s; }
        .im-p4 { animation: imFloat 3.5s ease-in-out infinite 2.1s; }
        @keyframes imFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </svg>
  );
}

function IllustrationWhatWeDo() {
  return (
    <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bg3" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>
      <rect width="480" height="380" fill="url(#bg3)" />
      <ellipse cx="240" cy="310" rx="180" ry="22" fill="#fde68a" opacity="0.4" />
      <rect x="60" y="280" width="360" height="30" rx="6" fill="#fef3c7" opacity="0.6" />
      <rect x="228" y="30" width="24" height="10" rx="4" fill="#f59e0b" opacity="0.7" />
      <path d="M220 40 L260 40 L290 120 L190 120 Z" fill="#fef3c7" opacity="0.35" />
      <ellipse cx="240" cy="120" rx="50" ry="10" fill="#fbbf24" opacity="0.2" />
      <g className="iw-dancer">
        <circle cx="240" cy="195" r="24" fill="#d97706" opacity="0.9" />
        <circle cx="240" cy="170" r="15" fill="#fef3c7" />
        <rect x="226" y="192" width="28" height="28" rx="7" fill="#d97706" opacity="0.9" />
        <line x1="226" y1="200" x2="200" y2="178" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
        <line x1="254" y1="200" x2="280" y2="178" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className="iw-left">
        <circle cx="140" cy="210" r="20" fill="#f59e0b" opacity="0.85" />
        <circle cx="140" cy="192" r="13" fill="#fde68a" />
        <rect x="127" y="208" width="26" height="26" rx="7" fill="#f59e0b" opacity="0.85" />
      </g>
      <g className="iw-right">
        <circle cx="340" cy="210" r="20" fill="#f59e0b" opacity="0.85" />
        <circle cx="340" cy="192" r="13" fill="#fde68a" />
        <rect x="327" y="208" width="26" height="26" rx="7" fill="#f59e0b" opacity="0.85" />
      </g>
      <g className="iw-notes">
        <text x="100" y="160" fontSize="22">♪</text>
        <text x="360" y="155" fontSize="18">♫</text>
        <text x="175" y="135" fontSize="16">♩</text>
        <text x="295" y="140" fontSize="20">♬</text>
      </g>
      <g className="iw-confetti">
        <rect x="170" y="65" width="8" height="8" rx="2" fill="#f59e0b" opacity="0.7" transform="rotate(30 174 69)" />
        <rect x="295" y="72" width="7" height="7" rx="2" fill="#fbbf24" opacity="0.7" transform="rotate(-20 298 75)" />
        <circle cx="130" cy="90" r="5" fill="#f59e0b" opacity="0.6" />
        <circle cx="355" cy="82" r="4" fill="#fef3c7" opacity="0.8" />
        <rect x="210" y="50" width="6" height="6" rx="1" fill="#fcd34d" opacity="0.7" transform="rotate(45 213 53)" />
        <rect x="260" y="45" width="7" height="7" rx="2" fill="#d97706" opacity="0.6" transform="rotate(-15 263 48)" />
      </g>
      <circle cx="90"  cy="258" r="10" fill="#fde68a" opacity="0.5" />
      <circle cx="115" cy="256" r="10" fill="#fcd34d" opacity="0.4" />
      <circle cx="365" cy="258" r="10" fill="#fde68a" opacity="0.5" />
      <circle cx="390" cy="256" r="10" fill="#fcd34d" opacity="0.4" />
      <text x="240" y="348" textAnchor="middle" fontSize="13" fill="#d97706" fontWeight="600" letterSpacing="3" opacity="0.7">— CELEBRATE TOGETHER —</text>
      <style>{`
        .iw-dancer { animation: iwDance 1.2s ease-in-out infinite alternate; transform-origin:240px 200px; }
        @keyframes iwDance { from{transform:rotate(-6deg)} to{transform:rotate(6deg)} }
        .iw-left  { animation: iwBob 2s ease-in-out infinite 0.4s; }
        .iw-right { animation: iwBob 2s ease-in-out infinite 0.8s; }
        @keyframes iwBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .iw-notes text { animation: iwNote 2.5s ease-in-out infinite; }
        .iw-notes text:nth-child(2) { animation-delay:0.5s; }
        .iw-notes text:nth-child(3) { animation-delay:1s; }
        .iw-notes text:nth-child(4) { animation-delay:1.5s; }
        @keyframes iwNote { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.2)} }
        .iw-confetti rect,.iw-confetti circle { animation: iwConf 3s ease-in-out infinite; }
        .iw-confetti rect:nth-child(2){ animation-delay:0.6s; }
        .iw-confetti circle:nth-child(3){ animation-delay:1.2s; }
        .iw-confetti circle:nth-child(4){ animation-delay:0.9s; }
        .iw-confetti rect:nth-child(5){ animation-delay:1.8s; }
        .iw-confetti rect:nth-child(6){ animation-delay:2.4s; }
        @keyframes iwConf { 0%{transform:translateY(0)} 50%{transform:translateY(12px)} 100%{transform:translateY(0)} }
      `}</style>
    </svg>
  );
}

function IllustrationVision() {
  return (
    <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bg4" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>
      <rect width="480" height="380" fill="url(#bg4)" />
      <ellipse cx="240" cy="330" rx="200" ry="18" fill="#fef3c7" opacity="0.5" />
      <path d="M240 300 Q240 220 240 140" stroke="#fde68a" strokeWidth="3" strokeDasharray="7 5" fill="none" opacity="0.7" className="iv-road" />
      <g className="iv-n1">
        <circle cx="240" cy="100" r="28" fill="#d97706" opacity="0.9" />
        <text x="240" y="107" textAnchor="middle" fontSize="18" fill="white">★</text>
      </g>
      <g className="iv-n2">
        <circle cx="130" cy="190" r="22" fill="#f59e0b" opacity="0.85" />
        <text x="130" y="197" textAnchor="middle" fontSize="14" fill="white">🏛</text>
      </g>
      <g className="iv-n3">
        <circle cx="350" cy="180" r="22" fill="#f59e0b" opacity="0.85" />
        <text x="350" y="187" textAnchor="middle" fontSize="14" fill="white">🎓</text>
      </g>
      <g className="iv-n4">
        <circle cx="100" cy="285" r="18" fill="#fbbf24" opacity="0.8" />
        <text x="100" y="292" textAnchor="middle" fontSize="12" fill="white">📚</text>
      </g>
      <g className="iv-n5">
        <circle cx="380" cy="275" r="18" fill="#fbbf24" opacity="0.8" />
        <text x="380" y="282" textAnchor="middle" fontSize="12" fill="white">🌱</text>
      </g>
      <g className="iv-n6">
        <circle cx="240" cy="285" r="18" fill="#d97706" opacity="0.8" />
        <text x="240" y="292" textAnchor="middle" fontSize="12" fill="white">👥</text>
      </g>
      <line x1="240" y1="128" x2="148" y2="178" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="240" y1="128" x2="332" y2="169" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="130" y1="212" x2="118" y2="267" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="350" y1="202" x2="362" y2="257" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="118" y1="285" x2="222" y2="285" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="258" y1="285" x2="362" y2="277" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" className="iv-line" />
      <line x1="152" y1="194" x2="220" y2="278" stroke="#fcd34d" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
      <line x1="328" y1="188" x2="260" y2="278" stroke="#fcd34d" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
      <g className="iv-stars">
        <text x="60"  y="120" fontSize="16">✦</text>
        <text x="415" y="130" fontSize="14">✦</text>
        <text x="200" y="54"  fontSize="12">✦</text>
        <text x="290" y="58"  fontSize="16">✦</text>
      </g>
      <text x="240" y="355" textAnchor="middle" fontSize="13" fill="#d97706" fontWeight="600" letterSpacing="3" opacity="0.7">— GROWING TOGETHER —</text>
      <style>{`
        .iv-n1 { animation: ivBob 3s ease-in-out infinite; transform-origin:240px 100px; }
        .iv-n2 { animation: ivBob 3s ease-in-out infinite 0.5s; transform-origin:130px 190px; }
        .iv-n3 { animation: ivBob 3s ease-in-out infinite 1s; transform-origin:350px 180px; }
        .iv-n4 { animation: ivBob 3.5s ease-in-out infinite 1.5s; transform-origin:100px 285px; }
        .iv-n5 { animation: ivBob 3.5s ease-in-out infinite 2s; transform-origin:380px 275px; }
        .iv-n6 { animation: ivBob 3.5s ease-in-out infinite 0.8s; transform-origin:240px 285px; }
        @keyframes ivBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .iv-road { stroke-dashoffset:200; animation: ivRoad 4s linear infinite; }
        @keyframes ivRoad { to { stroke-dashoffset: 0; } }
        .iv-line { animation: ivFade 3s ease-in-out infinite; }
        @keyframes ivFade { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .iv-stars text { animation: ivStar 2s ease-in-out infinite; }
        .iv-stars text:nth-child(2){ animation-delay:0.5s; }
        .iv-stars text:nth-child(3){ animation-delay:1s; }
        .iv-stars text:nth-child(4){ animation-delay:1.5s; }
        @keyframes ivStar { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
      `}</style>
    </svg>
  );
}

/* ─── CONTENT DATA ───────────────────────────────────────── */

const missionItems = [
{
icon: Heart,
title: "Belonging",
description:
"To create a welcoming space where Telugu students at CUJ can connect, feel at home, and build meaningful friendships while studying away from their hometowns."
},
{
icon: Users,
title: "Community Support",
description:
"University life becomes easier when students support one another. Our community encourages collaboration, guidance, and shared experiences."
},
{
icon: Target,
title: "Cultural Connection",
description:
"We strive to keep Telugu language, traditions, and identity alive by celebrating them together within the university environment."
}
];

const whatWeDo = [
{
icon: Users,
title: "Community Gatherings",
description:
"We organize meetups where Telugu students can connect, build friendships, and strengthen their community."
},
{
icon: Sparkles,
title: "Cultural Celebrations",
description:
"Festivals and cultural events allow students to celebrate Telugu traditions together on campus."
},
{
icon: Music,
title: "Talent & Creativity",
description:
"Students express themselves through music, dance, storytelling, and artistic performances during community events."
},
{
icon: Handshake,
title: "Collaboration",
description:
"Members work together to organize initiatives, share ideas, and create activities that enrich campus life."
}
];

const visionItems = [
{
icon: Network,
title: "A Strong Student Network",
description:
"To build meaningful connections among Telugu students that continue even beyond university years."
},
{
icon: BookOpen,
title: "Shared Growth",
description:
"To create a space where students exchange knowledge, opportunities, and experiences."
},
{
icon: Heart,
title: "A Lasting Community",
description:
"To ensure every Telugu student studying away from home still feels connected to their roots and culture."
}
];

/* ─── HOOKS ───────────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
const ref = useRef(null);

useEffect(() => {
const el = ref.current;
if (!el) return;

const obs = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add("visible");
      obs.disconnect();
    }
  },
  { threshold }
);

obs.observe(el);

return () => obs.disconnect();


}, [threshold]);

return ref;
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */

function ScrollProgress() {
const [pct, setPct] = useState(0);

useEffect(() => {
const fn = () => {
const doc = document.documentElement;
const s = doc.scrollTop || document.body.scrollTop;
const t = doc.scrollHeight - doc.clientHeight;


  setPct(t > 0 ? (s / t) * 100 : 0);
};

window.addEventListener("scroll", fn, { passive: true });

return () => window.removeEventListener("scroll", fn);


}, []);

return (
<div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 999 }}>
<div
style={{
height: "100%",
width: `${pct}%`,
background: "linear-gradient(90deg,#d97706,#fbbf24)",
transition: "width 0.1s linear"
}}
/> </div>
);
}

/* ─── HELPERS ─────────────────────────────────────────────── */

function SectionLabel({ children, light = false }) {
return (
<p
className={`text-xs font-semibold tracking-[0.22em] uppercase mb-3 ${
        light ? "text-amber-200" : "text-amber-600"
      }`}
>
{children} </p>
);
}

function SectionHeading({ children, light = false, amber = false, center = false }) {
return (
<div className={`flex items-start gap-3 mb-5 ${center ? "justify-center" : ""}`}>
{!center && (
<div
style={{
width: 4,
minHeight: 44,
background: "linear-gradient(180deg,#d97706,#fbbf24)",
borderRadius: 99,
flexShrink: 0,
marginTop: 6
}}
/>
)}

  <h2
    className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ${
      light ? "text-white" : amber ? "text-amber-600" : "text-gray-800"
    } ${center ? "text-center" : ""}`}
  >
    {children}
  </h2>
</div>

);
}

function Divider() {
const ref = useReveal(0.3);

return ( <div ref={ref} className="reveal-fade px-6 my-2">
<div
style={{
height: 1,
background:
"linear-gradient(90deg,transparent,#fde68a 30%,#d97706 50%,#fde68a 70%,transparent)"
}}
/> </div>
);
}

function FadeUp({ children, delay = 0 }) {
const ref = useReveal();

return (
<div ref={ref} className="reveal-fade-up" style={{ transitionDelay: `${delay}ms` }}>
{children} </div>
);
}

function SlideLeft({ children }) {
const ref = useReveal();
return <div ref={ref} className="reveal-slide-left">{children}</div>;
}

function SlideRight({ children }) {
const ref = useReveal();
return <div ref={ref} className="reveal-slide-right">{children}</div>;
}

/* ─── PAGE ───────────────────────────────────────────────── */

export default function About() {

  useEffect(()=>{
document.title="About CUJ Telugu Community"
},[])
return ( <Layout>


  <ScrollProgress />

  <div className="w-full min-h-screen bg-white text-gray-700">


{/* HERO */}

<section className="text-center pt-36 pb-28 px-6 border-b border-gray-100 mb-20 mt-20">

  <div className="pt-19 hero-title ">


<h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 relative inline-block">
  About The Community
  <span className="absolute left-1/2 bottom-[-12px] h-[4px] bg-amber-500 rounded-full hero-underline"/>
</h1>


  </div>

  <div className="shloka-line mt-12 max-w-2xl mx-auto">


<p className="text-gray-600 text-base md:text-lg leading-relaxed italic font-medium">
  "A journey becomes lighter when walked together, and a place becomes home when hearts connect."
</p>


  </div>

  <div className="hero-sub mt-6 max-w-xl mx-auto">

<p className="text-gray-500 text-base md:text-lg leading-relaxed">

  The Telugu Community at Central University of Jharkhand connects students,
  alumni and faculty through shared culture, traditions and meaningful
  community relationships.

</p>

  </div>

</section>

{/* WHO WE ARE */}

<section className="max-w-5xl mx-auto px-6 py-20">

<div className="grid md:grid-cols-2 gap-8 items-center">

<FadeUp>

<SectionHeading amber>Who We Are</SectionHeading>

<p className="text-gray-400 text-sm md:text-base italic mb-5 -mt-2">
A home away from home
</p>

<p className="text-gray-500 leading-relaxed text-sm md:text-base">

When students move away from home to pursue education,
they often miss familiar language, culture and connections.

This community was created to bring Telugu students together so they can stay
connected to their roots while building friendships and experiences
during their university journey.

</p>

</FadeUp>

<SlideRight>

<div style={{width:"100%",aspectRatio:"4/3"}}>
<IllustrationCommunity/>

</div>

</SlideRight>

</div>

</section>

<Divider/>

{/* MISSION */}

<section className="max-w-5xl mx-auto px-6 py-20">

<div className="grid md:grid-cols-2 gap-8 items-center">

<SlideLeft>
<div style={{width:"100%",aspectRatio:"4/3"}}>
  <IllustrationMission/> 
</div>
</SlideLeft>

<div>

<FadeUp>

<SectionLabel>The Community's Purpose</SectionLabel>

<SectionHeading>Our Mission</SectionHeading>

<p className="text-gray-400 text-sm md:text-base italic mb-5 -mt-2">
Why we exist
</p>

</FadeUp>

<div className="flex flex-col gap-4">

{missionItems.map((item,i)=>{

const Icon=item.icon

return(

<FadeUp key={i} delay={i*150}>

<div className="stagger-card flex gap-4 border border-gray-100 rounded-xl p-4 transition-all duration-300">

<div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">

<Icon size={16} className="text-amber-600"/>

</div>

<div>

<h3 className="font-semibold text-gray-800 text-sm mb-1">
{item.title}
</h3>

<p className="text-gray-500 text-sm leading-relaxed">
{item.description}
</p>

</div>

</div>

</FadeUp>

)

})}

</div>

</div>

</div>

</section>

<Divider/>

{/* WHAT WE DO */}

<section className="max-w-5xl mx-auto px-6 py-20">

<div className="grid md:grid-cols-2 gap-8 items-center">

<div>

<FadeUp>

<SectionLabel>Activities & Initiatives</SectionLabel>

<SectionHeading>What We Do</SectionHeading>

<p className="text-gray-400 text-sm md:text-base italic mb-5 -mt-2">
How we bring people together
</p>

</FadeUp>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

{whatWeDo.map((item,i)=>{

const Icon=item.icon

return(

<FadeUp key={i} delay={i*150}>

<div className="stagger-card border border-gray-100 rounded-xl p-4 h-full transition-all duration-300">

<div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-3">

<Icon size={15} className="text-amber-600"/>

</div>

<h3 className="font-semibold text-gray-800 text-sm mb-1">
{item.title}
</h3>

<p className="text-gray-500 text-xs leading-relaxed">
{item.description}
</p>

</div>

</FadeUp>

)

})}

</div>

</div>

<SlideRight>

<div style={{width:"100%",aspectRatio:"4/3"}}>
<IllustrationWhatWeDo/>
</div>

</SlideRight>

</div>

</section>

<Divider/>

{/* VISION */}

<section className="max-w-5xl mx-auto px-6 py-20">

<div className="grid md:grid-cols-2 gap-8 items-center">

<SlideLeft>
<div style={{width:"100%",aspectRatio:"4/3"}}>
<IllustrationVision/>
</div>
</SlideLeft>

<div>

<FadeUp>

<SectionLabel>Looking Ahead</SectionLabel>

<SectionHeading>Our Vision</SectionHeading>

<p className="text-gray-400 text-sm md:text-base italic mb-5 -mt-2">
The future we hope to build
</p>

</FadeUp>

<div className="flex flex-col gap-4">

{visionItems.map((item,i)=>{

const Icon=item.icon

return(

<FadeUp key={i} delay={i*150}>

<div className="stagger-card flex gap-4 border border-gray-100 rounded-xl p-4 transition-all duration-300">

<div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">

<Icon size={16} className="text-amber-600"/>

</div>

<div>

<h3 className="font-semibold text-gray-800 text-sm mb-1">
{item.title}
</h3>

<p className="text-gray-500 text-sm leading-relaxed">
{item.description}
</p>

</div>

</div>

</FadeUp>

)

})}

</div>

</div>

</div>

</section>

<Divider/>

{/* TEAMS */}

{/* <TeamsSection/> */}

</div>

</Layout>

)

}
