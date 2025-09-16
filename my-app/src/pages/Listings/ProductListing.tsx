import { useState } from "react";
import {
  ProductCard,
  type Product,
} from "../../components/listing/ProductCard";
import { ProductFilters } from "../../components/listing/ProductFilter";

import reactLogo from "../../assets/logo192.png";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    price: 199,
    image: reactLogo,
    category: "Audio",
    isNew: true,
  },
  {
    id: "2",
    title: "Smart Fitness Watch",
    price: 299,
    image: reactLogo,
    category: "Wearables",
  },
  {
    id: "3",
    title: "Professional Leather Backpack",
    price: 159,
    image: reactLogo,
    category: "Bags",
  },
  {
    id: "4",
    title: "Mechanical Gaming Keyboard",
    price: 129,
    image: reactLogo,
    category: "Electronics",
    isNew: true,
  },
  {
    id: "5",
    title: "Wireless Earbuds Pro",
    price: 149,
    image: reactLogo,
    category: "Audio",
  },
  {
    id: "6",
    title: "Luxury Travel Bag",
    price: 229,
    image: reactLogo,
    category: "Bags",
  },
];

export function ProductListing() {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products by search query
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Listings
          </h1>
          <p className="text-lg text-gray-600">
            Search and browse our listings
          </p>
        </div>

        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                No items found
              </h3>
              <p className="text-gray-400">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
