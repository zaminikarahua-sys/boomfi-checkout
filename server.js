const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🌐 Test route
app.get("/", (req, res) => {
  res.send("BoomFi backend running");
});

// ❤️ Health check (important for containers)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 💳 Create payment from cart
app.post("/create-payment", async (req, res) => {
  try {
    const items = req.body.items || [];

    // 🧮 Calculate total cart price
    const total = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    // 💡 Your BoomFi payment link (base)
    const basePaymentLink = "https://pay.boomfi.xyz/Pr1l6WoErz";

    // ⚡ Build dynamic payment URL
    // NOTE: only works if BoomFi supports query parameters
    const paymentUrl = `${basePaymentLink}?amount=${total}`;

    return res.json({
      paymentUrl
    });

  } catch (err) {
    console.error("Payment error:", err);

    return res.status(500).json({
      error: "Payment creation failed"
    });
  }
});

// 🚀 Start server (IMPORTANT for SnapDeploy)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
