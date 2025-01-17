const express = require("express");
const authRouter = require("./routes/authRouter");
const db = require("./config/db");
const invoiceRouter = require("./routes/invoiceRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/hello", async (req, res) => {
  res.send("Hello");
});

app.listen(4000, () => console.log(`Server Running At http://localhost:4000`));

app.use("/auth", authRouter);
app.use("/invoices", invoiceRouter);

module.exports = app;
