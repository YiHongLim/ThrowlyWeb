import {Checkbox, Select, Typography, Divider, Badge, Button} from "antd";
import {FilterOutlined, SortAscendingOutlined, ClearOutlined, DownOutlined} from "@ant-design/icons";
import "../../output.css";

const {Title, Text} = Typography;
const {Option} = Select;

interface ProductSidebarProps {
    selectedCategories: string[],
    onCategoryChange: (categories: string[]) => void,
    priceSort: string,
    onPriceSortChange: (sort: string) => void,
    categoriesName?: { label: string; value: string }[]
}

export function ProductSidebar({
    selectedCategories,
    onCategoryChange,
    priceSort,
    onPriceSortChange,
    categoriesName = [] 
                               }: ProductSidebarProps) {
    const handleCategoryChange = (checkedValues: string[]) => {
        onCategoryChange(checkedValues);
    };

    const clearAllCategories = () => {
        onCategoryChange([]);
    };

    return (
        <div style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)",
            height: "100vh",
            borderRight: "1px solid #e8eaed",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Header Section */}
            <div style={{
                padding: "32px 24px 24px",
                borderBottom: "1px solid #f0f2f5",
                background: "#ffffff",
                flexShrink: 0
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px"
                }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                    }}>
                        <FilterOutlined style={{ color: "#ffffff", fontSize: "18px" }} />
                    </div>
                    <Title level={3} style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        letterSpacing: "-0.01em"
                    }}>
                        Filters
                    </Title>
                </div>
                <Text style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: 400
                }}>
                    Refine your search results
                </Text>
            </div>

            {/* Categories Section */}
            <div style={{ 
                padding: "24px",
                flex: 1,
                overflowY: "auto"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}>
                    <Text style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#374151",
                        letterSpacing: "-0.01em"
                    }}>
                        Categories
                    </Text>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {selectedCategories.length > 0 && (
                            <Badge 
                                count={selectedCategories.length} 
                                style={{ 
                                    backgroundColor: "#fc5c65",
                                    boxShadow: "0 2px 4px rgba(252, 92, 101, 0.3)"
                                }} 
                            />
                        )}
                        {selectedCategories.length > 0 && (
                            <Button
                                type="text"
                                size="small"
                                icon={<ClearOutlined />}
                                onClick={clearAllCategories}
                                style={{
                                    color: "#fc5c65",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    padding: "4px 8px",
                                    height: "auto",
                                    borderRadius: "6px"
                                }}
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    {categoriesName.map((category) => {
                        const isSelected = selectedCategories.includes(category.value);
                        return (
                            <div
                                key={category.value}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    borderRadius: "12px",
                                    background: isSelected 
                                        ? "linear-gradient(135deg, #fc5c65 0%, #ff6b7a 100%)" 
                                        : "#ffffff",
                                    border: isSelected 
                                        ? "none" 
                                        : "1px solid #e5e7eb",
                                    cursor: "pointer",
                                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                    boxShadow: isSelected 
                                        ? "0 4px 12px rgba(252, 92, 101, 0.25)" 
                                        : "0 1px 3px rgba(0, 0, 0, 0.05)",
                                    transform: isSelected ? "translateY(-1px)" : "translateY(0)"
                                }}
                                onClick={() => {
                                    const newSelection = isSelected
                                        ? selectedCategories.filter(id => id !== category.value)
                                        : [...selectedCategories, category.value];
                                    handleCategoryChange(newSelection);
                                }}
                            >
                                <div style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "6px",
                                    border: isSelected ? "2px solid #ffffff" : "2px solid #d1d5db",
                                    background: isSelected ? "#ffffff" : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "12px",
                                    transition: "all 0.2s ease"
                                }}>
                                    {isSelected && (
                                        <div style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "2px",
                                            background: "#fc5c65"
                                        }} />
                                    )}
                                </div>
                                <Text style={{
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    color: isSelected ? "#ffffff" : "#374151",
                                    flex: 1,
                                    transition: "color 0.2s ease"
                                }}>
                                    {category.label}
                                </Text>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <Divider style={{
                margin: "0 24px",
                borderColor: "#e5e7eb",
                borderWidth: "1px",
                flexShrink: 0
            }} />

            {/* Sort Section */}
            <div style={{ 
                padding: "24px",
                flexShrink: 0
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <SortAscendingOutlined style={{ color: "#ffffff", fontSize: "14px" }} />
                    </div>
                    <Text style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#374151",
                        letterSpacing: "-0.01em"
                    }}>
                        Sort by Price
                    </Text>
                </div>

                <Select
                    value={priceSort}
                    onChange={onPriceSortChange}
                    style={{
                        width: "100%",
                        height: "48px"
                    }}
                    placeholder="Select sorting"
                    suffixIcon={<DownOutlined style={{ color: "#6b7280" }} />}
                    className="premium-select"
                >
                    <Option value="">No sorting</Option>
                    <Option value="low-to-high">Price: Low to High</Option>
                    <Option value="high-to-low">Price: High to Low</Option>
                </Select>
            </div>

            {/* Footer */}
            <div style={{
                padding: "24px",
                borderTop: "1px solid #f0f2f5",
                flexShrink: 0
            }}>
                <Text style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    textAlign: "center",
                    display: "block"
                }}>
                    {selectedCategories.length > 0 || priceSort 
                        ? `${selectedCategories.length + (priceSort ? 1 : 0)} filter${selectedCategories.length + (priceSort ? 1 : 0) > 1 ? 's' : ''} applied`
                        : "No filters applied"
                    }
                </Text>
            </div>
        </div>
    );
}