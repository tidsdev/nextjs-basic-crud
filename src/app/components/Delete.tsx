const DeleteProduct = async (id: string) => {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (confirmed) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Product deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete product");
    }
  }
};

export default DeleteProduct;
