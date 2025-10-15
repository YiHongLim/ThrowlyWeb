import { Card, Skeleton, Tag } from "antd";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";
import { useState } from "react";
import { GiftOutlined } from "@ant-design/icons";

interface ProductCardProps {
    product: ProductType;
}

// Image loader component
function ImageWithLoader({ src, alt }: { src: string; alt?: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ 
            width: "100%", 
            height: "280px", 
            position: "relative", 
            overflow: "hidden",
            borderRadius: "12px 12px 0 0"
        }}>
            {loading && (
                <Skeleton.Image
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                style={{
                    display: loading ? "none" : "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    );
}

export function ProductCard({ product }: ProductCardProps) {
    const isFree = product.freePrice !== undefined;
    const displayPrice = isFree ? "FREE" : `$${product.price}`;

    return (
        <Link to={`/listings/${product.id}`} style={{ textDecoration: "none" }}>
            <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)";
            }}
            >
                {/* Image Container */}
                <div style={{ position: "relative" }}>
                    <ImageWithLoader
                        src={product.images[0]?.url || "/fallback.jpg"}
                        alt={product.title}
                    />
                    
                    {/* Free Tag */}
                    {isFree && (
                        <div style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "#ffffff",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                        }}>
                            <GiftOutlined style={{ fontSize: "10px" }} />
                            FREE
                        </div>
                    )}
                </div>

                {/* Content */}
                <div style={{
                    padding: "12px 16px 16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {/* Title */}
                    <div style={{ marginBottom: "2px" }}>
                        <h3 style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#1f2937",
                            margin: 0,
                            lineHeight: "1.3",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "20px"
                        }}>
                            {product.title}
                        </h3>
                    </div>

                    {/* Price */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto"
                    }}>
                        {isFree ? (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "2px"
                            }}>
                                <div style={{
                                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                    color: "#ffffff",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px"
                                }}>
                                    FREE
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                fontSize: "17px",
                                fontWeight: 700,
                                color: "#fc5c65",
                                letterSpacing: "-0.01em"
                            }}>
                                ${product.price}
                            </div>
                        )}

                        {/* View Details Arrow */}
                        <div style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease"
                        }}>
                            <div style={{
                                width: "0",
                                height: "0",
                                borderLeft: "3px solid #6b7280",
                                borderTop: "2px solid transparent",
                                borderBottom: "2px solid transparent",
                                marginLeft: "1px"
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}