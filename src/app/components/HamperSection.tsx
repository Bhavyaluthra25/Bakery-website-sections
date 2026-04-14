import { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Hamper {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  includes: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  customNote?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const HAMPERS: Hamper[] = [
  {
    id: "starter-birthday",
    name: "Starter Birthday Hamper",
    description: "A delightful starter birthday hamper with sweet treats and cupcakes",
    price: 500,
    image: "/500birthdayy.jpg",
    category: "birthday",
    includes: ["Assorted cupcakes", "Birthday card", "Ribbon & bow", "Gift wrap"],
  },
  {
    id: "classic-birthday",
    name: "Classic Birthday Hamper",
    description: "A classic birthday hamper featuring our signature sweet assortment",
    price: 700,
    image: "/700birthdayy.jpeg",
    category: "birthday",
    includes: ["Premium cupcake box", "Happy Birthday topper", "Sparkle decoration", "Gift box"],
  },
  {
    id: "twix-balloon",
    name: "Twix Balloon Hamper",
    description: "A stunning balloon hamper with Twix chocolates and festive decor",
    price: 1200,
    image: "/Twix-Bunny-Balloon-Hamper.jpg",
    category: "birthday",
    includes: ["Large bubble balloon", "Twix chocolates", "Butterfly decor", "Personalised ribbon"],
  },
  {
    id: "premium-birthday",
    name: "Premium Birthday Hamper",
    description: "Our premium birthday hamper for the ultimate celebration experience",
    price: 1500,
    image: "/1500birthday.jpg",
    category: "birthday",
    includes: ["Balloon bouquet", "Assorted snacks", "Butterfly decor", "Custom name board", "Gift box"],
  },
  {
    id: "anniversary-299",
    name: "₹299 Anniversary Hamper",
    description: "A delightful anniversary celebration package",
    price: 299,
    image: "/299anniversary.jpg",
    category: "anniversary",
    includes: ["Anniversary decor", "Gift wrap", "Ribbon & bow"],
  },
  {
    id: "anniversary-700",
    name: "₹700 Anniversary Hamper",
    description: "A classic anniversary hamper with thoughtful gifts",
    price: 700,
    image: "/700anniversary.jpg",
    category: "anniversary",
    includes: ["Premium decor", "Personalised card", "Chocolate box"],
  },
  {
    id: "anniversary-999",
    name: "₹999 Anniversary Hamper",
    description: "A premium anniversary package for your special day",
    price: 999,
    image: "/999anniversary.jpg",
    category: "anniversary",
    includes: ["Luxury decor", "Balloon bouquet", "Special surprise"],
  },
  {
    id: "anniversary-bliss",
    name: "Anniversary Bliss",
    description: "Champagne truffles, rose petals and balloons for your special day",
    price: 1500,
    image: "https://images.unsplash.com/photo-1644890916891-5a595c8c098f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "anniversary",
    includes: ["Rose petals", "Chocolate truffles", "Balloon bouquet", "Love card"],
  },
  {
    id: "sweet-surprise",
    name: "Sweet Surprise",
    description: "Assorted pastries with celebration balloons for anniversaries",
    price: 1200,
    image: "https://images.unsplash.com/photo-1644890916875-65f1254ef092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "anniversary",
    includes: ["Assorted pastries", "Celebration balloons", "Personalised card", "Gift wrap"],
  },
];

const CATEGORIES = [
  { key: "all",         label: "All Hampers" },
  { key: "birthday",   label: "🎂 Birthday" },
  { key: "anniversary",label: "💍 Anniversary" },
];

// ── Customize Modal ───────────────────────────────────────────────────────────
function CustomizeModal({
  hamper,
  onClose,
  onConfirm,
}: {
  hamper: Hamper;
  onClose: () => void;
  onConfirm: (note: string) => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("Pink");

  const colors = ["Pink", "Red", "Blue", "Gold", "Purple", "White"];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", cursor: "pointer" }} />
      <div style={{
        position: "relative", background: "#fffdf8", borderRadius: 20,
        padding: "28px 28px 24px", width: "100%", maxWidth: 440,
        margin: "0 16px", boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2d1f0e", margin: 0 }}>Customise Hamper</p>
            <p style={{ fontSize: 13, color: "#a08060", margin: "3px 0 0" }}>{hamper.name}</p>
          </div>
          <button onClick={onClose} style={{ border: "1px solid #e8e0d0", background: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 14, color: "#888" }}>✕</button>
        </div>

        {/* Name on hamper */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6b4c2a", marginBottom: 6 }}>Name on Hamper</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Happy Birthday Sarah!"
            style={{
              width: "100%", padding: "10px 14px", border: "1px solid #e8e0d0",
              borderRadius: 10, fontSize: 14, color: "#2d1f0e",
              background: "#fafaf8", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6b4c2a", marginBottom: 6 }}>Personal Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write a heartfelt message..."
            rows={3}
            style={{
              width: "100%", padding: "10px 14px", border: "1px solid #e8e0d0",
              borderRadius: 10, fontSize: 14, color: "#2d1f0e",
              background: "#fafaf8", outline: "none", resize: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Colour theme */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6b4c2a", marginBottom: 8 }}>Colour Theme</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  padding: "6px 14px", borderRadius: 999, fontSize: 13,
                  border: color === c ? "2px solid #c8873a" : "1px solid #e8e0d0",
                  background: color === c ? "#fff8f0" : "#fff",
                  color: color === c ? "#c8873a" : "#666",
                  cursor: "pointer", fontWeight: color === c ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px 0", borderRadius: 10,
            border: "1px solid #e8e0d0", background: "#fff",
            color: "#666", fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}>Cancel</button>
          <button
            onClick={() => onConfirm(`Name: ${name || "—"} | Message: ${message || "—"} | Color: ${color}`)}
            style={{
              flex: 2, padding: "12px 0", borderRadius: 10, border: "none",
              background: "#c8873a", color: "#fff",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >Add to Cart →</button>
        </div>
      </div>
    </div>
  );
}

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
    <div style={{ position: "fixed", inset: 0, zIndex: 998, display: "flex" }}>
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
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎁</div>
              <p style={{ fontSize: 15, color: "#b09070" }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: "#c0a880" }}>Pick a hamper to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #f5f0e8" }}>
                <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#2d1f0e", margin: "0 0 2px" }}>{item.name}</p>
                  {item.customNote && (
                    <p style={{ fontSize: 11, color: "#c8873a", margin: "0 0 6px", lineHeight: 1.4 }}>✏️ {item.customNote}</p>
                  )}
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
            }}>Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Hamper Card ───────────────────────────────────────────────────────────────
function HamperCard({
  hamper,
  onAddToCart,
  onCustomize,
}: {
  hamper: Hamper;
  onAddToCart: (hamper: Hamper) => void;
  onCustomize: (hamper: Hamper) => void;
}) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(hamper);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div
      style={{
        background: "#fff", borderRadius: 18, overflow: "hidden",
        border: "1px solid #f0ebe0", display: "flex", flexDirection: "column",
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
      <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
        <img
          src={hamper.image}
          alt={hamper.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        {/* Price badge */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "#c8873a", color: "#fff",
          padding: "5px 12px", borderRadius: 999,
          fontSize: 14, fontWeight: 700,
        }}>₹{hamper.price}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2d1f0e", margin: "0 0 6px" }}>{hamper.name}</h3>
        <p style={{ fontSize: 13, color: "#a08060", margin: "0 0 14px", lineHeight: 1.55 }}>{hamper.description}</p>

        {/* Includes */}
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#c8873a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>Includes</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {hamper.includes.map(item => (
              <span key={item} style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 999,
                background: "#fff8f0", border: "1px solid #f0e0c8", color: "#a06030",
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <button
            onClick={() => onCustomize(hamper)}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: "1px solid #e8e0d0", background: "#fff",
              color: "#6b4c2a", fontSize: 13, fontWeight: 500,
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff8f0";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8873a";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e0d0";
            }}
          >✏️ Customise</button>
          <button
            onClick={handleAdd}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
              background: added ? "#4caf50" : "#c8873a",
              color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "background 0.2s",
            }}
          >{added ? "✓ Added!" : "Add to Cart"}</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function HamperSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizeHamper, setCustomizeHamper] = useState<Hamper | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = HAMPERS.filter(h => activeCategory === "all" || h.category === activeCategory);

  function addToCart(hamper: Hamper, customNote?: string) {
    const id = `${hamper.id}${customNote ? "-custom" : ""}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, name: hamper.name, price: hamper.price, image: hamper.image, qty: 1, customNote }];
    });
  }

  return (
    <section id="hampers" className="max-w-7xl mx-auto px-6 py-32 border-t border-border">

      {/* Header */}
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div className="text-center" style={{ flex: 1 }}>
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Celebration Hampers</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Perfect for birthdays and anniversaries. Each hamper includes festive balloons and sweet treats.
          </p>
        </div>

        {/* Cart button */}
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

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: "8px 22px", borderRadius: 999, fontSize: 14, fontWeight: 500,
              border: activeCategory === cat.key ? "none" : "1px solid #e8e0d0",
              background: activeCategory === cat.key ? "#c8873a" : "#fff",
              color: activeCategory === cat.key ? "#fff" : "#6b4c2a",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >{cat.label}</button>
        ))}
      </div>

      {/* Hamper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(hamper => (
          <HamperCard
            key={hamper.id}
            hamper={hamper}
            onAddToCart={h => addToCart(h)}
            onCustomize={h => setCustomizeHamper(h)}
          />
        ))}
      </div>

      {/* Customize Modal */}
      {customizeHamper && (
        <CustomizeModal
          hamper={customizeHamper}
          onClose={() => setCustomizeHamper(null)}
          onConfirm={note => {
            addToCart(customizeHamper, note);
            setCustomizeHamper(null);
          }}
        />
      )}

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
    </section>
  );
}
