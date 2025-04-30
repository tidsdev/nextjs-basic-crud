"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface MyOrder {
  _id: string;
  img: string;
  code: string;
  productDetails: { title: string }[]; // productDetails เป็น array ของ object ที่มีฟิลด์ name
  content: string;
  quantity: number;
  title:string;
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "No.", width: 70 },
  {
    field: "img",
    headerName: "Product Image",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  { field: "code", headerName: "Product Code", width: 150 },
  // { field: "productDetails", headerName: "Product Name", flex: 1 ,
  //   valueGetter: (params : {row : MyOrder}) => {
  //   return params.row.productDetails?.[0]?.title || "N/A";
  // }},
  { field: "content", headerName: "Product Description", flex: 1 },
  { field: "quantity", headerName: "Product Quantity", width: 150 },
];

const MyOrder = () => {
  const [myOrderData, setMyData] = useState<MyOrder[]>([]);
  const getMyOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myOrders`,
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
    setMyData(data.myOrders);
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <div>
      <DataGrid
        rows={myOrderData}
        columns={columns}
        getRowId={(row) => row._id}
      ></DataGrid>
    </div>
  );
};

export default MyOrder;
