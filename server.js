const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-payment", async (req,res)=>{

  const items = req.body.items;

  // Calculate total
  const total = items.reduce(
    (sum,item)=>sum + item.price * item.qty,
    0
  );

  // TODO:
  // Call BoomFi API here

  res.json({
    paymentUrl: "https://your-boomfi-payment-link"
  });
});

app.listen(process.env.PORT || 3000);
