import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    // <Link to={`/product/${product.id}`} className="block group">
    <Card
      hoverable
      cover={
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Tag color="blue">{product.category}</Tag>
            {product.isNew && <Tag color="green">New</Tag>}
          </div>
        </div>
      }
    >
      <Card.Meta
        title={
          <h3 className="font-semibold text-md line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        }
        description={
          <div className="text-lg font-bold text-blue-600">
            ${product.price}
          </div>
        }
      />
    </Card>
    // </Link>
  );
}
