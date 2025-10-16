import {useEffect, useState} from "react";
import {ProductCard} from "../../components/listing/ProductCard";
import {Layout, Card, Pagination, Button} from "antd";
import {ProductSidebar} from "../../components/listing/ProductSideBar";
import {fetchListings, fetchCategories} from "../../data/listings";
import {ProductType,CategoryType} from "../../types";
import SearchBar from "../../components/home/SearchBar";
import { useSearchParams } from "react-router-dom";
import { ClearOutlined } from "@ant-design/icons"; 

const {Sider, Content} = Layout;

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

    const searchQuery = searchParams.get('search') || '';

    const resetSearch = () => {
        setSearchParams({}); // Clear all URL parameters
        setOnResults([]); // Clear search results
    };

    useEffect(() => {
        const fetchData = async () => {
            const [listings, categoryData ]= await Promise.all([fetchListings(), fetchCategories()]);
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


    const priceOnlyProducts = products.filter(
        (product) => product.price !== undefined && product.freePrice === undefined
    );
    const freePriceProducts = products.filter(
        (product) => product.freePrice !== undefined
    );
    console.log("free: ",freePriceProducts);
    console.log("not free: ",priceOnlyProducts);


    // Use search results if present; otherwise fall back to all products
    const baseList: ProductType[] =
        (onResults?.length ? onResults : products) as ProductType[];

    // Filters (category, etc.)
    let filteredProducts = baseList.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.categoryId); // Use categoryId instead of category
        return matchesCategory;
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
                            categoriesName={categoryOptions}
                        />
                    </Sider>
                </Card>
            </div>

            <Card>
                <Content className="container">
                    <div className="mx-auto px-4 py-8">


                        <div className="text-center">
                            <p className="text-lg text-gray-600">Search and browse our listings</p>
                        </div>
                        {searchQuery && (
                            <div className="text-center mb-4">
                                <div className="flex items-center justify-center gap-4">
                                    <p className="text-sm text-gray-500">
                                        Showing results for: <strong>"{searchQuery}"</strong>
                                    </p>
                                    <Button 
                                        type="default" 
                                        size="small"
                                        icon={<ClearOutlined />}
                                        onClick={resetSearch}
                                        style={{color: '#fc5c65', borderColor: '#fc5c65'}}
                                    >
                                        Clear Search
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div>
                            <SearchBar onResults={setOnResults}/>
                        </div>
                        <div className="mt-8 mb-8">
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
