const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BoomFi backend running");
});

app.post("/create-payment", async (req, res) => {
  // payment logic here
});

app.listen(process.env.PORT || 3000);
