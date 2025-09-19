import {useState} from "react";
import {
    ProductCard,
    type Product,
} from "../../components/listing/ProductCard";

import reactLogo from "../../assets/logo192.png";
import {Layout, Button, Card} from "antd";
import {ProductSidebar} from "../../components/listing/ProductSideBar";

const {Sider, Content} = Layout;
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

export function ProductListing() {
    const [products] = useState<Product[]>(sampleProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string>("");

    // Filter products by search query
    let filteredProducts = products.filter((product) => {
        // Search filter
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        return matchesSearch && matchesCategory;
    });

    // Sort products by price
    if (priceSort === "low-to-high") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <div>
            <Card
                style={{ margin: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
            >
            <Layout style={{padding: "12px 24px", backgroundColor: "white"}}>
                <div>
                    <Sider
                        width={280}
                        style={{marginRight: "24px"}}
                    >
                        <ProductSidebar
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                            priceSort={priceSort}
                            onPriceSortChange={setPriceSort}
                        />
                    </Sider>
                </div>
                <Content>
                    <div className="mx-auto px-4 py-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Listings
                            </h1>
                            <p className="text-lg text-gray-600">
                                Search and browse our listings
                            </p>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "16px",
                            width: "100%"
                        }}>
                            <Button style={{marginRight: "8px"}} type="primary">Add Listing</Button>
                        </div>

                        <div>
                            <div className="mt-8">
                                {filteredProducts.length === 0 ? (
                                    <div className="text-center py-12">
                                        <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                            No items found
                                        </h3>
                                        <p className="text-gray-400">Try a different search term</p>
                                    </div>
                                ) : (
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredProducts.map((product) => (
                                            <ProductCard key={product.id} product={product}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
            </Card>

        </div>
    );
}
