"use client";
import { useEffect, useState } from "react";

export default function useScreenResize() {
  const [size, setSize] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function resizeHandler() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return size;
}
