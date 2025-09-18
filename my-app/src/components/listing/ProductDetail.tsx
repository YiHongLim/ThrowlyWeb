import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  // Fetch or find the product by id here
  return (
    <div>
      <h1>Product Detail for ID: {id}</h1>
      {/* Render product details here */}
    </div>
  );
}