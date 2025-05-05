"use client";
import { usePathname } from "next/navigation";

const ConditionalBanner = () => {
  const pathName = usePathname();

  if (pathName === "/login") {
    console.log("Pathname is not /login, rendering banner.");
    return <></>;
  }

  return (
    <div className="bg-gray-100 h-[70vh] flex flex-col items-center justify-center">
      <div data-aos="fade-right">
        <h1 className="text-6xl font-bold mb-4">Lorem ipsum dolor sit amet.</h1>
        <p className="text-1xl w-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, hic.
        </p>
      </div>
    </div>
  );
};

export default ConditionalBanner;
