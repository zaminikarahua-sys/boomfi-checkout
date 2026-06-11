const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BoomFi backend running");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.post("/create-payment", (req, res) => {
  res.json({ paymentUrl: "https://example.com" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
