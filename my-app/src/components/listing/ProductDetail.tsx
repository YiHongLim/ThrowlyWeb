import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecificListing, fetchCategories } from "../../data/listings";
import { Button, Card, Typography, Tag, Spin, Divider } from "antd";
import { ArrowLeftOutlined, GiftOutlined, ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { ProductType, CategoryType } from "../../types";

const { Title, Text, Paragraph } = Typography;

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductType | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listings, categoryData] = await Promise.all([
                    fetchSpecificListing(id || ""),
                    fetchCategories()
                ]);
                setProduct(listings);
                setCategories(categoryData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Helper function to get category name by ID
    const getCategoryName = (categoryId: string) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
    };

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{ textAlign: "center" }}>
                    <Title level={2} style={{ color: "#374151", marginBottom: "16px" }}>
                        Product not found
                    </Title>
                    <Button 
                        type="primary" 
                        onClick={() => navigate("/listings")}
                        style={{
                            background: "#fc5c65",
                            borderColor: "#fc5c65",
                            borderRadius: "8px",
                            height: "40px",
                            fontWeight: 600
                        }}
                    >
                        Back to Products
                    </Button>
                </div>
            </div>
        );
    }

    const isFree = product.freePrice !== undefined;
    const displayPrice = isFree ? "FREE" : `$${product.price}`;

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            padding: "24px"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Back Button */}
                <div style={{ marginBottom: "24px" }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/listings")}
                        style={{
                            color: "#6b7280",
                            fontSize: "16px",
                            fontWeight: 500,
                            height: "40px",
                            padding: "0 16px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0"
                        }}
                    >
                        Back to Products
                    </Button>
                </div>

                {/* Main Product Card */}
                <Card style={{
                    borderRadius: "24px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    overflow: "hidden"
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "48px",
                        padding: "40px"
                    }}>
                        {/* Left: Images */}
                        <div>
                            {/* Main Image */}
                            <div style={{
                                position: "relative",
                                marginBottom: "16px"
                            }}>
                                <img
                                    src={product.images[selectedImageIndex]?.url || '/fallback.jpg'}
                                    alt={product.title}
                                    style={{
                                        width: "100%",
                                        height: "500px",
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                        border: "1px solid #e2e8f0"
                                    }}
                                />
                                
                                {/* Free Tag */}
                                {isFree && (
                                    <div style={{
                                        position: "absolute",
                                        top: "16px",
                                        right: "16px",
                                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        color: "#ffffff",
                                        padding: "8px 16px",
                                        borderRadius: "24px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        letterSpacing: "0.5px",
                                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    }}>
                                        <GiftOutlined style={{ fontSize: "12px" }} />
                                        FREE
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {product.images.length > 1 && (
                                <div style={{
                                    display: "flex",
                                    gap: "12px",
                                    overflowX: "auto",
                                    paddingBottom: "8px"
                                }}>
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.url}
                                            alt={`${product.title} ${index + 1}`}
                                            onClick={() => setSelectedImageIndex(index)}
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                border: selectedImageIndex === index 
                                                    ? "2px solid #fc5c65" 
                                                    : "1px solid #e2e8f0",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                flexShrink: 0
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Product Info */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px"
                        }}>
                            {/* Title and Price */}
                            <div>
                                <Title level={1} style={{
                                    fontSize: "32px",
                                    fontWeight: 700,
                                    color: "#1f2937",
                                    marginBottom: "16px",
                                    lineHeight: "1.2",
                                    letterSpacing: "-0.02em"
                                }}>
                                    {product.title}
                                </Title>
                                
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    marginBottom: "24px"
                                }}>
                                    {isFree ? (
                                        <div style={{
                                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                            color: "#ffffff",
                                            padding: "12px 24px",
                                            borderRadius: "12px",
                                            fontSize: "24px",
                                            fontWeight: 700,
                                            letterSpacing: "0.5px",
                                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                                        }}>
                                            FREE
                                        </div>
                                    ) : (
                                        <Text style={{
                                            fontSize: "36px",
                                            fontWeight: 700,
                                            color: "#fc5c65",
                                            letterSpacing: "-0.02em"
                                        }}>
                                            ${product.price}
                                        </Text>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{
                                display: "flex",
                                gap: "12px",
                                marginBottom: "24px"
                            }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                    style={{
                                        background: "#fc5c65",
                                        borderColor: "#fc5c65",
                                        borderRadius: "12px",
                                        height: "48px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        flex: 1,
                                        boxShadow: "0 4px 12px rgba(252, 92, 101, 0.3)"
                                    }}
                                >
                                    {isFree ? "Get for Free" : "Add to Cart"}
                                </Button>
                                
                                <Button
                                    size="large"
                                    icon={<HeartOutlined />}
                                    style={{
                                        borderRadius: "12px",
                                        height: "48px",
                                        width: "48px",
                                        border: "1px solid #e2e8f0"
                                    }}
                                />
                                
                                <Button
                                    size="large"
                                    icon={<ShareAltOutlined />}
                                    style={{
                                        borderRadius: "12px",
                                        height: "48px",
                                        width: "48px",
                                        border: "1px solid #e2e8f0"
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <Card style={{
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                            }}>
                                <div style={{ padding: "24px" }}>
                                    <Title level={3} style={{
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        color: "#1f2937",
                                        marginBottom: "16px"
                                    }}>
                                        Description
                                    </Title>
                                    
                                    <Paragraph style={{
                                        fontSize: "16px",
                                        color: "#4b5563",
                                        lineHeight: "1.6",
                                        margin: 0
                                    }}>
                                        {product.description}
                                    </Paragraph>
                                </div>
                            </Card>

                            {/* Product Details */}
                            <Card style={{
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                            }}>
                                <div style={{ padding: "24px" }}>
                                    <Title level={3} style={{
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        color: "#1f2937",
                                        marginBottom: "16px"
                                    }}>
                                        Product Details
                                    </Title>
                                    
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "8px 0"
                                        }}>
                                            <Text style={{ color: "#6b7280", fontWeight: 500 }}>Category</Text>
                                            <Tag color="blue" style={{ borderRadius: "6px" }}>
                                                {getCategoryName(product.categoryId)}
                                            </Tag>
                                        </div>
                                        
                                        <Divider style={{ margin: "8px 0" }} />
                                        
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "8px 0"
                                        }}>
                                            <Text style={{ color: "#6b7280", fontWeight: 500 }}>Price Type</Text>
                                            <Tag 
                                                color={isFree ? "green" : "orange"} 
                                                style={{ borderRadius: "6px" }}
                                            >
                                                {isFree ? "Free" : "Paid"}
                                            </Tag>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}