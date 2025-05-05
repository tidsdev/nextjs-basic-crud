import { ObjectId } from "mongoose";

export interface Product{
  _id: string;
  name: string;
  code : string;
  img_base64: string;
  description: string;
  price: number;
  stock_quantity: number;
}