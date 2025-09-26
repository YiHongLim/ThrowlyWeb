import {Card} from "antd";
import {Link} from "react-router-dom";
import {ProductType} from "../../types";


interface ProductCardProps {
    product: ProductType;
}

export function ProductCard({product}: ProductCardProps) {

    return (
        <Link to={`/listings/${product.geohash}`} className="block group">
            <Card
                hoverable
                cover={
                    <div className="relative overflow-hidden" style={{maxHeight: '250px'}}>
                        <img
                            src={product.images[0]?.url || '/fallback.jpg'}
                            alt={product.title}
                            className="h-12 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
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
                        <span className="text-lg font-bold text-blue-600" style={{color: 'black'}}>
                            ${product.price}
                        </span>
                    }
                />
            </Card>
        </Link>
    );
}
