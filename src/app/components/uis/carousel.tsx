import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import Image from "next/image";

const Example = () => {
  var items = [
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
    <Paper>
      {Image && (
        <Image
          src={props.item.img}
          alt="Product"
          width={300}
          height={300}
          className="object-cover w-full h-[80vh]"
        />
      )}
      <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
    </Paper>
  );
};

export default Example;
