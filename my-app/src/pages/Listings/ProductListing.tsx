import {useEffect, useState} from "react";
import {
    ProductCard,
} from "../../components/listing/ProductCard";

import {Layout, Button, Card, Pagination} from "antd";
import {ProductSidebar} from "../../components/listing/ProductSideBar";
import {fetchListings} from "../../data/listings";
import {ProductType} from "../../types";

const {Sider, Content} = Layout;

export function ProductListing() {


    const [products, setProduct] = useState<ProductType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchData = async () => {
            const listings = await fetchListings();

            setProduct(listings);
            console.log("Fetched listings:", listings);
        };
            fetchData();
    }, []);


    // Filter products by search query
    let filteredProducts = products.filter((product) => {
        // Search filter
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase())

        // // Category filter
        // const matchesCategory =
        //     selectedCategories.length === 0 ||
        //     selectedCategories.includes(product.category);

        // return matchesSearch && matchesCategory;
        return matchesSearch;
    });



    // Sort products by price
    if (priceSort === "low-to-high") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }


    // Pagination calculations
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to first page when filters change
    const resetPage = () => setCurrentPage(1);

    return (
            <Layout style={{padding: "12px 24px", backgroundColor: "rgba(255,71,87,0.45)"}}>
                <div className="px-6">
                    <Card>
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
                    </Card>

                </div>
                <Card>
                    <Content className="container">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {currentProducts.map((p: ProductType) => (
                                            <ProductCard key={p.geohash} product={p}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                    {/* Pagination */}
                    {totalProducts > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination
                                current={currentPage}
                                total={totalProducts}
                                pageSize={ITEMS_PER_PAGE}
                                onChange={(page) => setCurrentPage(page)}
                                showSizeChanger={false}
                                showQuickJumper
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            />
                        </div>
                    )}
                </Card>

            </Layout>

    );
}
