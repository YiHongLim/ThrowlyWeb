import {useEffect, useState} from "react";
import {ProductCard} from "../../components/listing/ProductCard";
import {Layout, Card, Pagination, Skeleton} from "antd";
import {ProductSidebar} from "../../components/listing/ProductSideBar";
import {fetchListings} from "../../data/listings";
import {ProductType} from "../../types";
import SearchBar from "../../components/home/SearchBar";
import bgImage from "../../assets/images/blob-scene-haikei.png"

const {Sider, Content} = Layout;

export function ProductListing() {
    const [products, setProduct] = useState<ProductType[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [onResults, setOnResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchData = async () => {
            const listings = await fetchListings();
            setProduct(listings);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Use search results if present; otherwise fall back to all products
    const baseList: ProductType[] =
        (onResults?.length ? onResults : products) as ProductType[];

    // Filters (category, etc.)
    let filteredProducts = baseList.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes((product as any)?.category ?? "");
        return matchesCategory;
    });

    // Sort (avoid mutating state arrays)
    if (priceSort === "low-to-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    // Pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to first page when filters or search results change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, priceSort, onResults]);

    return (
        <Layout style={{padding: "12px 24px"}}>
            <div className="px-6">
                <Card>
                    <Sider width={280} style={{marginRight: "24px"}}>
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
                            <h1 className="text-4xl font-bold mb-4" style={{color: '#fc5c65'}}>Listings</h1>
                            <p className="text-lg text-gray-600">Search and browse our listings</p>
                        </div>

                        <div>
                            <SearchBar onResults={setOnResults}/>
                        </div>
                        <div className="mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentProducts.map((p: ProductType) => (
                                    <ProductCard key={p.id} product={p}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </Content>

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
