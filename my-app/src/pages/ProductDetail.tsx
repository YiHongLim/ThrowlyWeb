import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Product Detail</h1>
      <p>Product ID: {id}</p>
      {/* You can fetch and display more product info here */}
    </div>
  );
}
