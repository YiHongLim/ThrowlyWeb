import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpecificListing, fetchCategories } from "../../data/listings";
import { fetchSpecificUser } from "../../data/userApi";
import { Button, Card, Typography, Tag, Spin, Divider, Avatar } from "antd";
import { ArrowLeftOutlined, GiftOutlined, ShoppingCartOutlined, HeartOutlined, ShareAltOutlined, BulbOutlined } from "@ant-design/icons";
import { ProductType, CategoryType, UserType } from "../../types";

const { Title, Text, Paragraph } = Typography;

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductType | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [seller, setSeller] = useState<UserType | null>(null);
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

                // Fetch seller data if product exists
                if (listings?.userId) {
                    const sellerData = await fetchSpecificUser(listings.userId);
                    setSeller(sellerData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setProduct(null);
                setSeller(null);
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

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
        return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    };

    // Helper function to get seller display name
    const getSellerDisplayName = () => {
        if (seller) {
            return `${seller.firstName} ${seller.lastName}`.trim() || seller.username || "Anonymous User";
        }
        return "Anonymous User";
    };

    // Helper function to get seller initials
    const getSellerInitials = () => {
        if (seller) {
            const firstName = seller.firstName || "";
            const lastName = seller.lastName || "";
            if (firstName && lastName) {
                return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
            } else if (seller.username) {
                return seller.username.charAt(0).toUpperCase();
            }
        }
        return "U";
    };

    // Helper function to get seller profile picture
    const getSellerProfilePicture = () => {
        if (seller?.preferences && seller.preferences.length > 0) {
            return seller.preferences[0].profilePicture;
        }
        return null;
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
                                
                                {/* Price Badge */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    right: "20px",
                                    background: "#fc5c65",
                                    color: "#ffffff",
                                    padding: "12px 20px",
                                    borderRadius: "12px",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    boxShadow: "0 4px 12px rgba(252, 92, 101, 0.3)"
                                }}>
                                    <div>{displayPrice}</div>
                                    {!isFree && <div style={{ fontSize: "12px", opacity: 0.9 }}>Points</div>}
                                </div>

                                {/* Image Dots */}
                                {product.images.length > 1 && (
                                    <div style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        display: "flex",
                                        gap: "8px"
                                    }}>
                                        {product.images.map((_, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    background: selectedImageIndex === index ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => setSelectedImageIndex(index)}
                                            />
                                        ))}
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

                            {/* About the Seller Card - Moved to left side */}
                            <Card style={{
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                                marginTop: "24px"
                            }}>
                                <div style={{ padding: "24px" }}>
                                    <Title level={3} style={{
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        color: "#1f2937",
                                        marginBottom: "16px"
                                    }}>
                                        About the Seller
                                    </Title>
                                    
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px"
                                    }}>
                                        <Avatar 
                                            size={56}
                                            src={getSellerProfilePicture()}
                                            style={{
                                                background: "#3b82f6",
                                                color: "#ffffff",
                                                fontSize: "20px",
                                                fontWeight: 600
                                            }}
                                        >
                                            {getSellerInitials()}
                                        </Avatar>
                                        
                                        <div>
                                            <Text style={{
                                                fontSize: "18px",
                                                fontWeight: 600,
                                                color: "#1f2937",
                                                display: "block",
                                                marginBottom: "6px"
                                            }}>
                                                {getSellerDisplayName()}
                                            </Text>
                                            <Text style={{
                                                fontSize: "16px",
                                                color: "#6b7280",
                                                display: "block",
                                                marginBottom: "4px"
                                            }}>
                                                {seller?.numListings || 0} Listings
                                            </Text>
                                            <Text style={{
                                                fontSize: "16px",
                                                color: "#6b7280"
                                            }}>
                                                {seller?.score || 0} points
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right: Product Info */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px"
                        }}>
                            {/* Title and Price */}
                            <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px"
                                }}>
                                    <Title level={1} style={{
                                        fontSize: "32px",
                                        fontWeight: 700,
                                        color: "#1f2937",
                                        margin: 0,
                                        lineHeight: "1.2",
                                        letterSpacing: "-0.02em",
                                        flex: 1
                                    }}>
                                        {product.title}
                                    </Title>
                                    <Text style={{
                                        color: "#fc5c65",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                        marginLeft: "16px"
                                    }}>
                                        3 miles away
                                    </Text>
                                </div>
                                
                                <Text style={{
                                    color: "#6b7280",
                                    fontSize: "16px",
                                    marginBottom: "16px",
                                    display: "block"
                                }}>
                                    {formatDate(product.dateCreated)}
                                </Text>

                                {/* Drop-off Cost Button */}
                                <Button
                                    style={{
                                        background: "#fc5c65",
                                        borderColor: "#fc5c65",
                                        color: "#ffffff",
                                        borderRadius: "8px",
                                        height: "40px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        marginBottom: "24px"
                                    }}
                                >
                                    Drop-off cost $9 points
                                </Button>
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

                            {/* About this item Card */}
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
                                        About this item
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

                            {/* Market Insights Card */}
                            {product.LLMexplanation && (
                                <Card style={{
                                    borderRadius: "16px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                                    borderLeft: "4px solid #fc5c65"
                                }}>
                                    <div style={{ padding: "24px" }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginBottom: "16px"
                                        }}>
                                            <BulbOutlined style={{ color: "#fc5c65", fontSize: "20px" }} />
                                            <Title level={3} style={{
                                                fontSize: "20px",
                                                fontWeight: 600,
                                                color: "#1f2937",
                                                margin: 0
                                            }}>
                                                Market Insights
                                            </Title>
                                        </div>
                                        
                                        <Paragraph style={{
                                            fontSize: "16px",
                                            color: "#4b5563",
                                            lineHeight: "1.6",
                                            margin: 0
                                        }}>
                                            {product.LLMexplanation}
                                        </Paragraph>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}