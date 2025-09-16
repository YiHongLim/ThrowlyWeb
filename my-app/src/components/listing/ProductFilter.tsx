import { Input } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        prefix={<SearchOutlined />}
        suffix={
          searchQuery && (
            <CloseOutlined
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => onSearchChange('')}
            />
          )
        }
        size="large"
      />
    </div>
  );
}