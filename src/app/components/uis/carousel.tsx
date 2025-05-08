import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Image from "next/image";

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
      navButtonsAlwaysVisible={true} // แสดงปุ่มนำทางเสมอ
      indicators={true} // ซ่อนจุดบอกตำแหน่ง
      autoPlay={true} // ปิด autoplay
      animation="slide" // ใช้เอฟเฟกต์ slide
      className="relative"
      sx={{
        "& .MuiPaper-root": {
          overflow: "visible", // ทำให้ภาพข้างๆแสดงบางส่วน
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
    <div className="relative w-[90%] mx-auto h-[70vh]">
      {/* พื้นหลังเบลอ */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.item.img}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="blur-md"
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
          className="rounded-md"
          quality={100}
        />
        <h2 className="text-2xl font-bold mt-4 mb-4">{props.item.name}</h2>
      </Paper>
    </div>
  );
};

export default Example;