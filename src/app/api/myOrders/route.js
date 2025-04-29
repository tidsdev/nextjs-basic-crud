import MyOrder from "../../../../models/myOrder";

export async function AddOrder(req){
  const { id } = await req.params;
  console.log("++++++++++++");
  console.log(id);
  const { productId, status } = await req.json();
  await connectMongoDB();
  await MyOrder.create({
    productId,
    status,
  })
  return NextResponse.json(
    { message: "Order created successfully" },
    { status: 201 }
  );
}