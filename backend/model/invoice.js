const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  date: { type: Date, default: Date.now }, 
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Paid", "Unpaid", "Pending"], 
    default: "Pending", 
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
