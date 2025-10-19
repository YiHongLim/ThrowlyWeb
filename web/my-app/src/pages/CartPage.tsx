import React, { useState } from "react";


type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  condition: string;
  location: string;
  seller: string;
  aiDescription: string;
  cartsCount?: number;
  viewsCount?: number;
  chatsCount?: number;
};

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "Picture Frame 12x18",
      price: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop&crop=center",
      condition: "Like new",
      location: "Bathurst and St Clair",
      seller: "Sabrina Khan",
      aiDescription:
        "A sturdy, like-new 12x18 picture frame, great for home décor or office use.",
      cartsCount: 3,
      viewsCount: 120,
      chatsCount: 2,
    },
    {
      id: "2",
      title: "Vintage Coffee Table",
      price: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center",
      condition: "Good",
      location: "Queen and Spadina",
      seller: "Mike Johnson",
      aiDescription: "Beautiful vintage coffee table with some wear but solid construction.",
      cartsCount: 1,
      viewsCount: 87,
      chatsCount: 5,
    },
    {
      id: "3",
      title: "Office Chair",
      price: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&crop=center",
      condition: "Excellent",
      location: "Yonge and Bloor",
      seller: "Sarah Chen",
      aiDescription: "Ergonomic office chair in excellent condition, perfect for home office.",
      cartsCount: 2,
      viewsCount: 46,
      chatsCount: 1,
    },
  ]);

  const onRemove = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ background: "#F3F4F6", minHeight: "100vh", fontFamily: "Inter, system-ui, Arial, sans-serif" }}>
      {/* component-local CSS */}
      <style>{`
        .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
        .header { padding: 16px 0; font-size: 20px; font-weight: 600; color: #111827; }
        .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 6px rgba(16,24,40,0.06); border: 1px solid #e6e9ee; overflow: hidden; display: flex; gap: 18px; align-items: center; padding: 14px; }
        .card + .card { margin-top: 16px; }
        .thumb { width: 350px; height: 350px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #f3f4f6; display: block; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .details { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .row-between { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .title { font-size: 16px; font-weight: 600; color: #0f172a; margin: 0; }
        .meta { font-size: 13px; color: #6b7280; margin-top: 2px; }
        .price { color: #0ea5a2; font-weight: 700; font-size: 18px; }
        .ai { color: #374151; font-style: italic; font-size: 13px; }
        .stats { font-size: 12px; color: #6b7280; margin-top: 6px; }
        .actions { display:flex; gap:10px; margin-top: 8px; }
        .btn { cursor: pointer; border-radius: 8px; padding: 8px 12px; font-size: 14px; border: none; }
        .btn-remove { background:#dc2626; color: #fff; border: 1px solid rgba(0,0,0,0.03); }
        .btn-view { background: #fff; color: #111827; border: 1px solid #e5e7eb; }
        .rightCol { width: 160px; display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
        .chatBtn { background: #2563eb; color: #fff; border-radius: 8px; padding: 8px 10px; width: 100%; font-weight:600; border: none; cursor: pointer; }
        .subtotalCard { margin-top: 18px; background: #fff; border-radius: 12px; padding: 14px; display:flex; justify-content:space-between; align-items:center; border: 1px solid #e6e9ee; }
        @media (max-width: 880px) {
          .card { flex-direction: row; }
          .rightCol { width: 120px; align-items:flex-start; }
        }
        @media (max-width: 720px) {
          .card { flex-direction: column; align-items: flex-start; gap: 12px; }
          .rightCol { width: 100%; display:flex; justify-content:space-between; align-items:center; }
          .thumb { width: 96px; height: 96px; }
        }
      `}</style>


      <div className="container">
        <div className="header">My Cart</div>

        {items.length === 0 ? (
          <div style={{ padding: 20, background: "#fff", borderRadius: 10, textAlign: "center" }}>
            Your cart is empty
          </div>
        ) : (
          <>
            {items.map((it) => (
              <div key={it.id} className="card" role="article" aria-label={it.title}>
                <div className="thumb" aria-hidden>
                  <img src={it.imageUrl} alt={it.title} />
                </div>

                <div className="details">
                  <div className="row-between">
                    <div style={{ minWidth: 0 }}>
                      <h3 className="title">{it.title}</h3>
                      <div className="meta">
                        <strong style={{ color: "#111827" }}>{it.condition}</strong> · {it.location}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div className="price">${it.price.toFixed(2)}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>Estimated value</div>
                    </div>
                  </div>

                  <div className="ai">{it.aiDescription}</div>

                  <div className="stats">
                    <span style={{ fontWeight: 600, color: "#111827" }}>{it.seller}</span>
                    <div style={{ marginTop: 6 }}>
                      {(it.cartsCount ?? 0)} {(it.cartsCount ?? 0) === 1 ? "cart" : "carts"} · {(it.viewsCount ?? 0)} views · {(it.chatsCount ?? 0)} chats
                    </div>
                  </div>

                  {/* Actions remove and view details*/}
                  <div className="actions" aria-hidden>
                    <button className="btn btn-remove" onClick={() => onRemove(it.id)} aria-label={`Remove ${it.title}`}>
                      Remove
                    </button>
                    <button className="btn btn-view"> {/* not implemented yet */}
                      View details
                    </button>
                  </div>
                </div>

                <div className="rightCol" role="toolbar" aria-label="chat actions">
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Seller</div>
                  <div style={{ fontWeight: 700 }}>{it.seller}</div>

                  <button
                    className="chatBtn"
                    aria-label={`Chat with ${it.seller}`}
                  >
                    Chat with {it.seller}
                  </button>
                </div>
              </div>
            ))}
            

            {/* Subtotal Card */}
            <div className="subtotalCard" role="region" aria-label="cart subtotal">
              <div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Subtotal ({items.length} items)</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>${total.toFixed(2)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
