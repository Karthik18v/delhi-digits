const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoiceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, invoiceController.getAllInvoices); // Get All Invoices
router.get("/:id", authMiddleware, invoiceController.getInvoicesById); // Get Single Invoice By Id
router.post("/", authMiddleware, invoiceController.addInvoices); // Post A Invoice
router.put("/:id", authMiddleware, invoiceController.updateInvoiceById); // Update An Invoice By Id
router.delete("/:id", authMiddleware, invoiceController.deleteInvoiceById); // Delete An Invoice By Id

module.exports = router;
