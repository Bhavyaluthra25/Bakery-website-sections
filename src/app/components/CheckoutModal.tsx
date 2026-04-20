// ── CheckoutModal.tsx ─────────────────────────────────────────────────────────
// Shared checkout form used by both CakeSelector and HamperSection
// Collects customer details then sends full order to WhatsApp

import { useState } from "react";

export interface CheckoutItem {
  name: string;
  detail?: string; // size for cakes, custom note for hampers
  price: number;
  qty: number;
}

interface Props {
  items: CheckoutItem[];
  whatsappNumber: string; // e.g. "919876543210"
  onClose: () => void;
}

export default function CheckoutModal({ items, whatsappNumber, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    date: "",
    time: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = "Enter valid 6-digit pincode";
    if (!form.date)           e.date    = "Delivery date is required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const itemList = items
      .map(i => `• ${i.name}${i.detail ? ` (${i.detail})` : ""} x${i.qty} — ₹${i.price * i.qty}`)
      .join("\n");

    const message = [
      `🛍️ *New Order from Website*`,
      ``,
      `👤 *Customer Details*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      ``,
      `📦 *Order Items*`,
      itemList,
      ``,
      `💰 *Total: ₹${total}*`,
      ``,
      `📍 *Delivery Address*`,
      form.address,
      form.landmark ? `Landmark: ${form.landmark}` : "",
      `${form.city} — ${form.pincode}`,
      ``,
      `📅 *Delivery Date:* ${form.date}`,
      form.time ? `🕐 *Preferred Time:* ${form.time}` : "",
      form.note ? `📝 *Note:* ${form.note}` : "",
      ``,
      `Please confirm my order. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSubmitted(true);
  }

  const inp = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "10px 14px",
    border: `1px solid ${errors[field] ? "#e53e3e" : "#e8e0d0"}`,
    borderRadius: 10,
    fontSize: 14,
    color: "#2d1f0e",
    background: "#fafaf8",
    outline: "none",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#6b4c2a",
    marginBottom: 5,
  };

  const errStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#e53e3e",
    marginTop: 3,
  };

  if (submitted) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "relative", background: "#fffdf8", borderRadius: 20, padding: "40px 32px", maxWidth: 400, width: "100%", margin: "0 16px", textAlign: "center", zIndex: 1 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#2d1f0e", marginBottom: 8 }}>Order Sent!</p>
          <p style={{ fontSize: 14, color: "#a08060", marginBottom: 24, lineHeight: 1.6 }}>
            Your order has been sent to WhatsApp. We'll confirm your order and delivery details shortly.
          </p>
          <button onClick={onClose} style={{ width: "100%", padding: "13px 0", background: "#25D366", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", cursor: "pointer" }} />

      {/* Modal */}
      <div style={{
        position: "relative", background: "#fffdf8", borderRadius: 20,
        width: "100%", maxWidth: 500, margin: "0 16px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)", zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ padding: "22px 24px 16px", borderBottom: "1px solid #f0ebe0", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fffdf8", zIndex: 2, borderRadius: "20px 20px 0 0" }}>
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2d1f0e", margin: 0 }}>Delivery Details</p>
            <p style={{ fontSize: 13, color: "#a08060", margin: "2px 0 0" }}>Tell us where to deliver your order</p>
          </div>
          <button onClick={onClose} style={{ border: "1px solid #e8e0d0", background: "#fff", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 15, color: "#888", flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>

          {/* Order summary */}
          <div style={{ background: "#fff8f0", border: "1px solid #f0e0c8", borderRadius: 12, padding: "14px 16px", marginBottom: 22 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#c8873a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>Order Summary</p>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b4c2a", marginBottom: 4 }}>
                <span>{item.name}{item.detail ? ` (${item.detail})` : ""} × {item.qty}</span>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #f0e0c8", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#2d1f0e" }}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Personal details */}
          <p style={{ fontSize: 12, fontWeight: 700, color: "#c8873a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>👤 Your Details</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input value={form.name} onChange={e => inp("name", e.target.value)} placeholder="e.g. Priya Sharma" style={inputStyle("name")} />
              {errors.name && <p style={errStyle}>{errors.name}</p>}
            </div>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input value={form.phone} onChange={e => inp("phone", e.target.value)} placeholder="10-digit number" maxLength={10} style={inputStyle("phone")} />
              {errors.phone && <p style={errStyle}>{errors.phone}</p>}
            </div>
          </div>

          {/* Address */}
          <p style={{ fontSize: 12, fontWeight: 700, color: "#c8873a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "18px 0 14px" }}>📍 Delivery Address</p>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Full Address *</label>
            <textarea value={form.address} onChange={e => inp("address", e.target.value)} placeholder="House/Flat No., Street, Area..." rows={2}
              style={{ ...inputStyle("address"), resize: "none" }} />
            {errors.address && <p style={errStyle}>{errors.address}</p>}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Landmark</label>
            <input value={form.landmark} onChange={e => inp("landmark", e.target.value)} placeholder="Near school, temple, etc." style={inputStyle("landmark")} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>City *</label>
              <input value={form.city} onChange={e => inp("city", e.target.value)} placeholder="e.g. Delhi" style={inputStyle("city")} />
              {errors.city && <p style={errStyle}>{errors.city}</p>}
            </div>
            <div>
              <label style={labelStyle}>Pincode *</label>
              <input value={form.pincode} onChange={e => inp("pincode", e.target.value)} placeholder="6-digit pincode" maxLength={6} style={inputStyle("pincode")} />
              {errors.pincode && <p style={errStyle}>{errors.pincode}</p>}
            </div>
          </div>

          {/* Delivery date & time */}
          <p style={{ fontSize: 12, fontWeight: 700, color: "#c8873a", textTransform: "uppercase", letterSpacing: "0.06em", margin: "18px 0 14px" }}>📅 Delivery Schedule</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Delivery Date *</label>
              <input type="date" value={form.date} onChange={e => inp("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                style={inputStyle("date")} />
              {errors.date && <p style={errStyle}>{errors.date}</p>}
            </div>
            <div>
              <label style={labelStyle}>Preferred Time</label>
              <select value={form.time} onChange={e => inp("time", e.target.value)} style={{ ...inputStyle("time"), cursor: "pointer" }}>
                <option value="">Any time</option>
                <option>Morning (9am – 12pm)</option>
                <option>Afternoon (12pm – 4pm)</option>
                <option>Evening (4pm – 8pm)</option>
              </select>
            </div>
          </div>

          {/* Special note */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Special Instructions</label>
            <textarea value={form.note} onChange={e => inp("note", e.target.value)} placeholder="Any special requests for your order..." rows={2}
              style={{ ...inputStyle("note"), resize: "none" }} />
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} style={{ width: "100%", padding: "14px 0", background: "#25D366", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>💬</span> Send Order via WhatsApp
          </button>
          <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 10 }}>
            Your full details will be sent to us on WhatsApp for confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
