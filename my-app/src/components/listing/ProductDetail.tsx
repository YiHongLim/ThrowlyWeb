import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchSpecificListing} from "../../data/listings";
import {Button, Card} from "antd";

export function ProductDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const listings = await fetchSpecificListing(id || "");
            console.log("Fetched specific listing:", listings);
            setProduct(listings);
        };
        fetchData();
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-6">
            <div className="mx-auto container px-4 py-8">
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-8 items-start">
                        {/* Left: Image */}
                        <div>
                            <img
                                src={product.images[0].url || '/fallback.jpg'}
                                alt={product.title}
                                className="w-full h-96 object-contain"
                            />
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

                            <Card>
                                <div className="p-2">
                                    <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                                </div>
                                <div className="p-2 pt-0">
                                    <p className="text-base text-gray-600">
                                        {product.description}
                                    </p>
                                </div>
                            </Card>

                            <div className="flex gap-6">
                                <Button
                                    onClick={() => navigate("/listings")}
                                >
                                    Back to Products
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}