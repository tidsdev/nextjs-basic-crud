"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface MyOrder {
  _id: string;
  img: string;
  code: string;
  productDetails: { name: string }[]; // productDetails เป็น array ของ object ที่มีฟิลด์ name
  content: string;
  quantity: number;
  title: string;
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "No.", width: 70 },
  {
    field: "img",
    renderCell: (params) => {
      const imgBase64 = params.row.productDetails[0]?.img_base64;
      return (
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={imgBase64}
            alt="Product"
            width={80} // กำหนดขนาดความกว้าง
            height={80} // กำหนดขนาดความสูง
            className="object-cover rounded-md"
          />
        </div>
      );
    },
    headerName: "Product Image",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "productDetails",
    headerName: "Product Name",
    flex: 1,
    renderCell: (params: { row: MyOrder }) => {
      return params.row.productDetails[0]?.name || ""; // แสดงชื่อสินค้าแรกใน productDetails
    },
  },
  { field: "quantity", headerName: "Product Quantity", width: 150 },
];

const MyOrder = () => {
  const [myOrderData, setMyData] = useState<MyOrder[]>([]);
  console.log(myOrderData);
  const getMyOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myCrats`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    console.log("Fetched data:", data.myOrders);
    setMyData(data.myOrders);
  };

  useEffect(() => {
    AOS.init();
    getMyOrder();
  }, []);

  return (
    <div data-aos="fade-up">
      <DataGrid
        rows={myOrderData}
        columns={columns}
        getRowId={(row) => row._id}
        loading={myOrderData.length === 0}
      ></DataGrid>
    </div>
  );
};

export default MyOrder;
