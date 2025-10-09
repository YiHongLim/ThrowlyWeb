import {Checkbox, Select, Typography, Divider} from "antd";
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";
import "../../output.css";

const {Title} = Typography;
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

    return (
        <div className="bg-white min-h-screen p-6">
            <div className="mb-6">
                <Title level={4} className="flex items-center gap-2 mb-4">
                    <FilterOutlined/>
                    Filters
                </Title>

                <div className="mb-4">
                    <h5 className="font-semibold mb-3 text-gray-700">Categories</h5>
                    <Checkbox.Group
                        options={categoriesName}
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        className="flex flex-col gap-4"
                    />
                </div>
            </div>

            <Divider/>

            <div>
                <Title level={4} className="flex items-center gap-2 mb-4">
                    <SortAscendingOutlined/>
                    Sort by Price
                </Title>

                <Select
                    value={priceSort}
                    onChange={onPriceSortChange}
                    className="w-full"
                    placeholder="Select sorting"
                >
                    <Option value="">No sorting</Option>
                    <Option value="low-to-high">Price: Low to High</Option>
                    <Option value="high-to-low">Price: High to Low</Option>
                </Select>
            </div>
        </div>
    );
}
