"use client";
import { useState } from "react";

export default function PlaceOrder() {
  const restaurants = [
    "Panera Bread", "Starbucks", "Saxbys", "Dunkin'", "Freshens",
    "Social Grill", "Halal Shack", "1908 Pizzeria", "Yella's", "La Cantina",
    "Blanton Amazon", "Jersey Mike's", "Wild Blue Sushi", "Chick N Bap", "Virtual Kitchen"
  ];

  const locations = [
    "Blanton Hall", "Bohn Hall", "Freeman Hall", "Stone Hall", "Richardson Hall",
    "Dinallo Heights", "Hawk Crossing", "The Village", "School of Business",
    "Dickson Hall", "Schmitt Hall", "CELS Building", "Student Center",
    "Sprague Library", "University Hall", "Morehead Hall"
  ];

  const [restaurant, setRestaurant] = useState("");
  const [details, setDetails] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [pay, setPay] = useState("$3");
  const [customPay, setCustomPay] = useState("");
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [orderId] = useState("NABIT-" + (Date.now() % 100000));

  function submit() {
    if (!restaurant) return setError("Please select a restaurant.");
    if (!details) return setError("Please describe your order.");
    if (!orderNum) return setError("Please enter your order number.");
    if (!location) return setError("Please select a delivery location.");
    if (!paid) return setError("Please confirm you already paid.");
    setError("");
    setDone(true);
  }

  function reset() {
    setRestaurant(""); setDetails(""); setOrderNum(""); setLocation("");
    setRoom(""); setPay("$3"); setCustomPay(""); setPaid(false);
    setError(""); setDone(false);
  }

  const finalPay = customPay ? "$" + customPay : pay;

  if (done) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 500, margin: "40px auto", padding: 20 }}>
        <h2 style={{ color: "#c41230" }}>Order Posted!</h2>
        <p>A student driver will pick it up shortly.</p>
        <br />
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Restaurant:</strong> {restaurant}</p>
          <p><strong>Order #:</strong> {orderNum}</p>
          <p><strong>Items:</strong> {details}</p>
          <p><strong>Deliver to:</strong> {location}{room ? ", " + room : ""}</p>
          <p><strong>Driver pay:</strong> {finalPay} (cash / Venmo / Zelle on delivery)</p>
          <p style={{ color: "#c41230" }}><strong>Status:</strong> Waiting for a driver...</p>
        </div>
        <br />
        <button onClick={reset} style={{ background: "#c41230", color: "white", padding: "10px 20px", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Post Another Order
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 550, margin: "40px auto", padding: 20 }}>
      <h2>Place an Order</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>Already bought your food? Post it here and a driver will pick it up.</p>

      <label><strong>Restaurant</strong></label>
      <select value={restaurant} onChange={e => setRestaurant(e.target.value)} style={{ display: "block", width: "100%", padding: 8, marginTop: 6, marginBottom: 16, border: "1px solid #ccc", borderRadius: 6 }}>
        <option value="">Select a restaurant...</option>
        {restaurants.map(r => <option key={r}>{r}</option>)}
      </select>

      <label><strong>What did you order?</strong></label>
      <textarea value={details} onChange={e => setDetails(e.target.value)} rows={3} style={{ display: "block", width: "100%", padding: 8, marginTop: 6, marginBottom: 16, border: "1px solid #ccc", borderRadius: 6, resize: "vertical" }} />

      <label><strong>Order / Confirmation Number</strong></label>
      <input type="text" value={orderNum} onChange={e => setOrderNum(e.target.value)} style={{ display: "block", width: "100%", padding: 8, marginTop: 6, marginBottom: 16, border: "1px solid #ccc", borderRadius: 6 }} />

      <label><strong>Delivery Location</strong></label>
      <select value={location} onChange={e => setLocation(e.target.value)} style={{ display: "block", width: "100%", padding: 8, marginTop: 6, marginBottom: 8, border: "1px solid #ccc", borderRadius: 6 }}>
        <option value="">Select a location...</option>
        {locations.map(l => <option key={l}>{l}</option>)}
      </select>

      <label><strong>Room / Floor (optional)</strong></label>
      <input type="text" value={room} onChange={e => setRoom(e.target.value)} style={{ display: "block", width: "100%", padding: 8, marginTop: 6, marginBottom: 16, border: "1px solid #ccc", borderRadius: 6 }} />

      <label><strong>Driver Pay</strong></label>
      <div style={{ display: "flex", gap: 8, marginTop: 6, marginBottom: 8 }}>
        {["$2", "$3", "$4", "$5"].map(opt => (
          <button key={opt} onClick={() => { setPay(opt); setCustomPay(""); }}
            style={{ padding: "8px 16px", border: pay === opt && !customPay ? "2px solid #c41230" : "1px solid #ccc", borderRadius: 6, background: pay === opt && !customPay ? "#fff0f0" : "white", cursor: "pointer", fontWeight: "bold" }}>
            {opt}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <span style={{ color: "#666" }}>Custom: $</span>
        <input type="number" min="1" value={customPay} onChange={e => { setCustomPay(e.target.value); setPay(""); }}
          style={{ width: 70, padding: 6, border: "1px solid #ccc", borderRadius: 6 }} />
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 12, border: "1px solid #ccc", borderRadius: 6, cursor: "pointer", marginBottom: 16, background: paid ? "#f0faf4" : "white" }}>
        <input type="checkbox" checked={paid} onChange={e => setPaid(e.target.checked)} style={{ marginTop: 2 }} />
        <span><strong>I already paid at the restaurant.</strong> The driver just needs to pick it up. I will pay the driver on delivery.</span>
      </label>

      {error && <p style={{ color: "red", marginBottom: 12 }}>⚠ {error}</p>}

      <button onClick={submit} style={{ background: "#c41230", color: "white", padding: "12px 28px", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold", fontSize: 15 }}>
        Post Order
      </button>
    </div>
  );
}
