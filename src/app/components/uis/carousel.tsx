"use client";
import dynamic from "next/dynamic";
import React from "react";
// import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Image from "next/image";
const Carousel = dynamic(() => import("react-material-ui-carousel"), {
  ssr: false,
});
const Example = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "lorem ipsum dolor sit amet",
      img: "/img/thumb-1920-1378608.png",
    },
    {
      name: "Random Name #2",
      description: "lorem3",
      img: "/img/1383293.jpg",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      img: "/img/bluelock_chigirihyomacharacterpvscreenshot.webp",
    },
    {
      name: "Random Name #4",
      description: "Hello World!",
      img: "/img/thumb-1920-1385117.png",
    },
    {
      name: "Random Name #5",
      description: "Hello World!",
      img: "/img/thumb-1920-1368251.png",
    },
  ];

  return (
    <Carousel
      key={items.map((item) => item.img).join(",")} //ใช้ key เพื่อบังคับการรีเรนเดอร์
      navButtonsAlwaysVisible={true} // แสดงปุ่มนำทางเสมอ
      indicators={true} // ซ่อนจุดบอกตำแหน่ง
      autoPlay={false} // ปิด autoplay
      animation="fade" // ใช้เอฟเฟกต์ slide
      className="relative"
      sx={{
        width: "100%",
        height: "78vh",
        margin: "0 auto",
        "& .MuiPaper-root": {
          backgroundColor: "transparent", // ทำให้พื้นหลังของ Carousel โปร่งใส
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <div className="relative w-[90%] mx-auto h-[70vh] mt-4">
      {/* พื้นหลังเบลอ */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.item.img}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="blur-md mask-y-to-cyan-100 rounded-md w-auto h-auto"
        />
      </div>

      {/* เนื้อหาด้านหน้า */}
      <Paper className="relative w-full h-full flex flex-col items-center justify-center bg-white/80 shadow-lg">
        <Image
          src={props.item.img}
          alt="Product"
          width={800}
          height={400}
          objectFit="cover"
          className="rounded-md hover:scale-101 duration-300"
          quality={100}
          loading="lazy"
        />
        <div className="text-center absolute bottom-0 left-0 right-0 p-4 bg-white/30 rounded-b-md shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mt-4 mb-4 bg">{props.item.name}</h2>
        </div>
      </Paper>
    </div>
  );
};

export default Example;
