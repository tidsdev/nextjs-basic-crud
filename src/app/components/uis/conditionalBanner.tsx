"use client";

import { usePathname } from "next/navigation";
import Example from "./carousel"; // Assuming this is the path to your Example component

const ConditionalBanner = () => {
  const pathName = usePathname();

  if (pathName === "/login") {
    console.log("Pathname is not /login, rendering banner.");
    return <></>;
  }

  return (
    <Example />
  );
};

export default ConditionalBanner;