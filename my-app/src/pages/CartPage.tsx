import React, { useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  condition: string;
  location: string;
  seller: string;
  sellerDescription: string;
  aiDescription: string;
};

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "Picture Frame 12x18",
      price: 5,
      imageUrl: "https://via.placeholder.com/300x200",
      condition: "Like new",
      location: "Bathurst and St Clair",
      seller: "Sabrina Khan",
      sellerDescription: "Friendly local seller in Casa Loma area with 3 reviews.",
      aiDescription: "A sturdy, like-new 12x18 picture frame, great for home décor or office use.",
    },
  ]);

  const onRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const onCheckout = () => {
    alert("Checkout functionality would be implemented here");
  };

  const onChat = (seller: string) => {
    alert(`Chat with ${seller} would open here`);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white text-lg font-semibold">
        My Cart
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            Your cart is empty
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-40 h-40 object-cover"
              />

              {/* Details */}
              <div className="flex flex-col flex-1 p-4">
                <div className="text-lg font-semibold text-gray-800">
                  {item.title}
                </div>
                <div className="text-orange-500 font-bold text-lg">
                  ${item.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Condition: <span className="font-medium">{item.condition}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Location: {item.location}
                </div>
                <div className="text-sm text-gray-600">
                  Seller: {item.seller}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.sellerDescription}
                </div>

                <div className="mt-2 text-sm text-gray-700 italic">
                  {item.aiDescription}
                </div>

                {/* Actions */}
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-sm text-gray-500 hover:text-red-500"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => onChat(item.seller)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Chat with {item.seller}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer total */}
      {items.length > 0 && (
        <div className="p-4 border-t bg-white flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-800">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={onCheckout}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2"
          >
            Checkout All
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
