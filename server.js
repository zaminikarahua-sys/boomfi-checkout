const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("BoomFi backend running");
});

// Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// Create payment (FIXED)
app.post("/create-payment", async (req, res) => {
  try {

    // ⚠️ IMPORTANT:
    // BoomFi link is STATIC (cannot add amount or modify it)
    const paymentUrl = "https://pay.boomfi.xyz/Pr1l6WoErz";

    return res.json({
      paymentUrl
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Payment creation failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});    return res.json({
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
