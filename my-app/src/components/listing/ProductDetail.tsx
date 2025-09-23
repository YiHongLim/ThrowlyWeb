import {useNavigate, useParams} from "react-router-dom";
import type {Product} from "./ProductCard";
import reactLogo from "../../assets/logo192.png";
import {Button} from "antd";

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

    const product = sampleProducts.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <Button type="primary">Add Listing</Button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto container px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-8 items-start">
                    {/* Left: Image */}
                    <div>
                        <div className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm overflow-hidden w-full">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-96 object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.title}</h1>
                            <div className="mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price}
                </span>
                            </div>
                        </div>

                        <div className="border border-gray-100 rounded-xl bg-white shadow-sm">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                            </div>
                            <div className="p-4 pt-0">
                                <p className="text-base text-gray-600">
                                    description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <Button
                                onClick={() => navigate("/listings")}
                            >
                                Back to Products
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">About this item</h3>
                    <p className="text-base text-gray-600">
                        Designed for everyday use with a premium build and a sound signature tuned for clarity and punch.
                        Enjoy reliable connectivity and intuitive controls that keep you in flow.
                    </p>
                </div>
            </div>
        </main>
    );
}