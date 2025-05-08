"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Example = dynamic(() => import("./carousel"), { ssr: false });

const ConditionalBanner = () => {
  const pathName = usePathname();

  if (pathName === "/login") {
    console.log("Pathname is not /login, rendering banner.");
    return <></>;
  }

  return (
    // <div className="bg-gray-100 h-[70vh] flex flex-col items-center justify-center">
    //   <div data-aos="fade-right">
       
    //   </div>
    // </div>
    <Example />
  );
};

export default ConditionalBanner;