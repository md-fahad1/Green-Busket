"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FbPixelTracker() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    const ReactPixel = require("react-facebook-pixel"); // dynamically import

    const FB_PIXEL_ID = "YOUR_PIXEL_ID"; // Replace with your ID

    if (!initialized.current) {
      ReactPixel.default.init(FB_PIXEL_ID);
      ReactPixel.default.pageView();
      initialized.current = true;
    } else {
      ReactPixel.default.pageView();
    }
  }, [pathname]);

  return null;
}
