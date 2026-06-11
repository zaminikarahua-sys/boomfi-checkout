const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("BoomFi backend running");
});

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ================= CREATE PAYMENT =================
app.post("/create-payment", async (req, res) => {
  try {

    const items = req.body.items || [];

    // Calculate cart total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const paylinkId = "Pr1l6WoErz";

    // ================= BOOMFI API CALL =================
    const response = await fetch(
      `https://mapi.boomfi.xyz/v1/paylinks/generate-variant/${paylinkId}`,
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.BOOMFI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          price: total,
          currency: "USD"
        })
      }
    );

    const data = await response.json();

    // Safety check
    if (!data || !data.url) {
      return res.status(500).json({
        error: "Failed to generate payment link",
        details: data
      });
    }

    // Return payment URL to frontend
    return res.json({
      paymentUrl: data.url
    });

  } catch (err) {
    console.error("Payment error:", err);

    return res.status(500).json({
      error: "Server error while creating payment"
    });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
