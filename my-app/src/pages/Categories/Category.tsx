import React from "react";
import { fetchCategories } from "../../data/listings";
import { CategoryType } from "../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Spin } from "antd";

const { Title } = Typography;

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
        navigate(`/listings?category=${categoryId}`);
    };

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "#ffffff",
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
            background: "#ffffff",
            padding: "40px 32px"
        }}>
            <div style={{
                width: "100%",
                margin: "0 auto"
            }}>
                <div style={{ marginBottom: "32px" }}>
                    <Title level={1} style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#000000",
                        margin: 0
                    }}>
                        Category
                    </Title>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "40px 24px",
                    width: "100%"
                }}>
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "transform 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <div style={{
                                width: "140px",
                                height: "140px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "3px solid #ffffff",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                marginBottom: "12px",
                                background: "#f3f4f6"
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

                            <Title level={4} style={{
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#000000",
                                margin: 0,
                                textAlign: "center",
                                lineHeight: "1.2"
                            }}>
                                {cat.name}
                            </Title>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}