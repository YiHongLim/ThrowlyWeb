import React from "react";
import {fetchCategories} from "../../data/listings";
import {CategoryType} from "../../types";
import {useEffect, useState} from "react";

export default function Categories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        };
        fetchData();
    }, []);

    const circleSize = "min(26vw, 200px)";

    return (
        <div style={{ minHeight: "100vh", padding: "24px 32px" }}>
            <h1 style={{ margin: "0 0 40px 8px", fontSize: "48px", fontWeight: 800 }}>Category</h1>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "space-between" }}>
                {categories.map((cat) => (
                    <div key={cat.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 240px", minWidth: "240px" }}>
                        <div
                            style={{
                                width: circleSize,
                                height: circleSize,
                                borderRadius: "50%",
                                overflow: "hidden",                 // ensures cropping into the circle
                                background: "#2d3138",              // optional dark backdrop
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"                // fills the circle and crops as needed
                                }}
                            />
                        </div>
                        <div style={{ marginTop: "5px", fontSize: "28px", fontWeight: 600, textAlign: "center" }}>
                            {cat.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}