import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Image from "next/image";

const Example = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: "/img/thumb-1920-1378608.png",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: "/img/thumb-1920-1385117.png",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <div className="relative w-full h-[70vh]">
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
      <Paper className="relative w-full h-full flex flex-col items-center justify-center bg-white/80 shadow-lg rounded-lg p-6">
        <Image
          src={props.item.img}
          alt="Product"
          width={800}
          height={400}
          objectFit="cover"
          className="rounded-md"
          quality={100}
        />
        <h2 className="text-2xl font-bold mt-4">{props.item.name}</h2>
        <p className="text-gray-600 mt-2">{props.item.description}</p>
      </Paper>
    </div>
  );
};

export default Example;