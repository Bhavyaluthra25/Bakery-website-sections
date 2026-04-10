import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Cake {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  prices: { "250g": number; "500g": number; "1kg": number };
}

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  qty: number;
}

type Size = "250g" | "500g" | "1kg";

// ── Data ──────────────────────────────────────────────────────────────────────
const CAKES: Cake[] = [
  // Classic
  { id: "vanilla", name: "Vanilla Dream", description: "Classic vanilla sponge with buttercream frosting", image: "https://images.unsplash.com/photo-1557776959-f066eb37857f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "classic", prices: { "250g": 150, "500g": 299, "1kg": 550 } },
  { id: "chocolate", name: "Chocolate Elegance", description: "Rich dark chocolate layers with velvet frosting", image: "https://images.unsplash.com/photo-1594403759538-5141d2cc452a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "classic", prices: { "250g": 175, "500g": 349, "1kg": 650 } },
  { id: "butterscotch", name: "Butterscotch Bliss", description: "Golden butterscotch cream with crunchy praline", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80", category: "classic", prices: { "250g": 160, "500g": 320, "1kg": 600 } },
  { id: "pineapple", name: "Pineapple Delight", description: "Light pineapple sponge with fresh cream", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", category: "classic", prices: { "250g": 150, "500g": 299, "1kg": 550 } },
  { id: "blackforest", name: "Black Forest", description: "Chocolate sponge with cherries and cream", image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80", category: "classic", prices: { "250g": 175, "500g": 349, "1kg": 650 } },
  { id: "strawberry", name: "Strawberry Delight", description: "Fresh strawberries and light cream", image: "https://images.unsplash.com/photo-1726828952313-385d63df2514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "classic", prices: { "250g": 175, "500g": 349, "1kg": 650 } },
  // Chocolate
  { id: "truffle", name: "Chocolate Truffle", description: "Indulgent truffle ganache with dark chocolate shavings", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5994?w=600&q=80", category: "chocolate", prices: { "250g": 200, "500g": 399, "1kg": 750 } },
  { id: "fudge", name: "Chocolate Fudge", description: "Dense fudge layers with rich chocolate sauce", image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80", category: "chocolate", prices: { "250g": 225, "500g": 449, "1kg": 850 } },
  { id: "hazelnut", name: "Chocolate Hazelnut", description: "Nutella cream with crunchy hazelnut praline", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", category: "chocolate", prices: { "250g": 250, "500g": 499, "1kg": 950 } },
  { id: "oreo", name: "Chocolate Oreo", description: "Chocolate sponge loaded with Oreo cream chunks", image: "https://images.unsplash.com/photo-1551879400-111a9087cd86?w=600&q=80", category: "chocolate", prices: { "250g": 225, "500g": 449, "1kg": 850 } },
  { id: "mint", name: "Chocolate Mint", description: "Cool mint cream with dark chocolate layers", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", category: "chocolate", prices: { "250g": 200, "500g": 399, "1kg": 750 } },
  // Fruit
  { id: "mango", name: "Mango Tango", description: "Alphonso mango cream with fresh mango chunks", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80", category: "fruit", prices: { "250g": 200, "500g": 399, "1kg": 750 } },
  { id: "blueberry", name: "Blueberry Burst", description: "Blueberry compote with vanilla cream layers", image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=600&q=80", category: "fruit", prices: { "250g": 225, "500g": 449, "1kg": 850 } },
  { id: "lemon", name: "Lemon Citrus", description: "Fresh lemon zest with tangy glaze", image: "https://images.unsplash.com/photo-1552958492-9cb8e9446673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "fruit", prices: { "250g": 190, "500g": 379, "1kg": 699 } },
  { id: "raspberry", name: "Raspberry Rose", description: "Delicate rose water with fresh raspberries", image: "https://images.unsplash.com/photo-1670225078962-0c3490641003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "fruit", prices: { "250g": 225, "500g": 449, "1kg": 850 } },
  // Premium
  { id: "redvelvet", name: "Red Velvet", description: "Smooth cream cheese frosting on red velvet", image: "https://images.unsplash.com/photo-1604413191066-4dd20bedf486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "premium", prices: { "250g": 249, "500g": 499, "1kg": 950 } },
  { id: "tiramisu", name: "Tiramisu Supreme", description: "Coffee-soaked layers with mascarpone cream", image: "https://images.unsplash.com/photo-1671721100511-4cb82346d66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "premium", prices: { "250g": 299, "500g": 599, "1kg": 1150 } },
  { id: "caramel", name: "Caramel Delight", description: "Salted caramel buttercream perfection", image: "https://images.unsplash.com/photo-1658413381696-e75f942aa3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "premium", prices: { "250g": 275, "500g": 549, "1kg": 1050 } },
  { id: "pistachio", name: "Pistachio Bliss", description: "Ground pistachios with white chocolate", image: "https://images.unsplash.com/photo-1701944578045-dc3f7fd28335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "premium", prices: { "250g": 299, "500g": 599, "1kg": 1150 } },
  // Fusion
  { id: "ferrero", name: "Ferrero Rocher", description: "Hazelnut praline with Ferrero Rocher pieces", image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&q=80", category: "fusion", prices: { "250g": 325, "500g": 649, "1kg": 1249 } },
  { id: "biscoff", name: "Biscoff Lotus", description: "Lotus Biscoff spread with caramelised cookie crumble", image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80", category: "fusion", prices: { "250g": 325, "500g": 649, "1kg": 1249 } },
  { id: "matcha", name: "Matcha Green Tea", description: "Japanese matcha with honey glaze", image: "https://images.unsplash.com/photo-1672504015204-07372bd02933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", category: "fusion", prices: { "250g": 275, "500g": 549, "1kg": 1050 } },
  // Indian
  { id: "rasmalai", name: "Rasmalai Cake", description: "Saffron cream with soft rasmalai pieces", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5994?w=600&q=80", category: "indian", prices: { "250g": 249, "500g": 499, "1kg": 950 } },
  { id: "kesarpista", name: "Kesar Pista", description: "Saffron and pistachio cream with rose petals", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80", category: "indian", prices: { "250g": 275, "500g": 549, "1kg": 1050 } },
  { id: "gulabjamun", name: "Gulab Jamun Cake", description: "Gulab jamun pieces soaked in rose syrup cream", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", category: "indian", prices: { "250g": 249, "500g": 499, "1kg": 950 } },
];

const CATEGORIES = [
  { key: "all",        label: "All Cakes" },
  { key: "classic",   label: "🍰 Classic" },
  { key: "chocolate", label: "🍫 Chocolate" },
  { key: "fruit",     label: "🍓 Fruit" },
  { key: "premium",   label: "✨ Premium" },
  { key: "fusion",    label: "🍩 Fusion" },
  { key: "indian",    label: "🇮🇳 Indian" },
];

const SIZE_SERVES: Record<Size, string> = {
  "250g": "2–3 serves",
  "500g": "4–6 serves",
  "1kg":  "8–12 serves",
};

// ── Cart Drawer ───────────────────────────────────────────────────────────────
function CartDrawer({
  items, onClose, onQtyChange, onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex" }}>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,0.35)", cursor: "pointer" }} />
      <div style={{
        width: 380, maxWidth: "95vw", background: "#fffdf8",
        display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
      }}>
        {/* Header */}
        <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #f0ebe0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2d1f0e", margin: 0 }}>Your Cart</p>
            <p style={{ fontSize: 13, color: "#a08060", margin: "3px 0 0" }}>{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose} style={{ border: "1px solid #e8e0d0", background: "#fff", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 15, color: "#888" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎂</div>
              <p style={{ fontSize: 15, color: "#b09070" }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: "#c0a880" }}>Pick a cake to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #f5f0e8" }}>
                <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#2d1f0e", margin: "0 0 2px" }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: "#a08060", margin: "0 0 8px" }}>{item.size} · {SIZE_SERVES[item.size as Size]}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                      style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e0d8c8", background: "#fff", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 500, minWidth: 18, textAlign: "center", color: "#2d1f0e" }}>{item.qty}</span>
                    <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                      style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e0d8c8", background: "#fff", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#2d1f0e", margin: 0 }}>₹{item.price * item.qty}</p>
                  <button onClick={() => onRemove(item.id)}
                    style={{ fontSize: 11, color: "#c0392b", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "16px 24px 28px", borderTop: "1px solid #f0ebe0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: "#a08060" }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#2d1f0e" }}>₹{total}</span>
            </div>
            <button style={{
              width: "100%", padding: "14px 0",
              background: "#c8873a", color: "#fff",
              border: "none", borderRadius: 12,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              letterSpacing: 0.3,
            }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Cake Card ─────────────────────────────────────────────────────────────────
function CakeCard({ cake, onAddToCart }: { cake: Cake; onAddToCart: (item: CartItem) => void }) {
  const [selectedSize, setSelectedSize] = useState<Size>("500g");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart({
      id: `${cake.id}-${selectedSize}`,
      name: cake.name,
      size: selectedSize,
      price: cake.prices[selectedSize],
      image: cake.image,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #f0ebe0",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
        <img
          src={cake.image}
          alt={cake.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2d1f0e", margin: "0 0 6px" }}>{cake.name}</h3>
        <p style={{ fontSize: 13, color: "#a08060", margin: "0 0 16px", lineHeight: 1.55 }}>{cake.description}</p>

        {/* Size selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {(["250g", "500g", "1kg"] as Size[]).map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                flex: 1, padding: "8px 4px", borderRadius: 10,
                border: selectedSize === size ? "2px solid #c8873a" : "1px solid #e8e0d0",
                background: selectedSize === size ? "#fff8f0" : "#fafaf8",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: selectedSize === size ? "#c8873a" : "#666" }}>{size}</span>
              <span style={{ display: "block", fontSize: 10, color: "#bbb", marginTop: 2 }}>{SIZE_SERVES[size]}</span>
            </button>
          ))}
        </div>

        {/* Price + Add */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#c8873a" }}>₹{cake.prices[selectedSize]}</span>
            <span style={{ fontSize: 12, color: "#ccc", marginLeft: 4 }}>/ {selectedSize}</span>
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: "10px 18px", borderRadius: 10, border: "none",
              background: added ? "#4caf50" : "#c8873a",
              color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap",
            }}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function CakeSelector() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = CAKES.filter(c => activeCategory === "all" || c.category === activeCategory);

  function addToCart(item: CartItem) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, item];
    });
  }

  return (
    <div>
      {/* Category tabs + Cart button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "8px 18px", borderRadius: 999,
                border: activeCategory === cat.key ? "none" : "1px solid #e8e0d0",
                background: activeCategory === cat.key ? "#c8873a" : "#fff",
                color: activeCategory === cat.key ? "#fff" : "#6b4c2a",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "relative", display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", background: "#2d1f0e", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600,
            cursor: "pointer", flexShrink: 0,
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: -8, right: -8,
              background: "#c8873a", color: "#fff", borderRadius: "50%",
              width: 22, height: 22, fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid #fdf8f2",
            }}>{cartCount}</span>
          )}
        </button>
      </div>

      {/* Cake Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
        {filtered.map(cake => (
          <CakeCard key={cake.id} cake={cake} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={(id, qty) => {
            if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
            else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
          }}
          onRemove={id => setCart(prev => prev.filter(i => i.id !== id))}
        />
      )}
    </div>
  );
}
