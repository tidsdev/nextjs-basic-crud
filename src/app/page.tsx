//create fist page
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div
        data-aos="fade-right"
        className="flex items-center justify-center min-h-screen"
      >
        <h1 className="text-4xl font-bold">Welcome to My Next.js App!</h1>
      </div>
    </>
  );
}
