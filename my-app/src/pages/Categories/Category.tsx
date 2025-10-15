import React from "react";
import { fetchCategories } from "../../data/listings";
import { CategoryType } from "../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Spin } from "antd";
import { ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Categories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await fetchCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        // Navigate to listings page with category filter
        navigate(`/listings?category=${categoryId}`);
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

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            padding: "40px 32px"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Premium Header */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "60px"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                        marginBottom: "16px"
                    }}>
                        <div style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)"
                        }}>
                            <ShoppingOutlined style={{ color: "#ffffff", fontSize: "24px" }} />
                        </div>
                        <Title level={1} style={{
                            margin: 0,
                            fontSize: "48px",
                            fontWeight: 700,
                            color: "#1a1a1a",
                            letterSpacing: "-0.02em"
                        }}>
                            Categories
                        </Title>
                    </div>
                    <Text style={{
                        fontSize: "20px",
                        color: "#6b7280",
                        fontWeight: 400
                    }}>
                        Explore our wide range of product categories
                    </Text>
                </div>

                {/* Categories Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "32px",
                    marginBottom: "40px"
                }}>
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            style={{
                                background: "#ffffff",
                                borderRadius: "24px",
                                padding: "32px 24px",
                                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
                                border: "1px solid rgba(255, 255, 255, 0.8)",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-8px)";
                                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)";
                                // Show arrow
                                const arrow = e.currentTarget.querySelector('.hover-arrow') as HTMLElement;
                                if (arrow) arrow.style.opacity = "1";
                                // Show overlay
                                const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                                if (overlay) overlay.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)";
                                // Hide arrow
                                const arrow = e.currentTarget.querySelector('.hover-arrow') as HTMLElement;
                                if (arrow) arrow.style.opacity = "0";
                                // Hide overlay
                                const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                                if (overlay) overlay.style.opacity = "0";
                            }}
                        >
                            {/* Category Image */}
                            <div style={{
                                position: "relative",
                                marginBottom: "24px"
                            }}>
                                <div style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto",
                                    border: "3px solid #ffffff",
                                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
                                }}>
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                
                                {/* Hover Arrow */}
                                <div 
                                    className="hover-arrow"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "-8px",
                                        transform: "translateY(-50%)",
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #fc5c65 0%, #ff6b7a 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        opacity: 0,
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 4px 12px rgba(252, 92, 101, 0.3)"
                                    }}
                                >
                                    <ArrowRightOutlined style={{ 
                                        color: "#ffffff", 
                                        fontSize: "14px",
                                        marginLeft: "2px"
                                    }} />
                                </div>
                            </div>

                            {/* Category Name */}
                            <Title level={3} style={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#1f2937",
                                margin: 0,
                                marginBottom: "8px",
                                letterSpacing: "-0.01em"
                            }}>
                                {cat.name}
                            </Title>

                            {/* Category Description */}
                            <Text style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                fontWeight: 400
                            }}>
                                Browse {cat.name.toLowerCase()} items
                            </Text>

                            {/* Gradient Overlay on Hover */}
                            <div 
                                className="hover-overlay"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(252, 92, 101, 0.05) 0%, rgba(255, 107, 122, 0.05) 100%)",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                    borderRadius: "24px"
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
                    borderRadius: "24px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)"
                }}>
                    <Title level={3} style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "#1f2937",
                        marginBottom: "12px"
                    }}>
                        Can't find what you're looking for?
                    </Title>
                    <Text style={{
                        fontSize: "16px",
                        color: "#6b7280",
                        marginBottom: "24px",
                        display: "block"
                    }}>
                        Browse all products in our marketplace
                    </Text>
                    <button
                        onClick={() => navigate("/listings")}
                        style={{
                            background: "linear-gradient(135deg, #fc5c65 0%, #ff6b7a 100%)",
                            color: "#ffffff",
                            border: "none",
                            padding: "12px 32px",
                            borderRadius: "12px",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "0 4px 12px rgba(252, 92, 101, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(252, 92, 101, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(252, 92, 101, 0.3)";
                        }}
                    >
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
}