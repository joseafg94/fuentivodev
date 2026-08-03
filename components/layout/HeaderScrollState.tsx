"use client";

import { useEffect } from "react";

const headerId = "site-header";

export function HeaderScrollState() {
  useEffect(() => {
    const header = document.getElementById(headerId);

    if (!header) {
      return;
    }

    const updateHeader = () => {
      header.dataset.scrolled = String(window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return null;
}
