import {useNavigate, useParams} from "react-router-dom";
import type {Product} from "./ProductCard";
import reactLogo from "../../assets/logo192.png";
import {Button, Card, Tag} from "antd";

const sampleProducts: Product[] = [
    {
        id: "1",
        title: "Premium Wireless Headphones",
        price: 199,
        image: reactLogo,
        category: "Audio",
        isNew: true,
    },
    {
        id: "2",
        title: "Smart Fitness Watch",
        price: 299,
        image: reactLogo,
        category: "Wearables",
    },
    {
        id: "3",
        title: "Professional Leather Backpack",
        price: 159,
        image: reactLogo,
        category: "Bags",
    },
    {
        id: "4",
        title: "Mechanical Gaming Keyboard",
        price: 129,
        image: reactLogo,
        category: "Electronics",
        isNew: true,
    },
    {
        id: "5",
        title: "Wireless Earbuds Pro",
        price: 149,
        image: reactLogo,
        category: "Audio",
    },
    {
        id: "6",
        title: "Luxury Travel Bag",
        price: 229,
        image: reactLogo,
        category: "Bags",
    },
];

export function ProductDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    // Fetch or find the product by id here
    const product = sampleProducts.find((p) => p.id === id);
    if (!product) {
        return (
            <div className="!min-h-screen !bg-gray-50 !flex !items-center !justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <Button onClick={() => navigate('/')} type="primary">
                        Back to Products
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Left: Image */}
                    <div>
                        <div className="relative bg-white border rounded-lg p-8 shadow-sm">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-12 object-cover rounded-lg"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Tag color="blue">{product.category}</Tag>
                                {product.isNew && <Tag color="green">New</Tag>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                            <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price}
                </span>
                            </div>
                        </div>

                        <Card title="Descriptions">
                            <p className="text-lg text-gray-600">
                                description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud.
                            </p>
                        </Card>

                        <div className="mt-2">
                            <Button onClick={() => navigate("/listing")}>Back to Products</Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}