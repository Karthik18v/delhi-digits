const express = require("express");
const authRouter = require("./routes/authRouter");
const db = require("./config/db");
const invoiceRouter = require("./routes/invoiceRouter");
require("dotenv").config(); 
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/hello", async (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 4001;
console.log(process.env.PORT);

app.listen(PORT, () =>
  console.log(`Server Running At http://localhost:${PORT}`)
);

app.use("/auth", authRouter);
app.use("/invoices", invoiceRouter);

module.exports = app;
