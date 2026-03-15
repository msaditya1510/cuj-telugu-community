// components/CountUp.tsx
"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number; // in ms
}

export default function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = 16; // ~60fps
    const increment = end / (duration / stepTime);

    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.ceil(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end); // final value
      }
    }

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}+</span>;
}
