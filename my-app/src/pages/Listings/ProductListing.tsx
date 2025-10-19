import { useEffect, useState } from "react";
import { ProductCard } from "../../components/listing/ProductCard";
import { Layout, Card, Pagination, Button, Typography, Badge, Spin } from "antd";
import { ProductSidebar } from "../../components/listing/ProductSideBar";
import { fetchListings, fetchCategories } from "../../data/listings";
import { ProductType, CategoryType } from "../../types";
import SearchBar from "../../components/home/SearchBar";
import { useSearchParams } from "react-router-dom";
import { ClearOutlined, SearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { FilterChips } from "../../components/listing/FilterChip";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export function ProductListing() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProduct] = useState<ProductType[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [onResults, setOnResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const ITEMS_PER_PAGE = 12;
    const [priceFilter, setPriceFilter] = useState<string>("all");

    const searchQuery = searchParams.get('search') || '';

    const resetSearch = () => {
        setSearchParams({});
        setOnResults([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            const [listings, categoryData] = await Promise.all([fetchListings(), fetchCategories()]);
            setCategories(categoryData);
            setProduct(listings);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery && products.length > 0) {
            const queryLowerCase = searchQuery.toLowerCase();
            const filteredItems = products.filter(product =>
                product.title && product.title.toLowerCase().includes(queryLowerCase)
            );
            setOnResults(filteredItems);
        } else {
            setOnResults([]);
        }
    }, [searchQuery, products]);

    // Use search results if present; otherwise fall back to all products
    const baseList: ProductType[] = (onResults?.length ? onResults : products) as ProductType[];

    // Filters (category and price type)
    let filteredProducts = baseList.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.categoryId);

        const matchesPriceFilter = (() => {
            switch (priceFilter) {
                case "free":
                    return product.freePrice !== undefined;
                case "pay":
                    return product.freePrice === undefined && product.price !== undefined;
                case "all":
                default:
                    return true;
            }
        })();

        return matchesCategory && matchesPriceFilter;
    });

    const categoryOptions = categories.map(cat => ({
        label: cat.name,
        value: cat.id
    }));

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
    }, [selectedCategories, priceSort, priceFilter, onResults]);

    // map selected category ids -> chip data
    const selectedCategoryChips = selectedCategories
        .map(id => {
            const found = categories.find(c => c.id === id);
            return found ? { id, label: found.name } : null;
        })
        .filter(Boolean) as { id: string; label: string }[];

    const removeCategory = (id: string) => {
        setSelectedCategories(prev => prev.filter(cid => cid !== id));
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setPriceSort("");
        setPriceFilter("all");
    };

    // In ProductListing component
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
    }, [searchParams]);

    const activeFiltersCount = selectedCategories.length + (priceSort ? 1 : 0) + (priceFilter !== "all" ? 1 : 0);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
        }}>
            <Layout style={{
                background: "transparent",
                minHeight: "100vh"
            }}>
                {/* Sidebar with no margins */}
                <Sider
                    width={320}
                    style={{
                        background: "transparent"
                    }}
                >
                    <ProductSidebar
                        selectedCategories={selectedCategories}
                        onCategoryChange={setSelectedCategories}
                        priceSort={priceSort}
                        onPriceSortChange={setPriceSort}
                        categoriesName={categoryOptions}
                    />
                </Sider>

                {/* Vertical Divider */}
                <div style={{
                    width: "1px",
                    background: "linear-gradient(180deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)",
                    minHeight: "100vh"
                }} />

                {/* Main Content Area - no margins */}
                <Content style={{
                    background: "transparent",
                    flex: 1,
                    height: "100vh",
                    overflow: "hidden"
                }}>
                    <div style={{
                        background: "#ffffff",
                        height: "100vh",
                        padding: "0",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        {/* Premium Header */}
                        <div style={{
                            padding: "32px 40px 24px",
                            borderBottom: "1px solid #f0f2f5",
                            background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
                            flexShrink: 0
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "24px"
                            }}>
                                <div>
                                    <Title level={2} style={{
                                        margin: 0,
                                        fontSize: "28px",
                                        fontWeight: 700,
                                        color: "#1a1a1a",
                                        letterSpacing: "-0.02em",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px"
                                    }}>
                                        <div style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "16px",
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)"
                                        }}>
                                            <ShoppingOutlined style={{ color: "#ffffff", fontSize: "20px" }} />
                                        </div>
                                        Product Listings
                                    </Title>
                                    <Text style={{
                                        color: "#6b7280",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        marginTop: "8px",
                                        display: "block"
                                    }}>
                                        Discover amazing products from our marketplace
                                    </Text>
                                </div>

                                {activeFiltersCount > 0 && (
                                    <Badge
                                        count={activeFiltersCount}
                                        style={{
                                            backgroundColor: "#fc5c65",
                                            boxShadow: "0 4px 12px rgba(252, 92, 101, 0.3)"
                                        }}
                                    />
                                )}
                            </div>

                            {/* Search Section */}
                            <div style={{ marginBottom: "24px" }}>
                                <SearchBar onResults={setOnResults} />
                            </div>

                            {/* Search Results Display */}
                            {searchQuery && (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "16px 20px",
                                    background: "linear-gradient(135deg, #fef3f2 0%, #fef7f7 100%)",
                                    borderRadius: "16px",
                                    border: "1px solid #fecaca",
                                    marginBottom: "24px"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <SearchOutlined style={{ color: "#fc5c65", fontSize: "18px" }} />
                                        <Text style={{
                                            fontSize: "15px",
                                            fontWeight: 500,
                                            color: "#374151"
                                        }}>
                                            Showing results for: <strong style={{ color: "#1f2937" }}>"{searchQuery}"</strong>
                                        </Text>
                                    </div>
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<ClearOutlined />}
                                        onClick={resetSearch}
                                        style={{
                                            color: "#fc5c65",
                                            border: "1px solid #fecaca",
                                            borderRadius: "8px",
                                            height: "32px",
                                            fontWeight: 500
                                        }}
                                    >
                                        Clear Search
                                    </Button>
                                </div>
                            )}

                            {/* Price Filter Toggle Buttons */}
                            <div style={{ marginBottom: "8px" }}>
                                <Text style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#6b7280",
                                    marginBottom: "12px",
                                    display: "block"
                                }}>
                                    Price Type
                                </Text>
                                <div style={{
                                    display: "flex",
                                    background: "#f8fafc",
                                    borderRadius: "8px",
                                    padding: "2px",
                                    border: "1px solid #e2e8f0",
                                    width: "fit-content"
                                }}>
                                    {[
                                        { value: "all", label: "All" },
                                        { value: "free", label: "Free" },
                                        { value: "pay", label: "Pay" }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setPriceFilter(option.value)}
                                            style={{
                                                padding: "8px 16px",
                                                borderRadius: "6px",
                                                border: "none",
                                                background: priceFilter === option.value
                                                    ? "#fc5c65"
                                                    : "transparent",
                                                color: priceFilter === option.value
                                                    ? "#ffffff"
                                                    : "#64748b",
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                boxShadow: priceFilter === option.value
                                                    ? "0 1px 4px rgba(252, 92, 101, 0.3)"
                                                    : "none",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div style={{
                            padding: "32px 40px",
                            flex: 1,
                            overflowY: "auto"
                        }}>
                            {/* Results Header */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "32px"
                            }}>
                                <div>
                                    {!loading && (
                                        <Text style={{
                                            fontSize: "14px",
                                            color: "#6b7280",
                                            marginLeft: "8px"
                                        }}>
                                            Page {currentPage} of {totalPages}
                                        </Text>
                                    )}
                                </div>

                                {activeFiltersCount > 0 && (
                                    <Button
                                        type="text"
                                        onClick={clearAllFilters}
                                        style={{
                                            color: "#6b7280",
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }}
                                    >
                                        Clear all filters
                                    </Button>
                                )}
                            </div>

                            {/* Products Grid */}
                            {loading ? (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "400px"
                                }}>
                                    <Spin size="large" />
                                </div>
                            ) : currentProducts.length > 0 ? (
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                    gap: "24px",
                                    marginBottom: "48px"
                                }}>
                                    {currentProducts.map((p: ProductType) => (
                                        <ProductCard key={p.id} product={p} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: "center",
                                    padding: "80px 20px",
                                    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                                    borderRadius: "16px",
                                    border: "1px solid #e2e8f0"
                                }}>
                                    <div style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 24px"
                                    }}>
                                        <ShoppingOutlined style={{ color: "#64748b", fontSize: "32px" }} />
                                    </div>
                                    <Title level={4} style={{ color: "#374151", marginBottom: "8px" }}>
                                        No products found
                                    </Title>
                                    <Text style={{ color: "#6b7280", fontSize: "16px" }}>
                                        Try adjusting your filters or search terms
                                    </Text>
                                </div>
                            )}

                            {/* Premium Pagination */}
                            {totalProducts > 0 && totalPages > 1 && (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "32px 0",
                                    borderTop: "1px solid #f0f2f5"
                                }}>
                                    <Pagination
                                        current={currentPage}
                                        total={totalProducts}
                                        pageSize={ITEMS_PER_PAGE}
                                        onChange={(page) => setCurrentPage(page)}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        showTotal={(total, range) => (
                                            <Text style={{ color: "#6b7280", fontSize: "14px" }}>
                                                Showing {range[0]}-{range[1]} of {total} items
                                            </Text>
                                        )}
                                        className="premium-pagination"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}