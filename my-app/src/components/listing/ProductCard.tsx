import { Card, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";

import { useState } from "react";

interface ProductCardProps {
    product: ProductType;
}

// Image loader component
function ImageWithLoader({ src, alt }: { src: string; alt?: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ width: "100%", maxHeight: 200, position: "relative", overflow: "hidden" }}>
            {loading && (
                <Skeleton.Image
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                style={{
                    display: loading ? "none" : "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    );
}


export function ProductCard({ product }: ProductCardProps) {

    return (
        <Link to={`/listings/${product.id}`} className="block group">
            <Card
                hoverable
                cover={
                    <ImageWithLoader
                        src={product.images[0]?.url || "/fallback.jpg"}
                        alt={product.title}
                    />
                }
            >
                <Card.Meta
                    title={
                        <h3 className="font-semibold text-md line-clamp-2">
                            {product.title}
                        </h3>
                    }
                    description={
                        <span className="text-lg font-bold text-blue-600" style={{ color: "#fc5c65" }}>
                            ${product.price}
                        </span>
                    }
                />
            </Card>
        </Link>
    );
}
